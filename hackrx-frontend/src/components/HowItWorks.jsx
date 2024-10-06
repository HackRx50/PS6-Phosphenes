import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up
import Section from './Section';
import Heading from './Heading';
import Button from './Button';
import image2 from "../assets/HowItWorks/image-2.png"
import image1 from "../assets/HowItWorks/image-1.png"
import image3 from "../assets/HowItWorks/image-3.png"
import image4 from "../assets/HowItWorks/image-4.png"
import image5 from "../assets/HowItWorks/image-5.png"
import image6 from "../assets/HowItWorks/image-6.png"

const HowItWorks = () => {

    // Define the states for each section's content and image
    const [activeSection, setActiveSection] = useState(1);

    const sections = [
        {
            id: 1,
            title: "Sign Up",
            description: "Create an account with AURA.ai by providing your name, email address, and password. Once signed up, you're ready to start creating videos.",
            img: image1,
        },
        {
            id: 2,
            title: "Upload a Document",
            description: "Easily upload a document, which will be converted into engaging video content. The text and images from your PDF will be analyzed for processing.",
            img: image2,
        },
        {
            id: 3,
            title: "Customize Your Video",
            description: "Personalize your video by adjusting visuals, audio, text, and interactive elements to suit your preferences and audience.",
            img: image3,
        },
        {
            id: 4,
            title: "Preview and Share",
            description: "Preview your video to ensure it’s just right. Once satisfied, share it easily via a landing page or other platforms for maximum reach.",
            img: image4,
        },
        {
            id: 5,
            title: "Play Quiz",
            description: "Engage your audience with a custom quiz based on your video content, designed to test their understanding and enhance interactivity.",
            img: image5,
        },
        {
            id: 6,
            title: "View Analytics",
            description: "Track and analyze how users interact with your video and quiz. Get insights into engagement, performance, and preferences on your analytics dashboard.",
            img: image6,
        },
    ];

    const handleSectionClick = (id) => {
        setActiveSection(id);
    };

    const goToNextSection = () => {
        if (activeSection < sections.length) {
            setActiveSection(activeSection + 1);
        }
    };

    const goToPreviousSection = () => {
        if (activeSection > 1) {
            setActiveSection(activeSection - 1);
        }
    };

    return (
        <Section
        className="pt-[8rem] -mt-[5.25rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings id="howitworks">
            <div className='flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 gap-10 pb-10 pt-5 lg:-mb-16 lg:gap-60'>
                {/* Left Side - Image */}
                <div className="mb-8 lg:mb-0 lg:mr-8 flex-shrink-0">
                    <div className="relative bg-gradient-to-tl from-n-1/0 via-n-1/0 to-n-1/15 rounded-3xl">
                        <img
                            src={sections.find((section) => section.id === activeSection).img}
                            alt={sections.find((section) => section.id === activeSection).title}
                            className="inline-block align-top transition-opacity opacity-100 w-[450px] h-[470px] object-contain"
                        />
                        <div className="hidden absolute -right-6 top-8 bottom-8 w-6 bg-[#1B1B2E] rounded-r-3xl lg:inline-block"></div>
                        <div className=" hidden absolute -right-12 top-16 bottom-16 w-6 bg-[#1B1B2E]/50 rounded-r-3xl lg:inline-block"></div>
                    </div>
                </div>

                {/* Right Side - Text */}
                <div className="lg:max-w-md">
                    <div className="tagline flex items-center mb-4 lg:mb-6">
                        <svg width="5" height="14" viewBox="0 0 5 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 0.822266H1V12.8223H5" stroke="url(#brackets-left)"></path>
                            <defs>
                                <linearGradient id="brackets-left" x1="50%" x2="50%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#89F9E8"></stop>
                                    <stop offset="100%" stopColor="#FACB7B"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="mx-3 text-n-3">How It Works: 0{activeSection}.</div>
                        <svg width="5" height="14" viewBox="0 0 5 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-2.98023e-08 0.822266H4V12.8223H-2.98023e-08" stroke="url(#brackets-right)"></path>
                            <defs>
                                <linearGradient id="brackets-right" x1="14.635%" x2="14.635%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#9099FC"></stop>
                                    <stop offset="100%" stopColor="#D87CEE"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h2 className='h2 mb-4 lg:mb-6'>
                        {sections.find((section) => section.id === activeSection).title}
                    </h2>
                    <p className="text-gray-300 mb-6">
                        {sections.find((section) => section.id === activeSection).description}
                    </p>

                    <Button className="mt-2 py-4 px-8 rounded-full shadow-md">
                        CONNECT NOW
                    </Button>
                </div>
            </div>

            {/* Hidden on large screens - Arrows on small and medium screens */}
            <div className="flex flex-col justify-start items-start px-8 sm:px-10 lg:hidden">
                <div className="text-gray-400 ">
                    Step 0{activeSection} of 0{sections.length}
                </div>
                <div className='flex my-2 justify-between items-center  lg:hidden gap-5'>
                    <div className='h-10 w-10 border border-white rounded-full  flex justify-center items-center'>
                        <button onClick={goToPreviousSection} disabled={activeSection === 1} className="text-xl text-gray-300 flex justify-center items-center font-extrabold">
                            ←
                        </button>
                    </div>
                    <div className='h-10 w-10 border border-white rounded-full  flex justify-center items-center'>
                        <button onClick={goToNextSection} disabled={activeSection === sections.length} className="text-xl text-gray-300 flex justify-center items-center font-extrabold">
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Buttons hidden on small and medium screens */}
            <div className="hidden lg:flex justify-between mt-6 pt-10 items-center mx-10 lg:px-16 mb-40 gap-10">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`text-center w-1/6 `}
                    >
                        <div className="flex flex-col items-center lg:gap-20">
                            <div
                                className={`mt-4 mb-4 w-[95%] h-0.5 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-purple-500' : 'bg-gray-400'
                                    }`}
                            >
                                <h5 className="h5 tagline text-base mt-4">
                                    0{section.id}.
                                </h5>
                                <h3 className="h3 text-lg mb-0.5 mt-0.2">
                                    {section.title}
                                </h3>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </Section>
    );
};

export default HowItWorks;
