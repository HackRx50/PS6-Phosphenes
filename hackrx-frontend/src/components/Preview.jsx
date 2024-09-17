import React, { useState } from 'react';
import Section from './Section';
import { GradientLight } from './design/Features';
import Button from './Button';
import { Linkedin } from 'lucide-react'; // Social media icons
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import DemVideo from "../assets/final_slideshow.mp4"

const Preview = () => {
    const [videoUrl, setVideoUrl] = useState('http://127.0.0.1:8000/video/final_slideshow');
    // const videoUrl = DemVideo;
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(videoUrl).then(() => {
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
                    </div>

                    <div className="mt-5 flex gap-4">
                        <Button
                            onClick={handleCopyLink}
                            white
                            className="flex gap-2 w-full"
                        >
                            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                        </Button>
                        <Button href="/quiz" className="flex gap-2 w-full">
                            Play Quiz
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Preview;
