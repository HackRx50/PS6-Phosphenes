import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from "lucide-react";
import { Gradient } from '../design/Roadmap';

// Pexels API details
const API_KEY = 'dPWNqxkUbq8yFMCEc6FiMvG5qbr9URP7n1EefENNsmnKccFx9t9kUYuD'; // Replace this with your actual Pexels API key
const VIDEO_API_URL = 'https://api.pexels.com/videos/search';
const IMAGE_API_URL = 'https://api.pexels.com/v1/search'; // Pexels API endpoint for images

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
    const [query, setQuery] = useState('happy'); // Default search keyword
    const [mediaType, setMediaType] = useState('videos'); // Default to videos
    const [category, setCategory] = useState('');
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);

    // Fetch media from Pexels API
    const fetchMedia = async (searchQuery, type, category) => {
        try {
            const fullQuery = category ? `${searchQuery} ${category}` : searchQuery;
            let response;
            if (type === 'videos') {
                response = await axios.get(VIDEO_API_URL, {
                    headers: { Authorization: API_KEY },
                    params: { query: fullQuery, per_page: 10 }
                });
                setVideos(response.data.videos);
            } else {
                response = await axios.get(IMAGE_API_URL, {
                    headers: { Authorization: API_KEY },
                    params: { query: fullQuery, per_page: 10 }
                });
                setImages(response.data.photos);
            }
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    };

    // Fetch media on initial load and when query, mediaType, or category changes
    useEffect(() => {
        fetchMedia(query, mediaType, category);
    }, [query, mediaType, category]);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            fetchMedia(query, mediaType, category);
        }
    };

    return (
        <div className="w-full h-screen p-4 bg-n-9/40 backdrop-blur border border-n-1/10 text-white overflow-auto ">
            <Gradient className="hidden lg:flex"/>
            {/* Search Bar */}
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

            {/* Media Type and Category Filters */}
            <div className="flex mb-4 gap-10 justify-between items-center">
                <div>
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="mediaType"
                            value="videos"
                            checked={mediaType === 'videos'}
                            onChange={() => setMediaType('videos')}
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
                            onChange={() => setMediaType('images')}
                            className='mr-2'
                        />
                        Images
                    </label>
                </div>
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
            </div>

            {/* Display Results */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 ">
                {mediaType === 'videos' &&
                    videos.map((video) => (
                        <div key={video.id} className="bg-n-8 rounded-lg shadow-md">
                            <video
                                className="w-full h-auto rounded-lg mb-2"
                                src={video.video_files[0].link}
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
                                src={image.src.medium}
                                alt={image.alt}
                            />
                        </div>
                    ))
                }
            </div>

            {/* No Results */}
            {(mediaType === 'videos' && videos.length === 0 || mediaType === 'images' && images.length === 0) && query && (
                <div className="text-center text-gray-500 mt-4">
                    No {mediaType} found for "{query}"
                </div>
            )}
        </div>
      

    );
};

export default VisualSelection;
