import React, { useState } from 'react';
import Section from './Section';
import { GradientLight } from './design/Features';
import Button from './Button';
import { Linkedin } from 'lucide-react'; // Social media icons
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import DemVideo from "../assets/final_slideshow.mp4";
import ChatBot from './Chatbot';
import { Gradient } from './design/Roadmap';

const Preview = () => {
    const [videoUrl, setVideoUrl] = useState('http://127.0.0.1:8000/video/final_slideshow');
    const [copied, setCopied] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const dummyEmbedCode = `<iframe src="${videoUrl}" width="800" height="400" frameborder="0" allowfullscreen></iframe>`; // Dummy embed code

    const handleCopyLink = () => {
        navigator.clipboard.writeText(videoUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
        });
    };

    const handleEmbedCopy = () => {
        navigator.clipboard.writeText(dummyEmbedCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
        });
    };

    const handleSocialShare = (platform) => {
        const encodedVideoUrl = encodeURIComponent(videoUrl);
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedVideoUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedVideoUrl}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedVideoUrl}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedVideoUrl}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };

    const handleEmbedCode = () => {
        setShowPopup(true); // Show the popup when the button is clicked
    };

    const closePopup = () => {
        setShowPopup(false); // Function to close the popup
    };

    return (
        <Section
            className="pt-[3rem] -mt-[5.25rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id=""
        >
            <GradientLight />
            <div className="flex justify-center h-screen text-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Video Preview</h1>
                    <div className="relative">
                        {/* Video Component */}
                        <video className="w-[800px] h-[400px]" controls>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Social Icons on the Right, Vertically Stacked */}
                        <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
                            <button onClick={() => handleSocialShare('facebook')} aria-label="Share on Facebook">
                                <FaFacebook size={20} className="hover:text-purple-500 cursor-pointer" />
                            </button>
                            <button onClick={() => handleSocialShare('twitter')} aria-label="Share on Twitter">
                                <FaTwitter size={20} className="hover:text-purple-500 cursor-pointer" />
                            </button>
                            <button onClick={() => handleSocialShare('linkedin')} aria-label="Share on LinkedIn">
                                <Linkedin size={20} className="hover:text-purple-500 cursor-pointer" />
                            </button>
                            <button onClick={() => handleSocialShare('whatsapp')} aria-label="Share on WhatsApp">
                                <BsWhatsapp size={20} className="hover:text-purple-500 cursor-pointer" />
                            </button>
                        </div>
                        <ChatBot />

                    </div>

                    <div className="mt-5  backdrop-blur flex gap-5">
                        <Button
                            onClick={handleCopyLink}
                            
                            className="flex gap-2 w-full"
                        >
                            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                        </Button>
                        <Button href="/quiz" className="flex gap-2 w-full">
                            Play Quiz
                        </Button>
                        <Button
                            onClick={handleEmbedCode} // Handle embed code button click
                            className="flex gap-5 w-full"
                        >
                        Embedded Code
                        </Button>

                        
                    </div>

                    {/* Popup for Embed Code */}
                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-n-9 bg-opacity-0 backdrop-blur z-0 ">
                            <div className="bg-n-8 p-8 border border-n-1/10 rounded-lg shadow-lg text-center overflow-hidden backdrop-blur">
                            <Gradient />
                                <h2 className="text-xl font-bold mb-4 text-white">Embed Code</h2>
                                <textarea
                                    className="w-full h-64 p-5 border border-gray-300 rounded mb-2"
                                    readOnly
                                    value={dummyEmbedCode}
                                />
                                <div className="flex gap-10">
                                <Button onClick={closePopup} className="flex gap-2 w-full">
                                    Cancel
                                </Button>
                                <Button onClick={handleEmbedCopy} className="flex gap-5 w-full">
                                    Copy Code
                                </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Preview;
