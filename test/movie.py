from moviepy.editor import *
from moviepy.video.fx.all import fadein, fadeout, resize, crop

# Load images
image_files = [r"C:\Users\Happy yadav\Desktop\Technology\hack\test\img1.jpg", r"C:\Users\Happy yadav\Desktop\Technology\hack\test\img2.jpg", r"C:\Users\Happy yadav\Desktop\Technology\hack\test\img3.jpg"]  # Add your image file paths here

# Create video clips from images with zoom-in/zoom-out effect
def create_clip(image_path, duration=3):
    clip = ImageClip(image_path).set_duration(duration)

    # Zoom-in effect
    zoom_in = clip.fx(resize, 1.1)  # Zoom-in by 10%
    zoom_out = clip.fx(resize, 0.9)  # Zoom-out by 10%

    # Combine effects: Zoom in, then out
    zoom_in = zoom_in.set_start(0).set_duration(duration/2)
    zoom_out = zoom_out.set_start(duration/2).set_duration(duration/2)
    combined = concatenate_videoclips([zoom_in, zoom_out])

    # Fade in and fade out effect
    combined = fadein(fadeout(combined, 1), 1)

    return combined

clips = [create_clip(img, duration=5) for img in image_files]  # 4 seconds per clip

# Create a text clip for the dialogue box
def add_text_overlay(clip, text, duration=4):
    txt_clip = TextClip(text, fontsize=12, color='white', bg_color='black',font='Arial-Bold')
    txt_clip = txt_clip.set_position(('center', 'bottom')).set_duration(duration)
    return CompositeVideoClip([clip, txt_clip])

# Add text overlay to each clip
texts = ["First Slide", "Second Slide", "Third Slide"]  # Add your texts here
clips_with_text = [add_text_overlay(clip, text, duration=4) for clip, text in zip(clips, texts)]

# Add crossfade transition between each clip
final_clip = concatenate_videoclips(clips, method="compose", padding=-1, bg_color=(0, 0, 0))

# Adjust the total duration of the video (optional)
final_clip = final_clip.set_duration(sum([clip.duration for clip in clips_with_text]))

# Write the final video
final_clip.write_videofile("output_video_3.mp4", fps=24)
