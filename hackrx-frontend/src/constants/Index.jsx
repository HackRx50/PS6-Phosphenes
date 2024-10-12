import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
    benefitIcon5,
    benefitIcon6,
    benefitImage2,
    chromecast,
    disc02,
    discord,
    discordBlack,
    facebook,
    figma,
    file02,
    framer,
    homeSmile,
    instagram,
    notification2,
    notification3,
    notification4,
    notion,
    photoshop,
    plusSquare,
    protopie,
    raindrop,
    recording01,
    recording03,
    roadmap1,
    roadmap2,
    roadmap3,
    roadmap4,
    searchMd,
    slack,
    sliders04,
    telegram,
    twitter,
    yourlogo,
    amazons3,
    expressjs,
    firebase,
    github,
    mongo,
    postman,
    python,
    react,
    gradient,

} from "../assets";

import purplegradient from '../assets/purplegradient.png'
import cost from '../assets/impact/cost.png'
import time from '../assets/impact/time.png'
import engagement from '../assets/impact/engagement.png'
import retention from '../assets/impact/retention.png'
import feedback1 from '../assets/feedback/feedback1.avif';
import feedback2 from '../assets/feedback/feedback2.avif';
import feedback3 from '../assets/feedback/feedback3.avif';
import feedback4 from '../assets/feedback/feedback4.avif';
import feedback5 from '../assets/feedback/feedback5.avif';
import feedback6 from '../assets/feedback/feedback6.jpg';
// import happyp from "../assets/team/happyp.png"



export const navigation = [
    {
        id: "0",
        title: "Features",
        url: "#features",
    },
    {
        id: "1",
        title: "Tech Stack",
        url: "#techstack",
    },
    {
        id: "2",
        title: "Enhancements",
        url: "#enhancements",
    },
    {
        id: "3",
        title: "Our Team",
        url: "#ourteam",
    },
    {
        id: "4",
        title: "Dashboard",
        url: "/overview",

    },
    // {
    //   id: "5",
    //   title: "New User",
    //   url: "/login",
    //   onlyMobile: true,
    // },
    {
        id: "6",
        title: "Login",
        url: "/login",
        onlyMobile: true,
    },

];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];




export const brainwaveServicesIcons = [
    recording03,
    recording01,
    disc02,
    chromecast,
    sliders04,
];

export const roadmap = [
    {
        id: "0",
        title: "Voice recognition",
        text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap1,
        colorful: true,
    },
    {
        id: "1",
        title: "Gamification",
        text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap2,
    },
    {
        id: "2",
        title: "Chatbot customization",
        text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap3,
    },
    {
        id: "3",
        title: "Integration with APIs",
        text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap4,
    },
];

export const collabText =
    "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
    {
        id: "0",
        title: "50-60% Cost Savings.",
        text: collabText,
    },
    {
        id: "1",
        title: "Up to 70% Time Reduction.",
    },
    {
        id: "2",
        title: "2x more User Engagement.",
    },
    {
        id: "3",
        title: "2x more User Retention.",
    },
];

export const collabApps = [
    {
        id: 1,
        icon: cost,
        title: "50%",
        subtitle: "Cost Savings",
        width: 24,
        height: 24,
    },
    {
        id: 2,
        icon: time,
        title: "70%",
        subtitle: "Time Reduction",
        width: 24,
        height: 24,
    },
    {
        id: 3,
        icon: engagement,
        title: "2x",
        subtitle: "User Engagement",
        width: 24,
        height: 24,
    },
    {
        id: 4,
        icon: retention,
        title: "2x",
        subtitle: "User Retention",
        width: 24,
        height: 24,
    },
    // {
    //     id: "4",
    //     title: "expressjs",
    //     icon: expressjs,
    //     width: 34,
    //     height: 34,
    // },
    // {
    //     id: "5",
    //     title: "MongoDB",
    //     icon: mongo,
    //     width: 34,
    //     height: 34,
    // },
    // {
    //     id: "6",
    //     title: "amazon s3",
    //     icon: amazons3,
    //     width: 26,
    //     height: 34,
    // },
    // {
    //     id: "7",
    //     title: "Firebase",
    //     icon: firebase,
    //     width: 38,
    //     height: 32,
    // },
    // {
    //   id: "8",
    //   title: "github",
    //   icon: github,
    //   width: 38,
    //   height: 32,
    // },
];

export const pricing = [
    {
        id: "0",
        title: "Basic",
        description: "Create engaging videos from text with basic features, ideal for individuals or small projects.",
        price: "0",
        features: [
            "An easy-to-use text-to-video engine that converts simple text into high-quality videos.",
            "Access to a limited selection of video templates for quick video creation.",
            "Up to 1-minute video length with watermark branding.",
            "Basic analytics to track engagement with your video",
            "Multilingual support for up to 10 languages.",
        ],
    },
    {
        id: "1",
        title: "Premium",
        description: "Unlock advanced customization options and analytics for professionals looking to create compelling, longer videos.",
        price: "9.99",
        features: [
            "An advanced text-to-video engine with support for complex inputs like brochures or detailed text",
            "Access to premium video templates for greater design flexibility.",
            "Up to 5-minute videos, along with watermark removal.",
            "AI-powered voiceovers with customizable accents.",
            "Advanced analytics dashboard with insights into video performance.",
            // "Multilingual support for up to 64 languages.",
            // "Watermark removal for seamless branding.",]
        ]
           
    },
    {
        id: "2",
        title: "Enterprise",
        description: "Comprehensive tools and support for businesses needing large-scale video generation and team collaboration",
        price: null,
        features: [
           " Unlimited video length with no restrictions on content complexity.",
            "Access to custom AI voices and personalized video branding.",
            "Collaborate across teams with seamless sharing and editing features",
            "Enterprise-level analytics with deep insights, including behavioral heatmaps and engagement tracking.",
            // "API integration and automation for streamlined workflows.",
           " Custom branding and white-label solutions available.",
            // "Dedicated account manager for personalized support.",
        ],
    },
    // {
    //     id: "3",
    //     title: "Enterprise",
    //     description: "Custom AI chatbot, advanced analytics, dedicated account",
    //     price: null,
    //     features: [
    //         "An AI chatbot that can understand your queries",
    //         "Personalized recommendations based on your preferences",
    //         "Ability to explore the app and its features without any cost",
    //     ],
    // },
];

export const benefits = [
    {
        id: "0",
        title: "Multilingual Support",
        text: "Create videos in multiple languages, broadening your reach to a global audience with seamless translation and narration capabilities",
        backgroundUrl: "./src/assets/benefits/card-1.svg",
        iconUrl: benefitIcon1,
        imageUrl: purplegradient,
    },
    {
        id: "1",
        title: "Massive Customization Options",
        text: "Vast customization features enabling users to tailor visuals, audio, and interactive elements to craft videos.",
        backgroundUrl: "./src/assets/benefits/card-5.svg",
        iconUrl: benefitIcon6,
        imageUrl: purplegradient,
    },

    {
        id: "2",
        title: "Multi Document Upload Support",
        text: "Upload multiple document types: PDF, PPT, DOC, and Flyer for seamless video generation and enhanced customization.",
        backgroundUrl: "./src/assets/benefits/card-6.svg",
        iconUrl: benefitIcon5,
        imageUrl: purplegradient,
    },
    
    {
        id: "3",
        title: "Interactive Quiz Creation",
        text: "Enhance engagement by generating quizzes based on the video content, perfect for educational or training purposes.",
        backgroundUrl: "./src/assets/benefits/card-3.svg",
        iconUrl: benefitIcon3,
        imageUrl: purplegradient,
    },
    {
        id: "4",
        title: "Advanced Analytics Dashboard",
        text: "Track user interaction with detailed metrics on video engagement, quiz performance, and audience retention.",
        backgroundUrl: "./src/assets/benefits/card-4.svg",
        iconUrl: benefitIcon4,
        imageUrl: purplegradient,
        light: true,
    },

    {
        id: "5",
        title: "Team Collaboration Tools",
        text: "Team collaboration with real-time editing, feedback, and shared project management for enhanced productivity.",
        backgroundUrl: "./src/assets/benefits/card-6.svg",
        iconUrl: benefitIcon5,
        imageUrl: purplegradient,
    },
    {
        id: "6",
        title: "AURA.ai Bot",
        text: "The bot is made to accurately solve any lingering queries the user has even after watching the video.",
        backgroundUrl: "./src/assets/benefits/card-2.svg",
        iconUrl: benefitIcon2,
        imageUrl: purplegradient,
        light: true,
    },
    
];

export const socials = [
    {
        id: "0",
        title: "Discord",
        iconUrl: discordBlack,
        url: "#",
    },
    {
        id: "1",
        title: "Twitter",
        iconUrl: twitter,
        url: "#",
    },
    {
        id: "2",
        title: "Instagram",
        iconUrl: instagram,
        url: "#",
    },
    {
        id: "3",
        title: "Telegram",
        iconUrl: telegram,
        url: "#",
    },
    {
        id: "4",
        title: "Facebook",
        iconUrl: facebook,
        url: "#",
    },
];
export const feedback = [
    {
        id: "0",
        name: "John Doe",
        text: "AURA.ai revolutionized our training programs with its engaging videos and interactive quizzes!",
        backgroundUrl: "./src/assets/benefits/card-1.svg",
        iconUrl: feedback1,
        imageUrl: purplegradient,
    },
    {
        id: "1",
        name: "Jane Smith",
        text: "The AI-driven content generation is a game-changer. It saves us hours of work while maintaining quality.",
        backgroundUrl: "./src/assets/benefits/card-2.svg",
        iconUrl: feedback2,
        imageUrl: purplegradient,
        light: true,
    },
    {
        id: "2",
        name: "Alice Johnson",
        text: "I love the multilingual support. It allows us to reach a wider audience effortlessly.",
        backgroundUrl: "./src/assets/benefits/card-3.svg",
        iconUrl: feedback3,
        imageUrl: purplegradient,
    },
    {
        id: "3",
        name: "Bob Lee",
        text: "The analytics dashboard is incredibly insightful. It helps us track engagement and improve our content.",
        backgroundUrl: "./src/assets/benefits/card-4.svg",
        iconUrl: feedback4,
        imageUrl: purplegradient,
        light: true,
    },
    {
        id: "4",
        name: "Charlie Brown",
        text: "Team collaboration tools have made project management so much easier. We're more productive than ever!",
        backgroundUrl: "./src/assets/benefits/card-6.svg",
        iconUrl: feedback5,
        imageUrl: purplegradient,
    },
    {
        id: "5",
        name: "Diana Prince",
        text: "The customization options are fantastic! We can tailor every video to fit our brand perfectly.",
        backgroundUrl: "./src/assets/benefits/card-5.svg",
        iconUrl: feedback6,
        imageUrl: purplegradient,
    },
];

export const singleBenefit = [
    {
    id: "1",
    title: "My Awesome Project-1",
    // text: "Utilize cutting-edge AI technology to create stunning videos that captivate your audience.",
    // iconUrl: "benefitIcon1", // Replace with actual icon URL
    backgroundUrl: "./src/assets/benefits/card-1.svg", // Replace with actual background URL
    imageUrl: "./src/assets/texttovideo.webp", // Replace with actual image URL
    light: true, // or false based on your requirement
  },
  {
    id: "2",
    title: "My Awesome Project-2",
    // text: "Utilize cutting-edge AI technology to create stunning videos that captivate your audience.",
    // iconUrl: "benefitIcon1", // Replace with actual icon URL
    backgroundUrl: "./src/assets/benefits/card-1.svg", // Replace with actual background URL
    imageUrl: "./src/assets/texttovideo.webp", // Replace with actual image URL
    light: true, // or false based on your requirement
  },
  {
    id: "3",
    title: "My Awesome Project-3",
    // text: "Utilize cutting-edge AI technology to create stunning videos that captivate your audience.",
    // iconUrl: "benefitIcon1", // Replace with actual icon URL
    backgroundUrl: "./src/assets/benefits/card-1.svg", // Replace with actual background URL
    imageUrl: "./src/assets/texttovideo.webp", // Replace with actual image URL
    light: true, // or false based on your requirement
  },


]
  

  

  