from transformers import pipeline
from pdf2image import convert_from_path

# Load the model and processor using the pipeline
nlp = pipeline(
    "document-question-answering",
    model="impira/layoutlm-document-qa",
)

# Convert PDF to image
pdf_path = r"C:\Users\Happy yadav\Desktop\Technology\hack\test\doc\pdf1.pdf"
pages = convert_from_path(pdf_path)

# Use the first page of the PDF (you can loop through all pages if needed)
image = pages[0]

# Save the image temporarily
image_path = "temp_image.png"
image.save(image_path)

# Define your query
query = "What is the waiting period for pre-existing diseases under the Health Guard policy?"

# Use the pipeline to answer the query
result = nlp(image_path, query)

# Output the answer
if result:
    print(f"Answer: {result[0]['answer']}")
else:
    print("No answer found.")

# # If you want to make additional queries on images from URLs
# url_result = nlp(
#     "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
#     "What is the invoice number?"
# )
# print(f"Invoice Number: {url_result[0]['answer']}")

# url_result = nlp(
#     "https://miro.medium.com/max/787/1*iECQRIiOGTmEFLdWkVIH2g.jpeg",
#     "What is the purchase amount?"
# )
# print(f"Purchase Amount: {url_result[0]['answer']}")

# url_result = nlp(
#     "https://www.accountingcoach.com/wp-content/uploads/2013/10/income-statement-example@2x.png",
#     "What are the 2020 net sales?"
# )
# print(f"2020 Net Sales: {url_result[0]['answer']}")
