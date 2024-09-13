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
from moviepy.editor import VideoFileClip, ImageClip, concatenate_videoclips, CompositeVideoClip, TextClip, ColorClip, AudioFileClip
import json
import pysrt
import numpy as np
from gtts import gTTS
from googletrans import Translator
from pydub import AudioSegment

def generate_video_from_pdf(pdf_path, overlay_video_path):
    # Set up folders
    pictures_folder = "pictures"
    videos_folder = "videos"
    output_video_path = "final_slideshow.mp4"
    audio_output_path = "final_audio.mp3"
    audio_output_speedup_path = "final_audio_speeded_up.mp3"
    srt_file_path = "subtitles.srt"

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
    pytesseract.pytesseract.tesseract_cmd = r'D:\tesseract\tesseract.exe'

    # Define common resolution and frame rate
    common_resolution = (1280, 720)
    frame_rate = 24

    def summarize_text(text):
        print("Summarizing text...")
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
        print("Extracting text from PDF images...")
        extract_images_from_pdf(pdf_path, output_folder)
        text = ocr_images_in_folder(output_folder)
        return text

    def extract_text_from_pdf(pdf_path):
        print("Extracting text from PDF...")
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text

    def generate_keywords_from_summary(summary):
        print("Generating keywords from summary...")
        speeches = ""
        keywords = []

        try:
            inp = model.generate_content(f"Write a minimum exact 250 and maximum exact 300 words more accurate summary based on the previous summary in paragraph format and it should be plain text with no bullet points, no '/n' and no bold stuff, i am using it as input for my tts: {summary}")
            speeches = inp.text
        except Exception as e:
            print(f"Error generating speech: {e}")

        try:
            res = model.generate_content(f"Generate 20 unique, main and relevant keywords based on summary make sure it's one word and relevant enough to generate an image which I can use in making video: {summary}")
            keywords = re.findall(r'\*\*(.*?)\*\*', res.text)
        except Exception as e:
            print(f"Error generating keywords: {e}")

        return {
            "speech": speeches,
            "keywords": keywords
        }

    def generate_subtitles_from_speech(speech_text, audio_duration, output_srt_path, chunk_duration=5):
        print("Generating subtitles...")
        words = speech_text.split()
        chunk_size = int(audio_duration // chunk_duration)
        chunks = [words[i:i + chunk_size] for i in range(0, len(words), chunk_size)]
        
        total_chunks = len(chunks)
        
        if total_chunks > 1 and (audio_duration / total_chunks) < chunk_duration:
            chunk_duration = audio_duration / total_chunks
        
        subs = pysrt.SubRipFile()
        for i, chunk in enumerate(chunks):
            start_time = i * (audio_duration / total_chunks)
            end_time = (i + 1) * (audio_duration / total_chunks)
            
            if end_time > audio_duration:
                end_time = audio_duration
            
            start_time = pysrt.SubRipTime(seconds=start_time)
            end_time = pysrt.SubRipTime(seconds=end_time)

            subtitle = pysrt.SubRipItem(index=i+1, start=start_time, end=end_time, text=' '.join(chunk))
            subs.append(subtitle)

        subs.save(output_srt_path, encoding='utf-8')
        print(f"Subtitles saved to {output_srt_path}")

    def generate_quiz(text):
        print("Generating quiz...")
        quiz_string = ""
        try:
            inp = model.generate_content(f"Generate quiz which contains 10 questions with unique answers in MCQ format containing 'question', 'options', 'answer' in JSON list format based on the text: {text}")
            quiz_string = inp.text
        except Exception as e:
            print(f"Error generating quiz: {e}")
        return quiz_string

    def save_quiz_to_json(quiz_string, output_file):
        print("Saving quiz to JSON...")
        cleaned_string = quiz_string.replace('```json', '').replace('```', '').strip()
        
        try:
            quiz_json = json.loads(cleaned_string)
            with open(output_file, 'w') as json_file:
                json.dump(quiz_json, json_file, indent=4)
            print(f"Quiz data saved successfully to {output_file}")
        except json.JSONDecodeError as e:
            print(f"Failed to decode JSON: {e}")

    def clean_text(text):
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'[^a-zA-Z0-9\s.,]', '', text)
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

    def download_media(query, media_type, num_results=1, save_directory='media'):
        print(f"Downloading {media_type} media...")
        url = img_url if media_type == 'image' else vid_url
        response = requests.get(url, headers={'Authorization': API_KEY}, params={'query': query, 'per_page': num_results})
        media = response.json()
        media_list = media.get('photos' if media_type == 'image' else 'videos', [])
        
        for index, item in enumerate(media_list):
            if media_type == 'image':
                save_image_from_url(item['src']['original'], save_directory, index)
            else:
                save_video_from_url(item['video_files'][0]['link'], save_directory, index)

    def generate_audio_from_text(text, output_audio_path):
        print("Generating audio from text...")
        try:
            tts = gTTS(text=text, lang='en')
            tts.save(output_audio_path)
            print(f"Audio saved as {output_audio_path}")
        except Exception as e:
            print(f"Error generating audio: {e}")

    def speed_up_audio(input_audio_path, output_audio_path, speed_factor=1.5):
        print("Speeding up audio...")
        try:
            audio = AudioSegment.from_file(input_audio_path)
            new_audio = audio.speedup(playback_speed=speed_factor)
            new_audio.export(output_audio_path, format="mp3")
            print(f"Speeded up audio saved as {output_audio_path}")
        except Exception as e:
            print(f"Error speeding up audio: {e}")

    def create_slideshow(images_folder, video_paths, output_video_path, common_resolution, frame_rate):
        print("Creating slideshow...")
        clips = []
        
        for image_file in os.listdir(images_folder):
            if image_file.endswith(".png"):
                image_path = os.path.join(images_folder, image_file)
                image_clip = ImageClip(image_path).set_duration(2).resize(newsize=common_resolution)
                clips.append(image_clip)
        
        for video_file in os.listdir(videos_folder):
            if video_file.endswith(".mp4"):
                video_path = os.path.join(videos_folder, video_file)
                video_clip = VideoFileClip(video_path).resize(newsize=common_resolution)
                clips.append(video_clip)

        final_clip = concatenate_videoclips(clips, method="compose")
        final_clip.write_videofile(output_video_path, codec='libx264', fps=frame_rate)
        print(f"Final slideshow video saved as {output_video_path}")

    # Main process
    text_from_pdf = extract_text_from_pdf(pdf_path)
    images_folder = "pictures"
    text_from_pdf_images = extract_text_from_pdf_images(pdf_path, images_folder)

    combined_text = text_from_pdf + "\n" + text_from_pdf_images
    summary = summarize_text(combined_text)

    keywords = generate_keywords_from_summary(summary)

    generate_audio_from_text(keywords['speech'], audio_output_path)
    speed_up_audio(audio_output_path, audio_output_speedup_path)

    download_media(" ".join(keywords['keywords']), 'image', num_results=5, save_directory=pictures_folder)
    download_media(" ".join(keywords['keywords']), 'video', num_results=2, save_directory=videos_folder)
    
    create_slideshow(pictures_folder, videos_folder, output_video_path, common_resolution, frame_rate)

    audio_duration = AudioFileClip(audio_output_speedup_path).duration
    generate_subtitles_from_speech(keywords['speech'], audio_duration, output_srt_path=srt_file_path)

    print(f"Process completed. Final video saved as {output_video_path} and audio saved as {audio_output_path}")

# Example usage
generate_video_from_pdf(r'D:\hackerx\Phosphenes-HackRx-5.0\test\doc\pdf2.pdf', 'overlay_video.mp4')
