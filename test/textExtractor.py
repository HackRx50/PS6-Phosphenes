import pdfplumber
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import os
from transformers import pipeline

pytesseract.pytesseract.tesseract_cmd = r'D:\tesseract\tesseract.exe'


def summarize_text(text):
    # Initialize the summarization pipeline
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # Split text into chunks if it's too long
    max_chunk = 1024
    text_chunks = [text[i:i+max_chunk] for i in range(0, len(text), max_chunk)]
    
    # Summarize each chunk
    summary = ""
    for chunk in text_chunks:
        summary += summarizer(chunk, max_length=130, min_length=30, do_sample=False)[0]['summary_text'] + " "
    
    return summary.strip()


def extract_images_from_pdf(pdf_path, output_folder):
    """
    Extract images from a PDF and save them to a specified folder.
    """
    doc = fitz.open(pdf_path)
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    image_list = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        for img_index, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_list.append(image_bytes)
            # Save the image to a file
            image_path = os.path.join(output_folder, f"page_{page_num}_img_{img_index}.png")
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)
    
    return image_list

def ocr_images_in_folder(folder_path):
    """
    Perform OCR on images in a specified folder and return the extracted text.
    """
    text = ""
    for filename in os.listdir(folder_path):
        if filename.endswith(".png"):
            image_path = os.path.join(folder_path, filename)
            image = Image.open(image_path)
            text += pytesseract.image_to_string(image) + "\n"
    return text

def extract_text_from_pdf_images(pdf_path, output_folder):
    """
    Extract text from images within a PDF by first extracting the images and then performing OCR.
    """
    print("Extracting images from PDF...")
    extract_images_from_pdf(pdf_path, output_folder)
    print("Performing OCR on extracted images...")
    text = ocr_images_in_folder(output_folder)
    return text

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Example usage
pdf_path = "D:\chatbot\pdf1.pdf"
output_folder = "images"

text = extract_text_from_pdf(pdf_path)
imgText = extract_text_from_pdf_images(pdf_path, output_folder)
summary = summarize_text(text)
imgSummary = summarize_text(imgText)
if text == "":
    print(imgText)
    print("-----------------------------------------------------------------------------")
    print()
    print(imgSummary)
else:
    print(text)
    print("-----------------------------------------------------------------------------")
    print()
    print(summary)
