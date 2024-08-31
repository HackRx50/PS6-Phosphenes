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
from moviepy.editor import VideoFileClip
# from diffusers import FluxPipeline

# pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
# pipe.enable_model_cpu_offload() #save some VRAM by offloading the model to CPU. Remove this if you have enough GPU power

# folders

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
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

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
        inp = model.generate_content(f"Write a minimum exact 250 and maximum  exact 300 words more accurate summary based on the previous summary and it should be plain text with no bullet points, no '/n' and no bold stuff, i am using it as input for my tts: {summary}")
        speeches = inp.text
    except Exception as e:
        print(f"Error generating speech: {e}")
        speeches.append("Error generating speech.")

    try:
        res = model.generate_content(f"Generate 10 unique, main and relevant keywords based on summary make sure it's one word and relevant enough to generate an image which i can use in making video: {summary}")

        keywords = re.findall(r'\*\*(.*?)\*\*', res.text)
    except Exception as e:
        print(f"Error generating keywords: {e}")
        # keywords.append("Error generating keywords.")

    return {
        "speech": speeches,
        "keywords": keywords
    }

def clean_text(text):
    # Remove special characters and extra spaces
    text = re.sub(r'\s+', ' ', text)  # Replaces multiple spaces with a single space
    text = re.sub(r'[^a-zA-Z0-9\s.,]', '', text)  # Remove special characters
    return text.strip()

def save_image_from_url(image_url, save_directory, image_index):
    # Ensure the directory exists before saving the image
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
    else:
        print(f"Failed to download video {video_index}")

from moviepy.editor import VideoFileClip

def trim_video(video_path, duration=7):
    try:
        with VideoFileClip(video_path) as video:
            if video.duration > duration:
                # Trim the video to the first `duration` seconds
                trimmed_video = video.subclip(0, duration)
                trimmed_video.write_videofile(video_path, codec='libx264', audio_codec='aac')
            # If the video is 7 seconds or less, it stays as it is
    except Exception as e:
        print(f"Error trimming video {video_path}: {e}")
        # Remove the video if an error occurs during trimming
        if os.path.exists(video_path):
            os.remove(video_path)

def generate_and_save_images_and_videos_for_keywords(keywords):
    for i, keyword in enumerate(keywords):
        print(f"Processing keyword {i + 1}: {keyword}")

        params = {
            'query': keyword,
            'per_page': 1,
            'page': 1
        }

        if i < 5:
            # Fetch and save images for the first 5 keywords
            response = requests.get(url, headers=headers, params=params)
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
            # Fetch and save videos for the remaining keywords
            response = requests.get(vid_url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                videos = data.get('videos', [])

                if videos:
                    video_url = videos[0]['video_files'][0]['link']
                    video_path = os.path.join(videos_folder, f'video_{i + 1}.mp4')
                    save_video_from_url(video_url, videos_folder, i + 1)
                    
                    # Trim the video to 7 seconds if necessary
                    trim_video(video_path)
                else:
                    print(f"No videos found for keyword {keyword}")
            else:
                print(f"Failed to fetch videos for keyword {i + 1}. Status code: {response.status_code}")

def clean_up_videos(folder_path, max_duration=7):
    for filename in os.listdir(folder_path):
        if filename.endswith(".mp4"):
            video_path = os.path.join(folder_path, filename)
            with VideoFileClip(video_path) as video:
                if video.duration > max_duration:
                    os.remove(video_path)
                    print(f"Deleted {video_path} because its duration was greater than {max_duration} seconds.")
# Clean up videos after trimming
clean_up_videos(videos_folder)




# Example usage
pdf_path = r"C:\Users\Happy yadav\Desktop\Technology\hack\test\doc\pdf2.pdf"

output_folder = "images_ocr"

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

generate_and_save_images_and_videos_for_keywords(keywords)



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

