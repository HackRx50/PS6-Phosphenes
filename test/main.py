from dotenv import find_dotenv, load_dotenv
from transformers import pipeline
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import OpenAI  # Updated import based on warning
import os

load_dotenv(find_dotenv())

# Image to Text
def img2text(image_path):
    # Check if the image path is valid
    if not os.path.isfile(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")

    # Initialize the image-to-text pipeline
    image_to_text = pipeline("image-to-text", model="Salesforce/blip-image-captioning-large")
    
    # Generate text from the image
    text = image_to_text(image_path)[0]["generated_text"]
    print(f"Extracted Text: {text}")
    return text

# LLM to generate a short story
def generate_story(scenario):
    template = """
    You are a story teller;
    You can generate a short story based on a simple narrative. The story should be no more than 50 words.
    CONTEXT: {scenario}
    STORY:
    """

    prompt = PromptTemplate(template=template, input_variables=["scenario"])
    story_llm = LLMChain(llm=OpenAI(model_name="gpt-3.5-turbo", temperature=1), prompt=prompt, verbose=True)
    story = story_llm.predict(scenario=scenario)
    print(f"Generated Story: {story}")
    return story

if __name__ == "__main__":
    # Path to the image
    image_path = "photo2.png"
    
    # Extract text from the image
    extracted_text = img2text(image_path)
    
    # Generate a story based on the extracted text
    generated_story = generate_story(extracted_text)
