// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up
// import Section from './Section';
// import Button from './Button';
// import image2 from "../assets/HowItWorks/image-2.png";
// import image1 from "../assets/HowItWorks/image-1.png";
// import image3 from "../assets/HowItWorks/image-3.png";
// import image4 from "../assets/HowItWorks/image-4.png";
// import image5 from "../assets/HowItWorks/image-5.png";
// import image6 from "../assets/HowItWorks/image-6.png";
// import happy from "../assets/team/happyp.png";
// import { curve } from '../assets';
// import { FaArrowLeft } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
// import Notification2 from './Notification2';

// const Contact = () => {
//     const [activeSection, setActiveSection] = useState(1);

//     const sections = [
//         {
//             id: 1,
//             title: "Sign Up",
//             description: "Create an account with AURA.ai by providing your name, email address, and password. Once signed up, you're ready to start creating videos.",
//             img: happy,
//         },
//         {
//             id: 2,
//             title: "Upload a Document",
//             description: "Easily upload a document, which will be converted into engaging video content. The text and images from your PDF will be analyzed for processing.",
//             img: image2,
//         },
//         {
//             id: 3,
//             title: "Customize Your Video",
//             description: "Personalize your video by adjusting visuals, audio, text, and interactive elements to suit your preferences and audience.",
//             img: image3,
//         },
//         {
//             id: 4,
//             title: "Preview and Share",
//             description: "Preview your video to ensure it’s just right. Once satisfied, share it easily via a landing page or other platforms for maximum reach.",
//             img: image4,
//         },
//         {
//             id: 5,
//             title: "Play Quiz",
//             description: "Engage your audience with a custom quiz based on your video content, designed to test their understanding and enhance interactivity.",
//             img: image5,
//         },
//         {
//             id: 6,
//             title: "View Analytics",
//             description: "Track and analyze how users interact with your video and quiz. Get insights into engagement, performance, and preferences on your analytics dashboard.",
//             img: image6,
//         },
//     ];

//     const handleSectionClick = (id) => {
//         setActiveSection(id);
//     };

//     const goToNextSection = () => {
//         if (activeSection < sections.length) {
//             setActiveSection(activeSection + 1);
//         }
//     };

//     const goToPreviousSection = () => {
//         if (activeSection > 1) {
//             setActiveSection(activeSection - 1);
//         }
//     };

//     return (
//         <Section
//             className="pt-[8rem] pb-[4rem] "
//             crosses
//             crossesOffset="lg:translate-y-[5.25rem]"
//             customPaddings id="howitworks">
//             <div className='flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 gap-10 pb-20 pt-5 lg:-mb-16 lg:gap-60'>

//                 {/* Left Side - Text */}
//                 <div className="lg:max-w-md">
//                     <div className="tagline flex items-center mb-4 lg:mb-6">
//                         <svg width="5" height="14" viewBox="0 0 5 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M5 0.822266H1V12.8223H5" stroke="url(#brackets-left)"></path>
//                             <defs>
//                                 <linearGradient id="brackets-left" x1="50%" x2="50%" y1="0%" y2="100%">
//                                     <stop offset="0%" stopColor="#89F9E8"></stop>
//                                     <stop offset="100%" stopColor="#FACB7B"></stop>
//                                 </linearGradient>
//                             </defs>
//                         </svg>
//                         {/* <div className="mx-3 text-n-3">How It Works: 0{activeSection}.</div> */}
//                         <div className="mx-3 text-n-3">Our Backbone</div>
//                         <svg width="5" height="14" viewBox="0 0 5 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M-2.98023e-08 0.822266H4V12.8223H-2.98023e-08" stroke="url(#brackets-right)"></path>
//                             <defs>
//                                 <linearGradient id="brackets-right" x1="14.635%" x2="14.635%" y1="0%" y2="100%">
//                                     <stop offset="0%" stopColor="#9099FC"></stop>
//                                     <stop offset="100%" stopColor="#D87CEE"></stop>
//                                 </linearGradient>
//                             </defs>
//                         </svg>
//                     </div>
//                     <h2 className='h2 mb-4 lg:mb-6'>
//                         {/* {sections.find((section) => section.id === activeSection).title} */}
//                         Meet The Team Behind The <span className="inline-block relative bg-gradient-text bg-clip-text text-transparent">
//                             Magic{" "}
//                             <img
//                                 src={curve}
//                                 className="absolute top-full left-1/2 transform -translate-x-1/2 w-100 xl:-mt-1 scale-y-50 "
//                                 width={504}
//                                 height={10}
//                                 alt="Curve"
//                             />
//                         </span>
//                     </h2>
//                     {/* <p className="text-gray-300 mb-6">
//                         {sections.find((section) => section.id === activeSection).description}
//                     </p> */}

//                     <Button className="mt-2 py-4 px-8 rounded-full shadow-md">
//                         CONNECT WITH THE TEAM
//                     </Button>

//                     {/* Navigation Arrows Below Button */}
//                     <div className="flex my-4 justify-start gap-4 mt-8">
//                         <button
//                             onClick={goToPreviousSection}
//                             disabled={activeSection === 1}
//                             className={`h-10 w-10 border border-white rounded-full flex justify-center items-center text-xl  ${activeSection === 1 ? 'text-gray-500' : 'text-gray-300'}`}>
//                             <FaArrowLeft />
//                         </button>
//                         <button
//                             onClick={goToNextSection}
//                             disabled={activeSection === sections.length}
//                             className={`h-10 w-10 border border-white rounded-full flex justify-center items-center text-xl  ${activeSection === sections.length ? 'text-gray-500' : 'text-gray-300'}`}>
//                             <FaArrowRight />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Right Side - Image */}
//                 <div className="mb-16 lg:mb-0 lg:mr-8 flex-shrink-0">
//                     <div className="relative border border-n-6 rounded-3xl">
//                         <img
//                             src={sections.find((section) => section.id === activeSection).img}
//                             alt={sections.find((section) => section.id === activeSection).title}
//                             className="inline-block align-top transition-opacity opacity-100 w-[450px] h-[470px] object-contain"
//                         />
//                         <div className="hidden absolute -right-6 top-8 bottom-8 w-6 bg-[#1B1B2E] rounded-r-3xl lg:inline-block"></div>
//                         <div className=" hidden absolute -right-12 top-16 bottom-16 w-6 bg-[#1B1B2E]/50 rounded-r-3xl lg:inline-block"></div>
//                         <Notification2
//                     className="hidden absolute right-[4.5rem] top-[25rem] w-[18rem] xl:flex z-50"
//                     title="Happy Yadav"
//                   />
//                     </div>
//                 </div>
//             </div>
//         </Section>
//     );
// };

// export default Contact;

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up
import Section from './Section';
import Button from './Button';

import happy from "../assets/team/happy.png";
import hishita from "../assets/team/hishita.png";
import ansh from "../assets/team/ansh.png";
import vedansh from "../assets/team/vedansh.png";

import { curve } from '../assets';
import { FaArrowLeft, FaArrowRight, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Gradient } from './design/Services';
import { GradientLight } from './design/Features';

const Team = () => {
    const [activeSection, setActiveSection] = useState(1);

    const teamData = [
        {
            id: 1,
            name: "Happy Yadav",
            role: "Backend Dev & Data Specialist",
            image: happy,
            socialLinks: {
                linkedin: "https://www.linkedin.com/in/happyyadav",
                github: "https://github.com/happyyadav",
                instagram: "https://instagram.com/happyyadav",
            },
            line:"Teamwork makes the dream work.",
        },
        {
            id: 2,
            name: "Vedansh Sharma",
            role: "Lead Backend Dev & AI Specialist",
            image: vedansh,
            socialLinks: {
                linkedin: "https://www.linkedin.com/in/happyyadav",
                github: "https://github.com/happyyadav",
                instagram: "https://instagram.com/happyyadav",
            },
            line:"Collaboration fuels innovation.",
        },
        {
            id: 3,
            name: "Hishita Gupta",
            role: "Lead Frontend Dev & UI/UX Designer",
            image: hishita,
            socialLinks: {
                linkedin: "https://www.linkedin.com/in/happyyadav",
                github: "https://github.com/happyyadav",
                instagram: "https://instagram.com/happyyadav",
            },
            line:"Together, we achieve more.",
        },
        {
            id: 4,
            name: "Ansh Chahal",
            role: "Project Manager & Business Strategist",
            image: ansh,
            socialLinks: {
                linkedin: "https://www.linkedin.com/in/happyyadav",
                github: "https://github.com/happyyadav",
                instagram: "https://instagram.com/happyyadav",
            },
            line:"Unity is strength.",
        },
        // Add other team members similarly
    ];

    const handleSectionClick = (id) => {
        setActiveSection(id);
    };

    const goToNextSection = () => {
        if (activeSection < teamData.length) {
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
            className="pt-[8rem] pb-[4rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="team"

        >

            <Gradient/>
            <div className='flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 gap-10 pb-20 pt-5 lg:-mb-16 lg:gap-60 relative'>

                {/* Left Side - Text */}
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
                        <div className="mx-3 text-n-3">Our Backbone</div>
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
                        Meet The Team Behind The <span className="inline-block relative bg-gradient-text bg-clip-text text-transparent">
                            Magic{" "}
                            <img
                                src={curve}
                                className="absolute top-full left-1/2 transform -translate-x-1/2 w-100 xl:-mt-1 scale-y-50"
                                width={504}
                                height={10}
                                alt="Curve"
                            />
                        </span>
                    </h2>

                    <Button className="mt-2 py-4 px-8 rounded-full shadow-md">
                        CONNECT WITH THE TEAM
                    </Button>

                    {/* Navigation Arrows Below Button */}
                    <div className="flex my-4 justify-start gap-4 mt-8">
                        <button
                            onClick={goToPreviousSection}
                            disabled={activeSection === 1}
                            className={`h-10 w-10 border border-white rounded-full flex justify-center items-center text-xl  ${activeSection === 1 ? 'text-gray-500' : 'text-gray-300'}`}>
                            <FaArrowLeft />
                        </button>
                        <button
                            onClick={goToNextSection}
                            disabled={activeSection === teamData.length}
                            className={`h-10 w-10 border border-white rounded-full flex justify-center items-center text-xl  ${activeSection === teamData.length ? 'text-gray-500' : 'text-gray-300'}`}>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* Right Side - Image and Team Member Details */}
                <div className="mb-16 lg:mb-0 lg:mr-8 flex-shrink-0">
                    <div className="relative border border-n-6 rounded-3xl">
                        <img
                            src={teamData.find((member) => member.id === activeSection).image}
                            alt={teamData.find((member) => member.id === activeSection).name}
                            className="inline-block align-top transition-opacity opacity-100 w-[450px] h-[470px] object-contain"
                        />
                        <div className="hidden absolute -right-6 top-8 bottom-8 w-6 bg-[#1B1B2E] rounded-r-3xl lg:inline-block"></div>
                        <div className="hidden absolute -right-12 top-16 bottom-16 w-6 bg-[#1B1B2E]/50 rounded-r-3xl lg:inline-block"></div>

                        {/* Team Member Info Overlay */}
                        <div className="hidden absolute right-[4.5rem] top-[25rem] w-[18rem] xl:flex z-50 flex items-center p-2 pt-4 pb-4 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5">
                            <div className="flex-1 text-center">
                                <h5 className="font-semibold text-xl">{teamData.find((member) => member.id === activeSection).name}</h5>
                                <div className="body-4 text-sm text-n-3">{teamData.find((member) => member.id === activeSection).role}</div>

                                <div className="flex items-center justify-center pt-1">
                                    <ul className="flex -m-0.5">
                                        <Link to={teamData.find((member) => member.id === activeSection).socialLinks.linkedin}>
                                            <li className="flex w-6 h-6 overflow-hidden justify-center items-center">
                                                <FaLinkedinIn />
                                            </li>
                                        </Link>
                                        <Link to={teamData.find((member) => member.id === activeSection).socialLinks.github}>
                                            <li className="flex w-6 h-6 overflow-hidden justify-center items-center">
                                                <FaGithub />
                                            </li>
                                        </Link>
                                        <Link to={teamData.find((member) => member.id === activeSection).socialLinks.instagram}>
                                            <li className="flex w-6 h-6 overflow-hidden justify-center items-center">
                                                <FaInstagram />
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div class="absolute  -right-350 max-w-[17.5rem] py-4 px-4 pl-8 rounded-t-xl rounded-bl-xl font-code text-sm lg:top-16 lg:right-[35.75rem] lg:max-w-[17.5rem]  bg-n-9/40 backdrop-blur ">
                {teamData.find((member) => member.id === activeSection).line}
                    <svg class="absolute left-full bottom-0 fill-n-9/40 backdrop-blur " xmlns="http://www.w3.org/2000/svg" width="26" height="37">
                        <path d="M21.843 37.001c3.564 0 5.348-4.309 2.829-6.828L3.515 9.015A12 12 0 0 1 0 .53v36.471h21.843z"></path>
                    </svg>
                </div>

            </div>
        </Section>
    );
};

export default Team;
