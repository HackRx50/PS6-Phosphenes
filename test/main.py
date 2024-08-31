import requests
import pdfplumber
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import os
import re
import google.generativeai as genai
import torch
from dotenv import load_dotenv
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForCausalLM
from moviepy.editor import ImageClip, VideoFileClip, concatenate_videoclips
from moviepy.video.fx import resize
import time
import json

print("Current working directory:", os.getcwd())
# from diffusers import FluxPipeline

# pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
# pipe.enable_model_cpu_offload() #save some VRAM by offloading the model to CPU. Remove this if you have enough GPU power

# folders

generated_video_folder = "generated_video"
os.makedirs(generated_video_folder, exist_ok=True)
output_video_path = os.path.join(generated_video_folder, "slideshow_video.mp4")

pictures_folder = "pictures"
videos_folder = "videos"

os.makedirs(pictures_folder, exist_ok=True)
os.makedirs(videos_folder, exist_ok=True)

url = 'https://api.pexels.com/v1/search'

vid_url = 'https://api.pexels.com/videos/search'


# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("IMG_API")

# Configure API key for Google Gemini
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Set path for Tesseract OCR
pytesseract.pytesseract.tesseract_cmd = r'D:\tesseract\tesseract.exe'

# Load the tokenizer
# tokenizer = AutoTokenizer.from_pretrained("black-forest-labs/FLUX.1-schnell")

# Load the model
# img_model = AutoModelForSeq2SeqLM.from_pretrained("black-forest-labs/FLUX.1-schnell")
def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    max_chunk = 1024
    text_chunks = [text[i:i + max_chunk] for i in range(0, len(text), max_chunk)]
    summary = ""
    for chunk in text_chunks:
        summary += summarizer(chunk, max_length=130, min_length=30, do_sample=False)[0]['summary_text'] + " "
    return summary.strip()

def extract_images_from_pdf(pdf_path, output_folder):
    doc = fitz.open(pdf_path)
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
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
            image = Image.open(image_path)
            text += pytesseract.image_to_string(image) + "\n"
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
        inp = model.generate_content(f"Write a minimum 150 and maximum 200 words more accurate summary based on the previous summary and it should be plain text with no bullet points, no '/n' and no bold stuff, i am using it as input for my tts: {summary}")
        speeches = inp.text
    except Exception as e:
        print(f"Error generating speech: {e}")
        speeches = "Error generating speech."

    try:
        res = model.generate_content(f"Generate 10 unique, main and relevant keywords based on summary make sure it's one word and relevant enough to generate an image which i can use in making video: {summary}")
        keywords = re.findall(r'\*\*(.*?)\*\*', res.text)
    except Exception as e:
        print(f"Error generating keywords: {e}")
        keywords = []

    return {
        "speech": speeches,
        "keywords": keywords
    }

def generate_quiz(text):
    quizString = ""
    try:
        inp = model.generate_content(f"Generate quiz which contains 5 questions in mcq format containing 'question', 'options', 'answer' in json list formate based on the text: {text}")
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
    image_response = requests.get(image_url)
    if image_response.status_code == 200:
        image_path = os.path.join(save_directory, f'image_{image_index}.jpg')
        with open(image_path, 'wb') as file:
            file.write(image_response.content)
        print(f"Image {image_index} saved as {image_path}")
    else:
        print(f"Failed to download image {image_index}")

def save_video_from_url(video_url, save_directory, video_index):
    os.makedirs(save_directory, exist_ok=True)
    video_response = requests.get(video_url)
    if video_response.status_code == 200:
        video_path = os.path.join(save_directory, f'video_{video_index}.mp4')
        with open(video_path, 'wb') as file:
            file.write(video_response.content)
        print(f"Video {video_index} saved as {video_path}")
        try:
            trimmed_video_path = os.path.join(save_directory, f'trimmed_video_{video_index}.mp4')
            with VideoFileClip(video_path) as video:
                trimmed_video = video.subclip(0, min(10, video.duration))
                trimmed_video.write_videofile(trimmed_video_path, codec="libx264")
                print(f"Video {video_index} trimmed to 10 seconds and saved as {trimmed_video_path}")
            os.remove(video_path)  # Remove the original video file
        except Exception as e:
            print(f"Failed to trim video {video_index}: {e}")
    else:
        print(f"Failed to download video {video_index}")

def generate_and_save_images_and_videos_for_keywords(keywords):
    headers = {'Authorization': API_KEY}
    for i, keyword in enumerate(keywords, 1):
        print(f"Processing keyword {i}: {keyword}")
        params = {'query': keyword, 'per_page': 1, 'page': 1}
        if i <= 5:
            response = requests.get(url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                images = data['photos']
                for j, image in enumerate(images):
                    image_url = image['src']['original']
                    save_image_from_url(image_url, pictures_folder, i)
            else:
                print(f"Failed to fetch images for keyword {i}. Status code: {response.status_code}")
        else:
            response = requests.get(vid_url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                videos = data['videos']
                for j, video in enumerate(videos):
                    video_url = video['video_files'][0]['link']
                    save_video_from_url(video_url, videos_folder, i)
            else:
                print(f"Failed to fetch videos for keyword {i}. Status code: {response.status_code}")


# def wait_for_files(folder_path, file_extensions, max_wait_time=60):
#     start_time = time.time()
#     while time.time() - start_time < max_wait_time:
#         files = [f for f in os.listdir(folder_path) if f.endswith(file_extensions)]
#         if files:
#             return True
#         time.sleep(5)  # Wait for 5 seconds before checking again
#     return False


def load_images_and_videos(images_folder, videos_folder):
    # Get image and video file paths
    image_files = sorted([os.path.join(images_folder, img) for img in os.listdir(images_folder) if img.endswith(('.png', '.jpg', '.jpeg'))])
    video_files = sorted([os.path.join(videos_folder, vid) for vid in os.listdir(videos_folder) if vid.startswith('trimmed_video')])
    
    print("Image files:", image_files)
    print("Video files:", video_files)
    
    # Check if files are found
    if not image_files:
        print("No image files found in the folder.")
    if not video_files:
        print("No video files found in the folder.")
    
    # Load clips
    image_clips = []
    video_clips = []
    
    for img in image_files:
        try:
            image_clips.append(ImageClip(img).set_duration(6))  # Each image shown for 6 seconds
        except Exception as e:
            print(f"Failed to load image {img}: {e}")
    
    for vid in video_files:
        try:
            video_clips.append(VideoFileClip(vid))
        except Exception as e:
            print(f"Failed to load video {vid}: {e}")
    
    return image_clips, video_clips

# def create_slideshow(images_folder, videos_folder, output_video_path):
#     # Wait for files to be available
#     if not wait_for_files(images_folder, ('.png', '.jpg'), max_wait_time=60):
#         print("Timeout waiting for images to be available.")
#         return
#     if not wait_for_files(videos_folder, ('trimmed_video',), max_wait_time=60):
#         print("Timeout waiting for videos to be available.")
#         return

#     image_clips, video_clips = load_images_and_videos(images_folder, videos_folder)

#     print(f"Loaded {len(image_clips)} image clips and {len(video_clips)} video clips.")

#     if not image_clips and not video_clips:
#         print("No images or videos to include in the slideshow.")
#         return

#     clips = image_clips + video_clips

#     if not clips:
#         print("No clips available to create slideshow.")
#         return

#     try:
#         final_clip = concatenate_videoclips(clips, method="compose")
#         final_clip = resize(final_clip, height=720)
#         final_clip.write_videofile(output_video_path, codec="libx264", fps=24)
#         print(f"Slideshow created successfully: {output_video_path}")
#     except Exception as e:
#         print(f"Error creating slideshow: {e}")

# def create_slideshow(images_folder, videos_folder, output_video_path):
#     # Wait for files to be available
#     if not wait_for_files(images_folder, ('.png', '.jpg'), max_wait_time=60):
#         print("Timeout waiting for images to be available.")
#         return
#     if not wait_for_files(videos_folder, ('trimmed_video',), max_wait_time=60):
#         print("Timeout waiting for videos to be available.")
#         return
    
#     image_clips, video_clips = load_images_and_videos(images_folder, videos_folder)
    
#     if not image_clips and not video_clips:
#         print("No images or videos to include in the slideshow.")
#         return
    
#     clips = image_clips + video_clips
    
#     if not clips:
#         print("No clips available to create slideshow.")
#         return

#     try:
#         final_clip = concatenate_videoclips(clips, method="compose")
#         final_clip = resize(final_clip, height=720)
#         final_clip.write_videofile(output_video_path, codec="libx264", fps=24)
#         print(f"Slideshow created successfully: {output_video_path}")
#     except Exception as e:
#         print(f"Error creating slideshow: {e}")


pdf_path = r"D:\chatbot\pdf2.pdf"
output_folder = "images_ocr"
output_video = "slideshow_video.mp4"

text = extract_text_from_pdf(pdf_path)
if not text:
    text = extract_text_from_pdf_images(pdf_path, output_folder)

quiz_string = generate_quiz(text)

save_quiz_to_json(quiz_string,"questions.json")

summary = summarize_text(text)
cleaned_summary = clean_text(summary)
output = generate_keywords_from_summary(cleaned_summary)
speeches = output['speech']
keywords = output['keywords']

generate_and_save_images_and_videos_for_keywords(keywords)
# create_slideshow(pictures_folder, videos_folder, output_video)
# Extract text from PDF
text = extract_text_from_pdf(pdf_path)

# If no text is found, fall back to OCR
if not text:
    text = extract_text_from_pdf_images(pdf_path, output_folder)

# Summarize the extracted text
summary = summarize_text(text)

# Clean the summary text
cleaned_summary = clean_text(summary)

# Generate prompts and speeches from the cleaned summary
output = generate_keywords_from_summary(cleaned_summary)

speeches = output['speech']
keywords = output['keywords']

num_images = 5

save_directory = "pictures"

if not os.path.exists(save_directory):
    os.makedirs(save_directory)


headers = {
    'Authorization': API_KEY
}

# generate_and_save_images_and_videos_for_keywords(keywords)

# Generate images using FLUX from the generated prompts
# images = generate_images_with_flux(keywords, output_folder)

# Print the results
print(text)
print("-----------------------------------------------------------------------------")
print()
print(cleaned_summary)
print("-----------------------------------------------------------------------------")
print()
print(speeches)
print("-----------------------------------------------------------------------------")
print()

for i, keyword in enumerate(keywords, 1):
    print(f"keyword {i}: {keyword}")
# print("\nGenerated Images:")
# for image_path in images:
#     print(image_path)

# You can uncomment the video generation code if you have a suitable model for that
# def generate_video_from_text(prompt, output_video_path):
#     tokenizer = AutoTokenizer.from_pretrained("THUDM/CogVideoX-2b")
#     model = AutoModelForCausalLM.from_pretrained("THUDM/CogVideoX-2b")
    
#     inputs = tokenizer(prompt, return_tensors="pt")
#     video_tensor = model.generate(**inputs)

#     # This is a placeholder. You would save the video_tensor to a video file here.
#     with open(output_video_path, "wb") as video_file:
#         video_file.write(video_tensor)

# # Example usage for video generation
# output_video_path = "output_video.mp4"
# generate_video_from_text(cleaned_summary, output_video_path)
