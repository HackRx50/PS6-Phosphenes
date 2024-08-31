import requests
import pdfplumber
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import os
import re
import google.generativeai as genai
from dotenv import load_dotenv
from transformers import pipeline
from moviepy.editor import VideoFileClip, ImageClip, concatenate_videoclips
import json

# Set up folders
pictures_folder = "pictures"
videos_folder = "videos"
output_video_path = "final_slideshow.mp4"

os.makedirs(pictures_folder, exist_ok=True)
os.makedirs(videos_folder, exist_ok=True)

# API URLs
img_url = 'https://api.pexels.com/v1/search'
vid_url = 'https://api.pexels.com/videos/search'

# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("IMG_API")
api_key = os.getenv("API_KEY")

# Configure API key for Google Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# Set path for Tesseract OCR
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Define common resolution and frame rate
common_resolution = (1280, 720)
frame_rate = 24


def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    max_chunk = 1024
    text_chunks = [text[i:i + max_chunk] for i in range(0, len(text), max_chunk)]
    summary = ""
    for chunk in text_chunks:
        summary += summarizer(chunk, max_length=130, min_length=30, do_sample=False)[0]['summary_text'] + " "
    return summary.strip()

def extract_images_from_pdf(pdf_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    doc = fitz.open(pdf_path)
    image_list = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        for img_index, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_list.append(image_bytes)
            image_path = os.path.join(output_folder, f"page_{page_num}_img_{img_index}.png")
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)
    
    return image_list

def ocr_images_in_folder(folder_path):
    text = ""
    for filename in os.listdir(folder_path):
        if filename.endswith(".png"):
            image_path = os.path.join(folder_path, filename)
            try:
                image = Image.open(image_path)
                text += pytesseract.image_to_string(image) + "\n"
            except Exception as e:
                print(f"Error OCR processing {filename}: {e}")
    return text

def extract_text_from_pdf_images(pdf_path, output_folder):
    extract_images_from_pdf(pdf_path, output_folder)
    text = ocr_images_in_folder(output_folder)
    return text

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def generate_keywords_from_summary(summary):
    speeches = ""
    keywords = []

    try:
        inp = model.generate_content(f"Write a minimum exact 250 and maximum exact 300 words more accurate summary based on the previous summary in paragraph formate and it should be plain text with no bullet points, no '/n' and no bold stuff, i am using it as input for my tts: {summary}")
        speeches = inp.text
    except Exception as e:
        print(f"Error generating speech: {e}")

    try:
        res = model.generate_content(f"Generate 10 unique, main and relevant keywords based on summary make sure it's one word and relevant enough to generate an image which I can use in making video: {summary}")
        keywords = re.findall(r'\*\*(.*?)\*\*', res.text)
    except Exception as e:
        print(f"Error generating keywords: {e}")

    return {
        "speech": speeches,
        "keywords": keywords
    }

# quiz part

def generate_quiz(text):
    quizString = ""
    try:
        inp = model.generate_content(f"Generate quiz which contains 5 questions with unique answer in mcq format containing 'question', 'options', 'answer' in json list formate based on the text: {text}")
        print(inp.text)
        quizString = inp.text
    except Exception as e:
        print(f"Error generating quiz: {e}")
    return quizString

def save_quiz_to_json(quiz_string, output_file):
    # Remove the ```json and ``` markers
    cleaned_string = quiz_string.replace('```json', '').replace('```', '').strip()
    
    try:
        # Parse the cleaned string into a JSON object
        quiz_json = json.loads(cleaned_string)
        
        # Save the JSON object to a file
        with open(output_file, 'w') as json_file:
            json.dump(quiz_json, json_file, indent=4)
        
        print(f"Quiz data saved successfully to {output_file}")
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)  # Replaces multiple spaces with a single space
    text = re.sub(r'[^a-zA-Z0-9\s.,]', '', text)  # Remove special characters
    return text.strip()

def save_image_from_url(image_url, save_directory, image_index):
    os.makedirs(save_directory, exist_ok=True)
    
    try:
        image_response = requests.get(image_url)
        if image_response.status_code == 200:
            image_path = os.path.join(save_directory, f'image_{image_index}.jpg')
            with open(image_path, 'wb') as file:
                file.write(image_response.content)
            print(f"Image {image_index} saved as {image_path}")
        else:
            print(f"Failed to download image {image_index}. Status code: {image_response.status_code}")
    except Exception as e:
        print(f"Error saving image {image_index}: {e}")

def save_video_from_url(video_url, save_directory, video_index):
    os.makedirs(save_directory, exist_ok=True)
    
    try:
        video_response = requests.get(video_url)
        if video_response.status_code == 200:
            video_path = os.path.join(save_directory, f'video_{video_index}.mp4')
            with open(video_path, 'wb') as file:
                file.write(video_response.content)
            print(f"Video {video_index} saved as {video_path}")
        else:
            print(f"Failed to download video {video_index}. Status code: {video_response.status_code}")
    except Exception as e:
        print(f"Error saving video {video_index}: {e}")

def trim_video(video_path, duration=7):
    try:
        with VideoFileClip(video_path) as video:
            print(f"Original Duration: {video.duration}")
            if video.duration > duration:
                trimmed_video = video.subclip(0, duration)
                trimmed_video_path = video_path.replace(".mp4", "_trimmed.mp4")
                trimmed_video.write_videofile(trimmed_video_path, codec='libx264', audio_codec='aac')
                print(f"Trimmed Duration: {trimmed_video.duration}")
                os.replace(trimmed_video_path, video_path)
    except Exception as e:
        print(f"Error trimming video {video_path}: {e}")
        if os.path.exists(video_path):
            os.remove(video_path)

def generate_and_save_images_and_videos_for_keywords(keywords):
    headers = {'Authorization': API_KEY}

    for i, keyword in enumerate(keywords):
        print(f"Processing keyword {i + 1}: {keyword}")

        params = {'query': keyword, 'per_page': 1, 'page': 1}

        try:
            if i < 5:
                response = requests.get(img_url, headers=headers, params=params)
                if response.status_code == 200:
                    data = response.json()
                    images = data.get('photos', [])
                    if images:
                        image_url = images[0]['src']['original']
                        save_image_from_url(image_url, pictures_folder, i + 1)
                    else:
                        print(f"No images found for keyword {keyword}")
                else:
                    print(f"Failed to fetch images for keyword {i + 1}. Status code: {response.status_code}")

            else:
                response = requests.get(vid_url, headers=headers, params=params)
                if response.status_code == 200:
                    data = response.json()
                    videos = data.get('videos', [])
                    if videos:
                        video_url = videos[0]['video_files'][0]['link']
                        save_video_from_url(video_url, videos_folder, i + 1)
                        video_path = os.path.join(videos_folder, f'video_{i + 1}.mp4')
                        trim_video(video_path)
                    else:
                        print(f"No videos found for keyword {keyword}")
                else:
                    print(f"Failed to fetch videos for keyword {i + 1}. Status code: {response.status_code}")
        except Exception as e:
            print(f"Error processing keyword {keyword}: {e}")

def clean_up_videos(folder_path, max_duration=7):
    for filename in os.listdir(folder_path):
        if filename.endswith(".mp4"):
            video_path = os.path.join(folder_path, filename)
            try:
                with VideoFileClip(video_path) as video:
                    if video.duration > max_duration:
                        os.remove(video_path)
                        print(f"Deleted {video_path} because its duration was greater than {max_duration} seconds.")
            except Exception as e:
                print(f"Error checking video duration for {video_path}: {e}")

def create_slideshow(images_folder, videos_folder, output_video_path, image_duration=2, fade_duration=1):
    image_clips = []
    video_clips = []

    # Load image clips
    for filename in sorted(os.listdir(images_folder)):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            image_path = os.path.join(images_folder, filename)
            image_clip = ImageClip(image_path, duration=image_duration).resize(common_resolution).set_fps(frame_rate)
            image_clip = image_clip.fadein(fade_duration).fadeout(fade_duration)
            image_clips.append(image_clip)

    # Load video clips
    for filename in sorted(os.listdir(videos_folder)):
        if filename.endswith(".mp4"):
            video_path = os.path.join(videos_folder, filename)
            video_clip = VideoFileClip(video_path).resize(common_resolution).set_fps(frame_rate)
            video_clip = video_clip.fadein(fade_duration).fadeout(fade_duration)
            video_clips.append(video_clip)

    # Create the final list of clips by alternating between images and videos
    clips = []
    max_len = max(len(image_clips), len(video_clips))

    for i in range(max_len):
        if i < len(image_clips):
            clips.append(image_clips[i])
        if i < len(video_clips):
            clips.append(video_clips[i])

    final_clip = concatenate_videoclips(clips, method="compose")
    
    try:
        final_clip.write_videofile(output_video_path, codec="libx264", audio_codec="aac")
    except Exception as e:
        print(f"Error creating slideshow video: {e}")


# Clean up videos after trimming
clean_up_videos(videos_folder)

# Example usage
pdf_path = r"C:\Users\Happy yadav\Desktop\Technology\hack\test\doc\pdf11.pdf"
output_folder = "images_ocr"

# Extract text from PDF
text = extract_text_from_pdf(pdf_path)

# If no text is found, fall back to OCR
if not text:
    text = extract_text_from_pdf_images(pdf_path, output_folder)

# Generate quiz from the extracted text

quiz_string = generate_quiz(text)

save_quiz_to_json(quiz_string,"questions.json")


# Summarize the extracted text
summary = summarize_text(text)

# Clean the summary text
cleaned_summary = clean_text(summary)

# Generate prompts and speeches from the cleaned summary
output = generate_keywords_from_summary(cleaned_summary)

speeches = output['speech']
# keywords = output['keywords']  # Remove this line

# Generate and save images and videos for the keywords
generate_and_save_images_and_videos_for_keywords(output['keywords'])

# Create the final slideshow video
create_slideshow(pictures_folder, videos_folder, output_video_path)

# Print the results
print("Extracted Text:")
print(text)
print("-----------------------------------------------------------------------------")
print("Cleaned Summary:")
print(cleaned_summary)
print("-----------------------------------------------------------------------------")
print("Generated Speech:")
print(speeches)
# print("-----------------------------------------------------------------------------")
# print("Generated Keywords:")
# print(keywords)  # Remove or comment out this line
