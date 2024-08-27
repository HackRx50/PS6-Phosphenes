import requests
import os

# Your Pexels API key
API_KEY = 'yMvC8TaXPSBaqMBio9XOdwEzFj2iKpGWixU1z3p9GGTEaDjAWYdTTCe1'

# The keyword you want to search for
keyword = 'technology'

# The number of images you want to fetch
num_images = 5

# Directory where you want to save the images
save_directory = 'pictures'

# Create the directory if it doesn't exist
if not os.path.exists(save_directory):
    os.makedirs(save_directory)

# URL for the Pexels API endpoint
url = 'https://api.pexels.com/v1/search'

# Headers with the API key
headers = {
    'Authorization': API_KEY
}

# Parameters for the request
params = {
    'query': keyword,
    'per_page': num_images,
    'page': 1  # You can use pagination to get more results if needed
}

# Make the request
response = requests.get(url, headers=headers, params=params)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    images = data['photos']
    
    # Download and save each image
    for i, image in enumerate(images):
        image_url = image['src']['original']
        image_response = requests.get(image_url)
        
        if image_response.status_code == 200:
            # Save the image to a file
            image_path = os.path.join(save_directory, f'image_{i+1}.jpg')
            with open(image_path, 'wb') as file:
                file.write(image_response.content)
            print(f"Image {i+1} saved as {image_path}")
        else:
            print(f"Failed to download image {i+1}")
else:
    print(f"Failed to fetch images. Status code: {response.status_code}")
