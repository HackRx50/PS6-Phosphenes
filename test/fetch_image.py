import requests
import os
from PIL import Image
from io import BytesIO
from moviepy.editor import VideoFileClip

# Your Pexels API key
API_KEY = 'yMvC8TaXPSBaqMBio9XOdwEzFj2iKpGWixU1z3p9GGTEaDjAWYdTTCe1'

# Prompt user for keyword
keyword = input("Enter a keyword to search for images and videos: ")

# Number of images and videos you want to fetch
num_images = 2
num_videos = 1

# Directory where you want to save the files
save_directory = 'media'
image_directory = os.path.join(save_directory, 'images')
video_directory = os.path.join(save_directory, 'videos')

# Create the directories if they don't exist
os.makedirs(image_directory, exist_ok=True)
os.makedirs(video_directory, exist_ok=True)

# URL for the Pexels API endpoints
image_api_url = 'https://api.pexels.com/v1/search'
video_api_url = 'https://api.pexels.com/videos/search'

# Headers with the API key
headers = {
    'Authorization': API_KEY
}

# Parameters for the image request
image_params = {
    'query': keyword,
    'per_page': num_images,
    'page': 1
}

# Parameters for the video request
video_params = {
    'query': keyword,
    'per_page': num_videos,
    'page': 1
}

# Function to download and save images
def download_images():
    response = requests.get(image_api_url, headers=headers, params=image_params)
    if response.status_code == 200:
        data = response.json()
        images = data['photos']
        target_width = 640
        target_height = 480
        for i, image in enumerate(images):
            image_url = image['src']['original']
            image_response = requests.get(image_url)
            if image_response.status_code == 200:
                img = Image.open(BytesIO(image_response.content))
                img = img.resize((target_width, target_height), Image.ANTIALIAS)
                image_path = os.path.join(image_directory, f'image_{i+1}.jpg')
                img.save(image_path)
                print(f"Image {i+1} saved as {image_path}")
            else:
                print(f"Failed to download image {i+1}")
    else:
        print(f"Failed to fetch images. Status code: {response.status_code}")

# Function to download and save videos
def download_videos():
    response = requests.get(video_api_url, headers=headers, params=video_params)
    if response.status_code == 200:
        data = response.json()
        videos = data['videos']
        for i, video in enumerate(videos):
            video_url = video['video_files'][0]['link']  # You can select different video quality if available
            video_response = requests.get(video_url)
            if video_response.status_code == 200:
                video_path = os.path.join(video_directory, f'video_{i+1}.mp4')
                with open(video_path, 'wb') as file:
                    file.write(video_response.content)
                
                # Trim the video to 10 seconds
                trimmed_video_path = os.path.join(video_directory, f'trimmed_video_{i+1}.mp4')
                clip = VideoFileClip(video_path)
                trimmed_clip = clip.subclip(0, min(10, clip.duration))  # Trim to 10 seconds or the video duration, whichever is shorter
                trimmed_clip.write_videofile(trimmed_video_path)
                
                # Remove the original video file
                os.remove(video_path)
                
                print(f"Video {i+1} saved and trimmed to {trimmed_video_path}")
            else:
                print(f"Failed to download video {i+1}")
    else:
        print(f"Failed to fetch videos. Status code: {response.status_code}")

# Download images and videos
download_images()
download_videos()
