
import PyPDF2
from transformers import pipeline
import spacy
import moviepy.editor as mp
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import requests
from io import BytesIO
import base64
import os
import random
import matplotlib.pyplot as plt

# Make sure to set your Stability AI API key as an environment variable
# STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")
STABILITY_API_KEY = "sk-CkLLFZn7wbT8Z1grSOumBoiQewI2SNYCCwXxU6jJUAbxCuk9";

# Load spaCy model for named entity recognition
nlp = spacy.load("en_core_web_sm")

# Text Analysis Functions
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(text, max_length=150, min_length=50, do_sample=False)
    return summary[0]['summary_text']

def extract_key_points(text):
    doc = nlp(text)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    
    key_sentences = []
    for sent in doc.sents:
        if any(ent.text in sent.text for ent in doc.ents):
            key_sentences.append(sent.text)
    
    return key_sentences, entities

def analyze_text(text):
    summary = summarize_text(text)
    key_sentences, entities = extract_key_points(summary)
    return summary, key_sentences, entities

# Video Generation Functions
def generate_image(prompt, size=(1024, 576)):
    url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
    
    body = {
        "steps": 40,
        "width": size[0],
        "height": size[1],
        "seed": 0,
        "cfg_scale": 5,
        "samples": 1,
        "text_prompts": [
            {
                "text": prompt,
                "weight": 1
            }
        ],
    }
    
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {STABILITY_API_KEY}",
    }
    
    response = requests.post(url, headers=headers, json=body)
    
    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))
    
    data = response.json()
    image_data = base64.b64decode(data["artifacts"][0]["base64"])
    image = Image.open(BytesIO(image_data))
    
    return np.array(image)

def create_text_overlay(text, size=(1024, 576)):
    overlay = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    font = ImageFont.truetype("arial.ttf", 40)
    
    draw.rectangle([0, size[1]-150, size[0], size[1]], fill=(0, 0, 0, 128))
    draw.text((size[0]//2, size[1]-75), text, font=font, fill=(255,255,255), anchor="mm")
    
    return np.array(overlay)

def create_video(summary, key_sentences, entities):
    clips = []
    
    summary_bg = generate_image(f"Abstract visualization of: {summary}")
    summary_overlay = create_text_overlay(summary)
    summary_clip = mp.ImageClip(summary_bg).set_duration(10)
    summary_overlay_clip = mp.ImageClip(summary_overlay).set_duration(10)
    combined_summary_clip = mp.CompositeVideoClip([summary_clip, summary_overlay_clip])
    clips.append(combined_summary_clip)
    
    for sentence in key_sentences:
        bg = generate_image(f"Abstract visualization of: {sentence}")
        overlay = create_text_overlay(sentence)
        bg_clip = mp.ImageClip(bg).set_duration(7)
        overlay_clip = mp.ImageClip(overlay).set_duration(7)
        combined_clip = mp.CompositeVideoClip([bg_clip, overlay_clip])
        clips.append(combined_clip)
    
    for entity, label in entities:
        img = generate_image(f"{entity} related to {label}")
        img_clip = mp.ImageClip(img).set_duration(5)
        txt_clip = mp.TextClip(f"{entity} ({label})", fontsize=70, color='white', font='Arial', bg_color='black')
        txt_clip = txt_clip.set_pos('bottom').set_duration(5)
        combined_clip = mp.CompositeVideoClip([img_clip, txt_clip])
        clips.append(combined_clip)
    
    final_clip = mp.concatenate_videoclips(clips)
    
    audio = mp.AudioFileClip("background_music.mp3").set_duration(final_clip.duration)
    final_clip = final_clip.set_audio(audio)
    
    final_clip.write_videofile("output.mp4", fps=24)
    return "output.mp4"

# Quiz Creation Functions
def generate_quiz(key_points):
    quiz = []
    for point in random.sample(key_points, min(5, len(key_points))):
        question = f"What does this statement mean: '{point}'?"
        quiz.append({"question": question, "answer": point})
    return quiz

# Analytics Dashboard Functions
class AnalyticsDashboard:
    def _init_(self):
        self.video_interactions = []
        self.quiz_scores = []

    def record_video_interaction(self, interaction):
        self.video_interactions.append(interaction)

    def record_quiz_score(self, score):
        self.quiz_scores.append(score)

    def generate_report(self):
        plt.figure(figsize=(10, 5))
        plt.subplot(1, 2, 1)
        plt.hist(self.video_interactions)
        plt.title("Video Interactions")
        
        plt.subplot(1, 2, 2)
        plt.hist(self.quiz_scores)
        plt.title("Quiz Scores")
        
        plt.tight_layout()
        plt.savefig("analytics_report.png")
        return "analytics_report.png"

def initialize_dashboard():
    return AnalyticsDashboard()

# Main Application
def main():
    # 1. Video Generation
    input_text = extract_text_from_pdf("input.pdf")
    summary, key_sentences, entities = analyze_text(input_text)
    video = create_video(summary, key_sentences, entities)
    
    # 2. Quiz Creation
    quiz = generate_quiz(key_sentences)
    
    # 3. Analytics Dashboard
    analytics = initialize_dashboard()
    
    # Run the application
    run_application(video, quiz, analytics)

def run_application(video, quiz, analytics):
    # This function would handle the user interface and interaction
    # It would play the video, present the quiz, and update analytics
    print("Video created:", video)
    print("Quiz generated:", quiz)
    print("Analytics dashboard initialized.")
    # In a real application, you'd implement the UI and user interaction here

if __name__ == "_main_":
    main()