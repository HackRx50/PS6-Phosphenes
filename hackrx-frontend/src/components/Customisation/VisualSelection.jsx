import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from "lucide-react";
import { Gradient } from '../design/Roadmap';

// API details
const PIXABAY_API_KEY = '41610740-2e3b4e3089898192b13673058'; // Replace with your actual Pixabay API key
const VIDEO_API_URL = 'https://pixabay.com/api/videos/'; // Pixabay API endpoint for videos
const IMAGE_API_URL = 'https://api.pexels.com/v1/search'; // Pexels API endpoint for images
const STABILITY_API_URL = 'https://api.stability.ai/v2beta/stable-image/generate/core'; // Stability AI endpoint

const categories = [
    'Nature',
    'Agriculture',
    'Technology',
    'Business',
    'Education',
    'Health',
    'Travel',
    'Food',
    'People',
    'Sports'
];

const VisualSelection = () => {
    const [query, setQuery] = useState('finance'); // Default search keyword
    const [mediaType, setMediaType] = useState('videos'); // Default to videos
    const [category, setCategory] = useState('');
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePrompt, setImagePrompt] = useState(''); // New state for image generation prompt

    // Fetch media from APIs
    const fetchMedia = async (searchQuery, type, category) => {
        try {
            const fullQuery = category ? `${searchQuery} ${category}` : searchQuery;
            let response;

            // Fetch videos from Pixabay API
            if (type === 'videos') {
                response = await axios.get(VIDEO_API_URL, {
                    params: {
                        key: PIXABAY_API_KEY,
                        q: fullQuery,
                        per_page: 10,
                        video_type: 'animation'
                    }
                });
                setVideos(response.data.hits);
            } else if (type === 'images') {
                // Fetch generated images from Stability AI API
                const payload = new FormData();
                payload.append('prompt', fullQuery);
                payload.append('output_format', 'webp');

                response = await axios.post(STABILITY_API_URL, payload, {
                    headers: {
                        Authorization: `Bearer sk-Xips2HbQGXa2GTbRE3Y08s933bqp7eNhSUGw4eyFW1Vu4Cep`, // Replace with your actual Stability AI API key
                        Accept: "image/*",
                        ...payload.getHeaders() // Include form headers
                    },
                    responseType: 'arraybuffer', // Expect image data as arraybuffer
                });

                if (response.status === 200) {
                    // Convert the array buffer response to a blob for displaying in frontend
                    const blob = new Blob([response.data], { type: 'image/webp' });
                    const imageUrl = URL.createObjectURL(blob); // Create URL for the blob

                    // Save the image URL to display it in frontend
                    setImages([{ id: Date.now(), src: imageUrl }]);

                    // Optional: Save the image to file if running on the server or Node.js environment
                    // fs.writeFileSync("./lighthouse.webp", Buffer.from(response.data));
                } else {
                    throw new Error(`Error ${response.status}: ${response.data}`);
                }
            }
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    };

    // Fetch media on initial load and when query, mediaType, or category changes
    useEffect(() => {
        if (mediaType === 'videos') {
            fetchMedia(query, mediaType, category);
        } else if (mediaType === 'images' && imagePrompt) {
            fetchMedia(imagePrompt, 'images', category); // Fetch images based on user prompt
        }
    }, [query, mediaType, category, imagePrompt]);

    // Handle search form submission for videos
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            fetchMedia(query, mediaType, category);
        }
    };

    // Handle image prompt submission
    const handleImagePromptSubmit = (e) => {
        e.preventDefault();
        if (imagePrompt.trim() !== '') {
            fetchMedia(imagePrompt, 'images', category); // Fetch images based on user prompt
            setImagePrompt(''); // Clear the prompt after submission
        }
    };

    return (
        <div className="w-full h-screen p-4 bg-n-9/40 backdrop-blur border border-n-1/10 text-white overflow-auto">
            <Gradient className="hidden lg:flex" />
            
            {/* Media Type Filters */}
            <div className="flex mb-4 gap-10 justify-between items-center">
                <div>
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="mediaType"
                            value="videos"
                            checked={mediaType === 'videos'}
                            onChange={() => {
                                setMediaType('videos');
                                setCategory(''); // Reset category when switching to videos
                                setImages([]); // Clear images when switching to videos
                                setImagePrompt(''); // Clear image prompt when switching to videos
                            }}
                            className='mr-2'
                        />
                        Videos
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mediaType"
                            value="images"
                            checked={mediaType === 'images'}
                            onChange={() => {
                                setMediaType('images');
                                setCategory(''); // Reset category when switching to images
                                setVideos([]); // Clear videos when switching to images
                            }}
                            className='mr-2'
                        />
                        Images
                    </label>
                </div>
                {/* Show category only if media type is videos */}
                {mediaType === 'videos' && (
                    <div>
                        <label htmlFor="category" className="mr-2">Category:</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Search Bar for Videos Only */}
            {mediaType === 'videos' && (
                <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Search for visuals..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="p-2 bg-n-8 text-white hover:bg-n-9 rounded">
                        <Search size={20} />
                    </button>
                </form>
            )}

            {/* Display Results */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                {mediaType === 'videos' &&
                    videos.map((video) => (
                        <div key={video.id} className="bg-n-8 rounded-lg shadow-md">
                            <video
                                className="w-full h-auto rounded-lg mb-2"
                                src={video.videos.medium.url} // Adjust video source as necessary
                                controls
                            />
                        </div>
                    ))
                }

                {mediaType === 'images' &&
                    images.map((image) => (
                        <div key={image.id} className="bg-n-8 rounded-lg shadow-md">
                            <img
                                className="w-full h-auto rounded-lg mb-2"
                                src={image.src} // Use the generated image URL
                                alt={image.alt || 'Generated visual'} // Provide a fallback alt text
                            />
                        </div>
                    ))
                }
            </div>

            {/* Image Prompt Section */}
            {mediaType === 'images' && (
                <form onSubmit={handleImagePromptSubmit} className="mt-6 flex items-center">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg mr-2"
                        placeholder="Generate an image based on your prompt..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                    />
                    <button type="submit" className="p-2 bg-n-8 text-white hover:bg-n-9 rounded">
                        Generate
                    </button>
                </form>
            )}
        </div>
    );
};

export default VisualSelection;
