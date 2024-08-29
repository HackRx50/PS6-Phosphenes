from gtts import gTTS
from googletrans import Translator
from pydub import AudioSegment
from moviepy.editor import TextClip, CompositeVideoClip, AudioFileClip, ColorClip
import math

# Dictionary of supported languages with their codes
languages = {
    'hindi': 'hi',
    'english': 'en',       # Hindi language code
    'bengali': 'bn',     # Bengali language code
    'telugu': 'te',      # Telugu language code
    'marathi': 'mr',     # Marathi language code
    'tamil': 'ta',       # Tamil language code
    'kannada': 'kn',     # Kannada language code
    'malayalam': 'ml',   # Malayalam language code
    'gujarati': 'gu',    # Gujarati language code
    'punjabi': 'pa',     # Punjabi language code
    'urdu': 'ur'         # Urdu language code
}

# Prompt the user to select a language
print("Please select a language from the following list:")
for lang in languages:
    print(f"- {lang}")

# Get the user input
selected_language = input("Enter the language: ").strip().lower()

# Check if the selected language is supported
if selected_language in languages:
    # Get the language code
    lang_code = languages[selected_language]

    # English text (or any other text to be translated)
    text = ("Hey, we are Team Algorithm and we are working on a project based on text-to-instant video creation through document uploading. "
            "It also includes text-to-speech and image generation from text and speech. We are using various technologies like PyTesseract, "
            "PDFPlumber, PDF2Image, gTTS, OpenCV, and many more. We are also using AI models for generating content and keywords. Our team includes "
            "dedicated developers who are working hard to make this project successful. Meet the team members: Happy Yadav and Vedansh Sharma, who are "
            "Python & backend developers, and Hishita Gupta & Ansh Chahal, who are UI/UX Designers and Frontend developers. We are going to win the "
            "HackerX 5.0, which is going to be conducted in Pune."
            )

    # Translate the text to the selected language using googletrans
    translator = Translator()
    translated_text = translator.translate(text, dest=lang_code).text

    # Create gTTS object with the translated text
    tts = gTTS(text=translated_text, lang=lang_code)

    # Save the audio file
    tts.save("final_audio.mp3")

    # Load the audio file with pydub
    audio = AudioSegment.from_file("final_audio.mp3")

    # Speed up the audio by a factor of 1.25 (you can adjust this factor)
    speeded_up_audio = audio.speedup(playback_speed=1.25)

    # Export the modified audio
    speeded_up_audio.export("final_audio_speeded_up.mp3", format="mp3")
    print("Audio has been saved as 'final_audio_speeded_up.mp3' with increased speed.")

    # Function to split text into chunks
    def split_text_into_chunks(text, max_length=100):
        """
        Split text into chunks of specified maximum length.
        """
        return [text[i:i + max_length] for i in range(0, len(text), max_length)]  # Split text into chunks

    # Function to format seconds into SRT time format
    def format_time(seconds):
        """
        Convert time in seconds to SRT time format (HH:MM:SS,MMM).
        """
        minutes, seconds = divmod(seconds, 60)  # Convert seconds to minutes and seconds
        hours, minutes = divmod(minutes, 60)  # Convert minutes to hours and minutes
        milliseconds = int((seconds - int(seconds)) * 1000)  # Calculate milliseconds
        return f"{int(hours):02}:{int(minutes):02}:{int(seconds):02},{milliseconds:03}"  # Format time

    # Function to create SRT file
    def create_srt_file(audio_file, text, filename="subtitles.srt"):
        """
        Create an SRT file with subtitles based on audio duration and text chunks.
        """
        audio = AudioFileClip(audio_file)  # Load audio file
        duration = audio.duration  # Get duration of audio
        chunks = split_text_into_chunks(text)  # Split text into chunks
        num_chunks = len(chunks)  # Number of text chunks
        
        # Calculate duration for each subtitle chunk
        chunk_duration = duration / num_chunks

        with open(filename, "w", encoding="utf-8") as file:  # Open SRT file for writing with UTF-8 encoding
            for i, chunk in enumerate(chunks):
                start_time = i * chunk_duration  # Calculate start time
                end_time = (i + 1) * chunk_duration  # Calculate end time
                start_str = format_time(start_time)  # Format start time
                end_str = format_time(end_time)  # Format end time
                
                # Write subtitle information to file
                file.write(f"{i + 1}\n")
                file.write(f"{start_str} --> {end_str}\n")
                file.write(f"{chunk}\n\n")

    # Create SRT file for the subtitles
    create_srt_file("final_audio_speeded_up.mp3", translated_text)

    # Function to generate the video with subtitles
    def generate_video_with_subtitles(audio_file, srt_file, output_video="final_video.mp4"):
        """
        Generate a video with subtitles synced to the audio.
        """
        audio_clip = AudioFileClip(audio_file)  # Load the audio file
        duration = audio_clip.duration  # Get the duration of the audio

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

            start_time_sec = sum(x * float(t) for x, t in zip([3600, 60, 1, 0.001], start_time.replace(',', ':').split(':')))
            end_time_sec = sum(x * float(t) for x, t in zip([3600, 60, 1, 0.001], end_time.replace(',', ':').split(':')))

            subtitle_clip = (TextClip(subtitle_text, fontsize=14, color='white', font='Arial-Bold')
                             .set_position(('center', 'bottom'))
                             .set_duration(end_time_sec - start_time_sec)
                             .set_start(start_time_sec))
            
            subtitles.append(subtitle_clip)

        # Overlay subtitles on the video
        final_video = CompositeVideoClip([video_clip] + subtitles)

        # Set the audio to the final video
        final_video = final_video.set_audio(audio_clip)

        # Write the result to a video file
        final_video.write_videofile(output_video, fps=24, codec='libx264')
        print(f"Video has been saved as '{output_video}'.")

    # Generate the video with subtitles
    generate_video_with_subtitles("final_audio_speeded_up.mp3", "subtitles.srt")

else:
    print("Sorry, the selected language is not supported.")
