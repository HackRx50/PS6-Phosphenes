import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up
import Section from './Section';
import Heading from './Heading';
import Button from './Button';

const HowItWorks = () => {

    // Define the states for each section's content and image
    const [activeSection, setActiveSection] = useState(1);


    const sections = [
        {
            id: 1,
            title: "Sign up",
            description: "Create an account with Brainwave by providing your name, email address, and password. Once signed up, you can explore the app.",
            img: "/path-to-image-1.png", // Replace with the actual image path
        },
        {
            id: 2,
            title: "Connect with AI chatbot",
            description: "Connect with the AI chatbot to start the conversation. The chatbot uses natural language processing to understand your queries.",
            img: "/path-to-image-2.png", // Replace with the actual image path
        },
        {
            id: 3,
            title: "Get Personalized Advice",
            description: "Receive personalized advice tailored to your preferences by interacting with the AI chatbot and exploring the app's features.",
            img: "/path-to-image-3.png", // Replace with the actual image path
        },
        {
            id: 4,
            title: "Explore and Engage",
            description: "Dive deeper into the app by exploring different tools and engaging with AI for enhanced experiences.",
            img: "/path-to-image-4.png", // Replace with the actual image path
        },
    ];

    const handleSectionClick = (id) => {
        setActiveSection(id);
    };










    return (
        <Section className="mb-5">
            <div className='flex flex-col lg:flex-row items-center justify-between  px-6 lg:px-16 
     pb-20 pt-5 lg:-mb-16 '>
                {/* Left Side - Image */}
                <div className="mb-8 lg:mb-0 lg:mr-8 flex-shrink-0">
                    <div className="relative">
                        <img
                            src={sections.find((section) => section.id === activeSection).img}
                            alt={sections.find((section) => section.id === activeSection).title}
                            className="w-80 lg:w-96"
                        />
                    </div>
                </div>

                {/* Right Side - Text */}
                <div className="lg:max-w-md">
                    <div class="tagline flex items-center mb-4 lg:mb-6"><svg width="5" height="14" viewBox="0 0 5 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 0.822266H1V12.8223H5" stroke="url(#brackets-left)"></path><defs><linearGradient id="brackets-left" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#89F9E8"></stop><stop offset="100%" stop-color="#FACB7B"></stop></linearGradient></defs></svg><div class="mx-3 text-n-3">How It Work: 0{activeSection}.</div><svg width="5" height="14" viewBox="0 0 5 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-2.98023e-08 0.822266H4V12.8223H-2.98023e-08" stroke="url(#brackets-right)"></path><defs><linearGradient id="brackets-right" x1="14.635%" x2="14.635%" y1="0%" y2="100%"><stop offset="0%" stop-color="#9099FC"></stop><stop offset="100%" stop-color="#D87CEE"></stop></linearGradient></defs></svg></div>
                    <h2 className='h2 mb-4 lg:mb-6'>  {sections.find((section) => section.id === activeSection).title}</h2>
                    <p className="text-gray-300 mb-6">
                        {sections.find((section) => section.id === activeSection).description}
                    </p>

                    <Button className=" py-3 px-8 rounded-full shadow-md">
                        CONNECT NOW
                    </Button>
                </div>
            </div>

            <div className="hidden lg:flex justify-between mt-10 pt-10 items-center px-6 lg:px-16 mb-40">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`text-center w-1/4 `}
                    >
                        <div className="flex flex-col items-center gap-20">
                            <div
                                className={`mt-4 mb-4 w-[95%] h-0.5 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-purple-500' : 'bg-gray-400'
                                    }`}
                            >
                                <h5 className="h5 tagline text-base   mt-4">
                                    0{section.id}.
                                </h5>
                                <h3 className="h3  text-2xl   mb-0.5 mt-0.2">
                                    {section.title}
                                </h3>
                                <p className="text-gray-300  text-left p-2">
                                    {activeSection === section.id ? `${section.description.slice(0, 50)}...` : ''}
                                </p>


                            </div>
                        </div>
                    </button>
                ))}
            </div>

        </Section>
    );
};

export default HowItWorks;
