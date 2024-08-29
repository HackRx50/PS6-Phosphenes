from gtts import gTTS
from googletrans import Translator
from pydub import AudioSegment

# Dictionary of supported languages with their codes
languages = {
    'hindi': 'hi',       
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
            "HackerX 5.0, which is going to be conducted in Pune.")

    # Translate the text to the selected language using googletrans
    translator = Translator()
    translated_text = translator.translate(text, dest=lang_code).text

    # Create gTTS object with the translated text
    tts = gTTS(text=translated_text, lang=lang_code)

    # Save the audio file
    tts.save("final_audio_test.mp3")

    # Load the audio file with pydub
    audio = AudioSegment.from_file("final_audio_test.mp3")

    # Speed up the audio by a factor of 1.5 (you can adjust this factor)
    speeded_up_audio = audio.speedup(playback_speed=1.25)

    # Export the modified audio
    speeded_up_audio.export("output_audio_speeded_up.mp3", format="mp3")
    print("Audio has been saved as 'output_audio_speeded_up.mp3' with increased speed.")

else:
    print("Sorry, the selected language is not supported.")
