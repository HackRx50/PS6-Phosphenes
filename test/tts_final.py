from gtts import gTTS
from googletrans import Translator
from pydub import AudioSegment
from moviepy.editor import TextClip, CompositeVideoClip, AudioFileClip, ColorClip
import math
import os
import textwrap

# Set the path to the ImageMagick binary if needed
# os.environ["IMAGEMAGICK_BINARY"] = r"C:\Program Files\ImageMagick-<version>\magick.exe"  # Update this path

# Dictionary of supported languages with their codes
languages = {
    'hindi': 'hi',
    'english': 'en',
    'bengali': 'bn',
    'telugu': 'te',
    'marathi': 'mr',
    'tamil': 'ta',
    'kannada': 'kn',
    'malayalam': 'ml',
    'gujarati': 'gu',
    'punjabi': 'pa',
    'urdu': 'ur'
}

# Prompt the user to select a language
print("Please select a language from the following list:")
for lang in languages:
    print(f"- {lang}")

# Get the user input
selected_language = input("Enter the language: ").strip().lower()

# English text (or any other text to be translated)
text = ("A surreal cityscape where buildings are made of crumpled receipts, medical bills, and credit card statements. "
        "In the foreground, a giant, faceless figure made of stacks of cash is holding a tiny, crying figure representing "
        "someone struggling to pay their non-medical expenses. The sky is a swirling mix of red and black, symbolizing the overwhelming burden of debt.")

# Check if the selected language is supported
if selected_language in languages:
    # Get the language code
    lang_code = languages[selected_language]

    # Translate the text to the selected language using googletrans for audio
    translator = Translator()
    translated_text_for_audio = translator.translate(text, dest=lang_code).text

    # Create gTTS object with the translated text for audio
    tts = gTTS(text=translated_text_for_audio, lang=lang_code)

    # Save the audio file
    tts.save("final_audio.mp3")

    # Load the audio file with pydub
    audio = AudioSegment.from_file("final_audio.mp3")

    # Speed up the audio by a factor of 1.25
    speeded_up_audio = audio.speedup(playback_speed=1.25)

    # Export the modified audio
    speeded_up_audio.export("final_audio_speeded_up.mp3", format="mp3")
    print("Audio has been saved as 'final_audio_speeded_up.mp3' with increased speed.")

    os.remove("final_audio.mp3")

    # Function to split text into chunks
    def split_text_into_chunks(text, max_length=100):
        return [text[i:i + max_length] for i in range(0, len(text), max_length)]

    # Function to format seconds into SRT time format
    def format_time(seconds):
        minutes, seconds = divmod(seconds, 60)
        hours, minutes = divmod(minutes, 60)
        milliseconds = int((seconds - int(seconds)) * 1000)
        return f"{int(hours):02}:{int(minutes):02}:{int(seconds):02},{milliseconds:03}"

    # Function to create SRT file
    def create_srt_file(audio_file, text, filename="subtitles.srt"):
        audio = AudioFileClip(audio_file)
        duration = audio.duration
        chunks = split_text_into_chunks(text)
        num_chunks = len(chunks)
        chunk_duration = duration / num_chunks

        with open(filename, "w", encoding="utf-8") as file:
            for i, chunk in enumerate(chunks):
                start_time = i * chunk_duration
                end_time = (i + 1) * chunk_duration
                start_str = format_time(start_time)
                end_str = format_time(end_time)
                file.write(f"{i + 1}\n")
                file.write(f"{start_str} --> {end_str}\n")
                file.write(f"{chunk}\n\n")

    # Create SRT file for the subtitles (always in English)
    create_srt_file("final_audio_speeded_up.mp3", text)

    # Function to generate the video with subtitles
    def generate_video_with_subtitles(audio_file, srt_file, output_video="final_video.mp4"):
        audio_clip = AudioFileClip(audio_file)
        duration = audio_clip.duration

        # Create a blank video clip with a solid color (background)
        video_clip = ColorClip(size=(1280, 720), color=(0, 0, 0), duration=duration)

        # Read the subtitles from the SRT file and create TextClip objects
        subtitles = []
        with open(srt_file, "r", encoding="utf-8") as file:
            lines = file.readlines()

        for i in range(0, len(lines), 4):
            start_time = lines[i+1].split(" --> ")[0]
            end_time = lines[i+1].split(" --> ")[1].strip()
            subtitle_text = lines[i+2].strip()

            # Wrap text to ensure it fits well
            wrapped_text = textwrap.fill(subtitle_text, width=40)

            start_time_sec = sum(x * float(t) for x, t in zip([3600, 60, 1, 0.001], start_time.replace(',', ':').split(':')))
            end_time_sec = sum(x * float(t) for x, t in zip([3600, 60, 1, 0.001], end_time.replace(',', ':').split(':')))

            try:
                subtitle_clip = (TextClip(wrapped_text, fontsize=24, color='white', font='Arial')
                                 .set_position(('center', 'bottom'))
                                 .set_duration(end_time_sec - start_time_sec)
                                 .set_start(start_time_sec))
                subtitles.append(subtitle_clip)
            except Exception as e:
                print(f"Error creating subtitle clip: {e}")

        # Overlay subtitles on the video
        final_video = CompositeVideoClip([video_clip] + subtitles)
        final_video = final_video.set_audio(audio_clip)

        # Write the result to a video file
        final_video.write_videofile(output_video, fps=24, codec='libx264')
        print(f"Video has been saved as '{output_video}'.")

    # Generate the video with subtitles
    generate_video_with_subtitles("final_audio_speeded_up.mp3", "subtitles.srt")

else:
    print("Sorry, the selected language is not supported.")
