import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

model_id = "stabilityai/stable-diffusion-2-1"

# Load the model with default torch_dtype (float32) for CPU
pipe = StableDiffusionPipeline.from_pretrained(model_id)

# Use the DPMSolverMultistepScheduler (DPM-Solver++) scheduler
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

# Move the pipeline to CPU
pipe = pipe.to("cpu")

prompt = "a photo of an astronaut riding a horse on mars"
image = pipe(prompt).images[0]

image.save("astronaut_rides_horse.png")
