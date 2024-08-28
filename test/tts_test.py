from gtts import gTTS
from pydub import AudioSegment

# Text to convert to speech
text = "Hello, welcome to the video. This is a sample subtitle."

# Generate the audio with gTTS
tts = gTTS(text)
tts.save("audio.mp3")

# Load the audio file using pydub
audio = AudioSegment.from_file("audio.mp3")

# Increase the speed (playback speed)
speed_factor = 1.25  # Increase speed by 50%
faster_audio = audio.speedup(playback_speed=speed_factor)

# Save the faster audio
faster_audio.export("audio_faster.mp3", format="mp3")
