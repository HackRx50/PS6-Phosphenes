from gtts import gTTS

# Hindi text from translation
text = ("hey, we are team algorythm and we are working on a project which is based on text to instant video creation through doucment uploading and it also includes text to speech and image generation from text and speech. we are using various technologies like pytesseract, pdfplumber, pdf2image, gTTS, OpenCV, and many more. we are also using AI models for generating content and keywords. Our team includes dedicated developers who are working hard to make this project successful. Meet the team memebers: Happy Yadav and Vedansh Sharma who are python & backend developer, hishita gupta & ansh chahal who are UI/UX Designer and Frontend developer.We are going to win the hackerx 5.0 which is gonna be conducted in Pune.")

# Create gTTS object with Hindi text
tts = gTTS(text=text)

# Save the Hindi audio file
tts.save("happy_generated.mp3")
