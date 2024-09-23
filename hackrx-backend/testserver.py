from fastapi import FastAPI, File, UploadFile
import os
from testmain import *
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
        text = extract_text_from_pdf(temp_file_path)
        
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
        promp_string = generate_prompts_from_summary(summary)
        
        save_prompts_to_json(promp_string, "prompts.json")
        cleaned_summary = clean_text(summary)
        output = generate_keywords_from_summary(cleaned_summary)
        selected_language = 'english'
        if selected_language in language_map:
            language_code = language_map[selected_language]
        else:
            language_code = 'en'


        speeches = output['speech']
        translated_speech = translate_speech(speeches, language_code)

        # Generate audio from the speech text
        generate_audio_from_text(translated_speech, audio_output_path, language_code)

        # Speed up the generated audio
        speed_up_audio(audio_output_path, audio_output_speedup_path,background_music_path, speed=1.3)

        for i, prompt in enumerate(promp_string):
            generate_image_from_prompt(prompt, "./pictures", i)

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

@app.get("/video/{filename}")
async def get_video(filename):
    file_path = "final_slideshow.mp4"
    return FileResponse(file_path)