from fastapi import FastAPI, File, UploadFile
import os
from main import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI()

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
async def upload_file(file: UploadFile = File(...)):
    temp_file_path = f"temp_{file.filename}"

    # Write the uploaded file to a temporary file
    with open(temp_file_path, "wb") as f:
        f.write(await file.read())

    try:
        # Step 1: Extract text from the uploaded file (PDF, DOCX, PPTX, etc.)
        text = extract_text_from_file(temp_file_path)

        # Step 2: Clean up previous video outputs before proceeding
        clean_up_videos(videos_folder)

        # Define the background music path (hardcoded or dynamically provided)
        background_music_path = r"D:\hackerx\Phosphenes-HackRx-5.0\hackrx-backend\background.mp3"

        # Step 3: Summarize the extracted text
        summary = summarize_text(text)

        if not summary:
            return {"error": "Could not generate a summary"}

        # Step 4: Generate a quiz from the text and save it to a JSON file
        quiz_string = generate_quiz(text)
        save_quiz_to_json(quiz_string, "questions.json")

        # Step 5: Clean the summary text for further processing
        cleaned_summary = clean_text(summary)

        # Step 6: Define the SRT file path
        srt_file_path = "subtitles.srt"  # SRT file path

        # Step 7: Generate keywords from summary and SRT after subtitles are created
        output = generate_keywords_from_summary(cleaned_summary, srt_file_path)

        # Step 8: Generate audio from the speech
        selected_language = 'english'
        language_code = language_map.get(selected_language, 'en')

        # Assuming 'speech' is part of output after generating keywords
        speeches = output.get('speech', '')
        translated_speech = translate_speech(speeches, language_code)

        # Step 9: Generate audio from the translated speech text
        generate_audio_from_text(translated_speech, audio_output_path, language_code)

        # Step 10: Generate subtitles based on the translated speech
        audio_length = AudioFileClip(audio_output_speedup_path).duration
        generate_subtitles_from_speech(translated_speech, audio_length, srt_file_path)

        # Step 11: Speed up the generated audio and merge it with background music
        speed_up_audio(audio_output_path, audio_output_speedup_path, background_music_path, speed=1.3)

        # Step 12: **Now that the SRT file exists, generate prompts from SRT**
        promp_string = generate_prompts_from_srt_chunks(srt_file_path)
        save_prompts_to_json(promp_string, "prompts.json")

        # Step 13: Generate images and videos based on the prompts
        generate_and_save_images_and_videos_for_keywords(output['keywords'])

        # Step 14: Create a slideshow video with the generated images and synced audio
        create_slideshow_with_audio(
            pictures_folder,
            videos_folder,
            output_video_path,
            audio_output_speedup_path,
            r"D:\hackerx\Phosphenes-HackRx-5.0\hackrx-backend\ai_generated_images\Lydia.mp4",
            srt_file_path
        )

        # Return the summary as part of the response
        return {
            "filename": file.filename,
            "summary": cleaned_summary,
            "speech": translated_speech,  # Use translated speech instead of output['speech']
            "response": 200
        }

    finally:
        # Step 15: Clean up the temporary file after processing is complete
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@app.get("/video/{filename}")
async def get_video(filename):
    file_path = "final_slideshow.mp4"
    return FileResponse(file_path)
