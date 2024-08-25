from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer, AutoFeatureExtractor, set_seed
import torch
import soundfile as sf

repo_id = "parler-tts/parler-tts-mini-v1"

# Load the model on CPU
model = ParlerTTSForConditionalGeneration.from_pretrained(repo_id)
tokenizer = AutoTokenizer.from_pretrained(repo_id, padding_side="left")
feature_extractor = AutoFeatureExtractor.from_pretrained(repo_id)

# Single input text
input_text = ["Hello, my name is Happy Yadav, and I am a prefinal year BCA student at Chitkara University. " 
              "I have been invited to the Microsoft office for the GitHub Field Day. "
              "I am a tech enthusiast. Currently, I am working on an AI/ML and web development project for the hackathon in Pune."]

# Voice description for a strong man speaking clearly and accurately
description = ["A strong male speaker with a deep and resonant voice, speaking clearly and accurately with confidence."]

# Tokenize inputs on CPU
inputs = tokenizer(description, return_tensors="pt", padding=True)
prompt = tokenizer(input_text, return_tensors="pt", padding=True)

# Set seed for reproducibility
set_seed(0)

# Generate speech
generation = model.generate(
    input_ids=inputs.input_ids,
    attention_mask=inputs.attention_mask,
    prompt_input_ids=prompt.input_ids,
    prompt_attention_mask=prompt.attention_mask,
    do_sample=True,
    return_dict_in_generate=True,
)

# Extract audio data
audio = generation.sequences[0, :generation.audios_length[0]]

# Convert audio tensor to NumPy array
audio_np = audio.cpu().detach().numpy().squeeze()

# Save audio to file using soundfile
sf.write("sample_out.wav", audio_np, feature_extractor.sampling_rate)
