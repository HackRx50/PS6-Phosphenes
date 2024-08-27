from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables from .env file
load_dotenv()

# Now the environment variable should be available
api_key = os.getenv("API_KEY")

if api_key is None:
    raise ValueError("API_KEY environment variable not set")

genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content("can you tell me how to generate images from prompt using Gemini?")
print(response.text)
