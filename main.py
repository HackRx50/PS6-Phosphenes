import PyPDF2
from transformers import pipeline
from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont
from moviepy.editor import ImageClip, concatenate_videoclips, AudioFileClip
from diffusers import StableDiffusionPipeline
import textwrap

# 1. Extract Text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

# 2. Summarize the Text
def summarize_text(pdf_text):
    summarizer = pipeline("summarization")
    bert_summary = summarizer(pdf_text, max_length=150, min_length=50, do_sample=False)[0]['summary_text']
    
    # Return a short snippet of the text for the Spacy summary
    spacy_summary = " ".join(pdf_text.split()[:50])
    
    return spacy_summary, bert_summary

# 3. Generate Narration
def text_to_speech(text, output_file):
    tts = gTTS(text=text, lang='en')
    tts.save(output_file)

# 4. Create Visual Slides
def create_slide(text, image_path, output_path):
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("arial.ttf", 50)
    
    # Handle text wrapping
    wrapped_text = textwrap.fill(text, width=30)
    
    # Determine text size and position
    bbox = draw.textbbox((0, 0), wrapped_text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    width, height = image.size
    draw.text(((width-text_w)/2, (height-text_h)/2), wrapped_text, font=font, fill="white")
    
    image.save(output_path)

# 5. Generate Images from Text Using TensorFlow (via diffusers)
def generate_image_from_text(text, output_path):
    pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")
    image = pipe(prompt=text).images[0]
    image.save(output_path)

# 6. Chunk Text
def chunk_text(text, chunk_size=200):
    return textwrap.wrap(text, chunk_size)

# 7. Assemble the Video
def create_video(slide_images, audio_file, output_video):
    clips = [ImageClip(img).set_duration(5) for img in slide_images]
    video = concatenate_videoclips(clips, method="compose")
    audio = AudioFileClip(audio_file)
    video = video.set_audio(audio)
    video.write_videofile(output_video, fps=24)

# 8. Adding Transitions
def add_transitions(clips):
    return [clip.crossfadein(1) for clip in clips]

# Main execution
if __name__ == "__main__":
    pdf_text = extract_text_from_pdf('sample.pdf')
    spacy_summary, bert_summary = summarize_text(pdf_text)
    
    text_to_speech(bert_summary, 'narration.mp3')
    
    # Generate slides based on summaries
    create_slide(spacy_summary, "background1.jpg", "slide1.jpg")
    
    # Chunk the BERT summary and generate images for each chunk
    chunks = chunk_text(bert_summary, chunk_size=100)  # Adjust chunk_size as needed
    image_paths = []
    
    for i, chunk in enumerate(chunks):
        image_path = f"slide_{i + 2}.jpg"
        generate_image_from_text(chunk, image_path)
        image_paths.append(image_path)
    
    clips = [ImageClip(img).set_duration(5) for img in ["slide1.jpg"] + image_paths]
    clips = add_transitions(clips)
    
    final_video = concatenate_videoclips(clips, method="compose")
    final_video.set_audio(AudioFileClip("narration.mp3"))
    final_video.write_videofile("final_output.mp4", fps=24)
