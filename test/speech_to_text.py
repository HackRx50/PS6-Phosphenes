import whisper
import pyaudio
import wave
import os

def record_audio(filename, duration=10):
    # Initialize PyAudio
    p = pyaudio.PyAudio()

    # Define the audio stream settings
    stream = p.open(format=pyaudio.paInt16,
                    channels=1,
                    rate=44100,
                    input=True,
                    frames_per_buffer=1024)

    print("Recording...")

    frames = []

    # Record audio in chunks
    for _ in range(0, int(44100 / 1024 * duration)):
        data = stream.read(1024)
        frames.append(data)

    print("Finished recording.")

    # Stop and close the stream
    stream.stop_stream()
    stream.close()
    p.terminate()

    # Save the recorded data as a WAV file
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
        wf.setframerate(44100)
        wf.writeframes(b''.join(frames))

def transcribe_audio(filename):
    # Load the Whisper model
    model = whisper.load_model("base")

    # Transcribe the audio file
    result = model.transcribe(filename)

    # Return the transcription
    return result['text']

if __name__ == "__main__":
    audio_filename = "output.wav"
    
    # Record audio from the microphone
    record_audio(audio_filename, duration=5)
    
    # Transcribe the recorded audio
    transcription = transcribe_audio(audio_filename)
    
    print("Transcription:")
    print(transcription)
    
    # Optionally, delete the audio file after transcription
    if os.path.exists(audio_filename):
        os.remove(audio_filename)
