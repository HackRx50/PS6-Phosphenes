from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer, AutoFeatureExtractor, set_seed
import torch
import soundfile as sf

repo_id = "parler-tts/parler-tts-mini-v1"

# Load the model on CPU
model = ParlerTTSForConditionalGeneration.from_pretrained(repo_id)
tokenizer = AutoTokenizer.from_pretrained(repo_id, padding_side="left")
feature_extractor = AutoFeatureExtractor.from_pretrained(repo_id)

input_text = ["Hey, how are you doing Happy? All the best to hishita, veedansh, ansh  and you guys are best team for the hackerx and everyone know you are going to win it for the sure , all the best to you", "I'm not sure how to feel about it."]
description = 2 * ["A male speaker with a monotone and high-pitched voice is delivering his speech at a really low speed in a confined environment."]

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
audio_1 = generation.sequences[0, :generation.audios_length[0]]
audio_2 = generation.sequences[1, :generation.audios_length[1]]

# Convert audio tensors to NumPy arrays
audio_1_np = audio_1.cpu().detach().numpy().squeeze()
audio_2_np = audio_2.cpu().detach().numpy().squeeze()

# Save audio to files using soundfile
sf.write("sample_out.wav", audio_1_np, feature_extractor.sampling_rate)
sf.write("sample_out_2.wav", audio_2_np, feature_extractor.sampling_rate)
