import pdfplumber
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import os

pytesseract.pytesseract.tesseract_cmd = r'D:\tesseract\tesseract.exe'

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
pdf_path = pdf_path = "D:\chatbot\pdf2.pdf" // change the path according to you
output_folder = "images"

text = extract_text_from_pdf(pdf_path)
imgText = extract_text_from_pdf_images(pdf_path, output_folder)

if text == "":
    print(imgText)
else:
    print(text)
