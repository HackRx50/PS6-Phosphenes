from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from pydantic import BaseModel
import os
from testmain import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import json
from pathlib import Path

app = FastAPI()

class QuestionRequest(BaseModel):
    question: str

SARVAM_TTS_API_URL = "https://api.sarvam.ai/text-to-speech"
# SARVAM_API_KEY = "32338cf8-5952-403c-851d-c7409c520316"  # Replace with your actual API key

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def home():
    return {"message": "Home route"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    # Check if the file is a PDF
    if file.content_type != "application/pdf":
        return {"error": "File is not a PDF"}

    temp_file_path = f"temp_{file.filename}"

    # Write the uploaded file to the temporary file
    with open(temp_file_path, "wb") as f:
        f.write(await file.read())

    try:
        # Extract text from the saved PDF file
        text = extract_text_from_file(temp_file_path)
        
        if not text:
            image_output_folder = "pdf_images"
            os.makedirs(image_output_folder, exist_ok=True)
            text = extract_text_from_pdf_images(temp_file_path, image_output_folder)


        # Summarize the extracted text
        clean_up_videos(videos_folder)
        background_music_path = r"C:\Users\Happy yadav\Desktop\Technology\hack\hackrx-backend\background.mp3"
        summary = summarize_text(text)

        if not summary:
            return {"error": "Could not generate a summary"}

            
        quiz_string = generate_quiz(text)
        save_quiz_to_json(quiz_string, "questions.json")

        # output = generate_keywords_from_summary(summary, "subtitles.srt")
        # selected_language = 'english'
        # if selected_language in language_map:
        #     language_code = language_map[selected_language]
        # else:
        #     language_code = 'en'

        # speeches = output['speech']
        # translated_speech = translate_speech(speeches, language_code)

        # # Generate audio from the speech text
        # audio_output_path = "final_audio.mp3"
        # generate_audio_from_text(translated_speech, audio_output_path, language_code)

        # # Speed up the generated audio
        # audio_output_speedup_path = "final_audio_speedup.mp3"
        # speed_up_audio(audio_output_path, audio_output_speedup_path, background_music_path, speed=1.3)

        # # Generate the subtitles based on the speech
        # audio_length = AudioFileClip(audio_output_speedup_path).duration
        # srt_file_path = "subtitles.srt"
        # generate_subtitles_from_speech(speeches, audio_length, srt_file_path)
        selected_language = 'hindi'
        if selected_language in language_map:
            language_code = language_map[selected_language]
        else:
            language_code = 'hi'

        speeches = translate_speech(summary, language_code)

        # Generate audio from the speech text
        audio_output_path = "final_audio.mp3"
        generate_audio_from_text(speeches, audio_output_path, language_code)

        # Speed up the generated audio
        audio_output_speedup_path = "final_audio_speedup.mp3"
        speed_up_audio(audio_output_path, audio_output_speedup_path, background_music_path, speed=1.3)

        # Generate the subtitles based on the speech
        audio_length = AudioFileClip(audio_output_speedup_path).duration
        srt_file_path = "subtitles.srt"
        generate_subtitles_from_speech(speeches, audio_length, srt_file_path)

        # Generate keywords from summary after SRT is created
        output = generate_keywords_from_summary(summary, srt_file_path)

        promp_string = generate_prompts_from_srt_chunks("subtitles.srt")
        print("promp string: ", promp_string)

        save_prompts_to_json(promp_string, "prompts.json")
        
        # Read prompts from prompts.json
        with open("prompts.json", "r") as json_file:
            prompts_data = json.load(json_file)
        
        # Generate images for each prompt
        if isinstance(prompts_data, list):
            for i, prompt in enumerate(prompts_data):
                if isinstance(prompt, list) and isinstance(prompt[0], dict) and 'description' in prompt[0]:  # Check if it's a list of dicts
                    prompt_text = prompt[0]['description']  # Extract the 'description' key
                    print(f"Generating image for prompt: {prompt_text}")
                    generate_image_from_prompt(prompt_text, "./pictures", i)
                else:
                    print(f"Invalid prompt format at index {i}: {prompt}")
        else:
            print("Prompts data is not a list")


        cleaned_summary = clean_text(summary)
        
        # Store extracted text in a txt file
        with open("extracted_text.txt", "w", encoding="utf-8") as text_file:
            text_file.write(cleaned_summary)



        # Generate and save images and videos for the keywords
        generate_and_save_images_and_videos_for_keywords(output['keywords'])
        os.remove("final_audio.mp3")
        audio_length = AudioFileClip(audio_output_speedup_path).duration
        generate_subtitles_from_speech(speeches, audio_length, srt_file_path)

        create_slideshow_with_audio(pictures_folder, videos_folder, output_video_path, audio_output_speedup_path, r"C:\Users\Happy yadav\Desktop\Technology\hack\hackrx-backend\ai_generated_images\Lydia.mp4", srt_file_path)

        # Return the summary as part of the response
        return {
            "filename": file.filename,
            "summary": cleaned_summary,
            "speech": speeches,
            "response": 200
        }
    
    finally:
        # Clean up by deleting the temporary file after processing
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

# @app.post("/ask-question")
# async def ask_question(question_request: QuestionRequest):
#     txt_file_path = "extracted_text.txt"  # Path to the extracted text file
    
#     # Call the function to ask the question based on the text in the txt file
#     answer = ask_aura_question(question_request.question, txt_file_path)
    
#     # Return the AI's answer or error message
#     if answer.startswith("Error"):
#         raise HTTPException(status_code=500, detail=answer)
    
#     return {"answer": answer}

# @app.post("/ask-question")
# async def ask_question(question_request: QuestionRequest):
#     # Generate text-based response (assuming `ask_aura_question` is your existing function)
#     txt_file_path = "extracted_text.txt"  # Path to the extracted text file
#     answer = ask_aura_question(question_request.question, txt_file_path)

#     if answer.startswith("Error"):
#         raise HTTPException(status_code=500, detail=answer)

#     # Step 1: Prepare payload for Sarvam TTS
#     payload = {
#         "inputs": [answer],  # The bot's response text goes here
#         "target_language_code": "hi-IN",  # Set the desired language code (e.g., hi-IN for Hindi)
#         "speaker": "meera",  # You can customize this based on available voices
#         "pitch": 0,
#         "pace": 1.65,
#         "loudness": 1.5,
#         "speech_sample_rate": 8000,
#         "enable_preprocessing": True,
#         "model": "bulbul:v1"
#     }

#     headers = {
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {SARVAM_API_KEY}"  # Authorization header with your API key
#     }

#     # Step 2: Make the request to Sarvam TTS API
#     try:
#         tts_response = requests.post(SARVAM_TTS_API_URL, json=payload, headers=headers)
        
#         if tts_response.status_code == 200:
#             tts_data = tts_response.json()
#             audio_url = tts_data.get('audio_url')  # Assuming Sarvam returns the URL in 'audio_url'

#             return {
#                 "answer": answer,  # The text response
#                 "audioUrl": audio_url  # The generated audio URL
#             }
#         else:
#             raise HTTPException(status_code=500, detail="Sarvam TTS API Error")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask-question")
async def ask_question(question_request: QuestionRequest):
    try:
        txt_file_path = "extracted_text.txt"  # Path to the extracted text file
        answer = ask_aura_question(question_request.question, txt_file_path)

        if answer.startswith("Error"):
            raise HTTPException(status_code=500, detail=answer)

        # Prepare payload for Sarvam TTS
        payload = {
            "inputs": [answer],  # The bot's response text goes here
            "target_language_code": "hi-IN",  # Set the desired language code
            "speaker": "meera",
            "pitch": 0,
            "pace": 1.65,
            "loudness": 1.5,
            "speech_sample_rate": 8000,
            "enable_preprocessing": True,
            "model": "bulbul:v1"
        }

        headers = {
            "Content-Type": "application/json",
            'API-Subscription-Key': '32338cf8-5952-403c-851d-c7409c520316'
        }

        # Make the request to Sarvam TTS API
        tts_response = requests.post(SARVAM_TTS_API_URL, json=payload, headers=headers)
        
        # Check the response status
        if tts_response.status_code == 200:
            tts_data = tts_response.json()
            audio_url = tts_data.get('audio_url')

            return {
                "answer": answer,
                "audioUrl": audio_url
            }
        else:
            raise HTTPException(status_code=500, detail="Sarvam TTS API Error: " + tts_response.text)

    except Exception as e:
        print(f"Error in ask_question: {str(e)}")  # Print error to console for debugging
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-images")
async def list_images():
    try:
        images = os.listdir("pictures")
        return {"images": images}
    except Exception as e:
        return {"error": str(e)}

@app.get("/get-videos")
async def list_videos():
    try:
        videos = os.listdir("videos")
        return {"videos": videos}
    except Exception as e:
        return {"error": str(e)}

@app.get("/get-images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join("pictures", filename)
    return FileResponse(file_path)

# Serve individual video files
@app.get("/get-videos/{filename}")
async def get_video(filename: str):
    file_path = os.path.join("videos", filename)
    return FileResponse(file_path)

@app.get("/video/{filename}")
async def get_video(filename):
    file_path = "final_slideshow.mp4"
    return FileResponse(file_path)

@app.get("/prompt-image")
async def prompt_image(prompt: str = Query(..., description="Prompt to generate image")):
    # Define output directory for images
    output_dir = "./promptImages"
    
    # Call the function to generate image
    image_path = generate_image_from_prompt(prompt, output_dir, 1)
    
    # Ensure the image exists
    image_file = Path(image_path)
    if image_file.exists():
        # Return the image as a file response
        return FileResponse(image_file, media_type="image/png", filename=image_file.name)
    else:
        return {"error": "Image generation failed or file not found"}