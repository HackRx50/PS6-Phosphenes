import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

// Jamendo API Base URL
const JAMENDO_API_URL = 'https://api.jamendo.com/v3.0/tracks/';
const JAMENDO_CLIENT_ID = '3fadf1fe'; // Replace with your actual Jamendo API Client ID

const AudioSelection = () => {
    const [query, setQuery] = useState('');
    const [audioType, setAudioType] = useState('background-music'); // Default to background music
    const [audioResults, setAudioResults] = useState([]);

    // Fetch audio from Jamendo API
    const fetchAudio = async (searchQuery) => {
        try {
            const params = {
                client_id: JAMENDO_CLIENT_ID,
                format: 'json',
                limit: 10,
                search: searchQuery,
                include: 'musicinfo+licenses', // Include additional fields if needed
            };

            const response = await axios.get(JAMENDO_API_URL, { params });
            const results = response.data.results.map((track) => ({
                id: track.id,
                title: track.name,
                url: track.audio, // URL to stream the audio
            }));

            setAudioResults(results);
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    };

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            fetchAudio(query);
        }
    };

    return (
        <div className="w-full h-screen p-4 bg-n-9/40 backdrop-blur border border-n-1/10 text-white">
            {/* Audio Type Selection */}
            <div className="flex mb-4 gap-4">
                <label>
                    <input
                        type="radio"
                        name="audioType"
                        value="background-music"
                        checked={audioType === 'background-music'}
                        onChange={() => setAudioType('background-music')}
                        className='mr-2'
                    />
                    Background Music
                </label>
                <label>
                    <input
                        type="radio"
                        name="audioType"
                        value="voiceovers"
                        checked={audioType === 'voiceovers'}
                        onChange={() => setAudioType('voiceovers')}
                        className='mr-2'
                    />
                    Clone Your Own Voice
                </label>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Search for audio..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="p-2 bg-n-8 text-white hover:bg-n-9 rounded">
                    <Search size={20} />
                </button>
            </form>

            {/* Scrollable Audio Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-[30rem] overflow-y-scroll">
                {audioResults.map((audio) => (
                    <div key={audio.id} className="bg-n-8 rounded-lg shadow-md p-2">
                        <audio controls className="w-full">
                            <source src={audio.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <p className="text-sm text-gray-600 mt-1 text-center">{audio.title}</p>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {audioResults.length === 0 && query && (
                <div className="text-center text-gray-500 mt-4">
                    No {audioType} found for "{query}"
                </div>
            )}
        </div>
    );
};

export default AudioSelection;
