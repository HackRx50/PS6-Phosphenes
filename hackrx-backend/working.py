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
from moviepy.editor import *
from moviepy.video.fx.all import crop, loop
from moviepy.video.tools.drawing import circle
import json
import pysrt
import numpy as np
from gtts import gTTS
from googletrans import Translator
from pydub import AudioSegment
from moviepy.video.fx.all import colorx
from moviepy.video.tools.subtitles import SubtitlesClip
import base64
from docx import Document
from pptx import Presentation



api_key = os.getenv("API_KEY")

# Configure API key for Google Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')
# def add_fadein_text_on_image(image_path, texts, output_video_path, duration=5, vertical_margin=50):
#     """
#     Add smooth fade-in text as pointers, stacked vertically, starting from the left on an image and save as a video.

#     Args:
#         image_path (str): Path to the image file.
#         texts (list): List of strings for each pointer text.
#         output_video_path (str): Path to save the resulting video.
#         duration (int): Duration of the video in seconds.
#         vertical_margin (int): The margin between the text pointers.
#     """
#     # Load the image
#     image_clip = ImageClip(image_path, duration=duration)

#     # Create a list to hold the text clips
#     text_clips = []

#     # Get image height to position the text pointers vertically
#     image_width, image_height = image_clip.size

#     # Starting y-position for the first pointer
#     y_start = image_height // 4

#     # Add each text as a clip and position them vertically starting from the left
#     for idx, text in enumerate(texts):
#         # Create text clip
#         text_clip = TextClip(text, fontsize=35, color='white', font="Arial-Bold")

#         # Calculate the position: Left-aligned and vertically stacked
#         x_pos = 50  # Starting from the left with a 50px margin
#         y_pos = y_start + idx * (text_clip.size[1] + vertical_margin)  # Stacked vertically with margin

#         # Set the position and duration for the text clip
#         text_clip = text_clip.set_position((x_pos, y_pos)).set_duration(duration)

#         # Apply the fade-in effect with the text fully invisible at the start
#         text_clip = text_clip.crossfadein(1.5)  # Smooth fade-in over 1.5 seconds

#         # Add a delay for each text clip to make it fade in at different times
#         text_clip = text_clip.set_start(idx * 0.5)  # Delay between fades

#         text_clips.append(text_clip)

#     # Combine the image and text clips
#     final_clip = CompositeVideoClip([image_clip] + text_clips).set_duration(5)

#     # Save the video
#     final_clip.write_videofile(output_video_path, fps=24)

# # Example usage
# texts = [
#     "The cat sat quietly by the window, watching the birds outside.",
#     "She picked up the book and began to read under the warm light.",
#     "The cat sat quietly by the window, watching the birds outside.",
# ]

# add_fadein_text_on_image(r"D:\hackerx\Phosphenes-HackRx-5.0\hackrx-backend\ai_generated_images\bg_img.png", texts, "output_video.mp4")


def create_dynamic_pointers_from_srt(srt_file_path, image_path, output_video_path, duration=5, vertical_margin=50):
    # Load the SRT file and extract chunks directly in one step
    subs = pysrt.open(srt_file_path)
    chunks = [sub.text for sub in subs]

    # Generate pointers by grouping every 3 chunks into one set of 3 chunks
    pointer_texts = []
    for i in range(0, len(chunks), 3):
        # Join every 3 chunks into one string
        chunk_group = " ".join(chunks[i:i+3])
        print(chunk_group)
        # Generate a pointer from Gemini AI based on the chunk group
        try:
            prompt = f"Generate a concise 10-word pointer summarizing the following text: {chunk_group}"
            response = model.generate_content(prompt)
            pointer_text = response.text.strip()  # Get the generated pointer text
            pointer_texts.append(pointer_text)  # Add it to the pointer list
        except Exception as e:
            print(f"Error generating pointer with Gemini AI: {e}")
            pointer_texts.append("Error generating pointer")  # If error, append a placeholder text

    # Load the image
    image_clip = ImageClip(image_path, duration=duration)

    # Create a list to hold the text clips
    text_clips = []

    # Get image height to position the text pointers vertically
    image_width, image_height = image_clip.size

    # Starting y-position for the first pointer
    y_start = image_height // 4

    # Add each text as a clip and position them vertically starting from the left
    for idx, text in enumerate(pointer_texts):
        # Create text clip
        text_clip = TextClip(text, fontsize=35, color='white', font="Arial-Bold")

        # Calculate the position: Left-aligned and vertically stacked
        x_pos = 50  # Starting from the left with a 50px margin
        y_pos = y_start + idx * (text_clip.size[1] + vertical_margin)  # Stacked vertically with margin

        # Set the position and duration for the text clip
        text_clip = text_clip.set_position((x_pos, y_pos)).set_duration(duration)

        # Apply the fade-in effect with the text fully invisible at the start
        text_clip = text_clip.crossfadein(1.5)  # Smooth fade-in over 1.5 seconds

        # Add a delay for each text clip to make it fade in at different times
        text_clip = text_clip.set_start(idx * 0.5)  # Delay between fades

        text_clips.append(text_clip)

    # Combine the image and text clips
    final_clip = CompositeVideoClip([image_clip] + text_clips).set_duration(duration)

    # Save the video
    final_clip.write_videofile(output_video_path, fps=24)


create_dynamic_pointers_from_srt("subtitles.srt", r"D:\hackerx\Phosphenes-HackRx-5.0\hackrx-backend\ai_generated_images\bg_img.png", "video_0_trimmed.mp4")