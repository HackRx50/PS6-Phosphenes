import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
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
    react
} from "../assets";

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

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
    "Photo generating",
    "Photo enhance",
    "Seamless Integration",
];

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
        title: "Seamless Integration",
        text: collabText,
    },
    {
        id: "1",
        title: "Smart Automation",
    },
    {
        id: "2",
        title: "Top-notch Security",
    },
];

export const collabApps = [
    {
        id: "0",
        title: "Figma",
        icon: figma,
        width: 26,
        height: 36,
    },
    {
        id: "1",
        title: "postman",
        icon: postman,
        width: 34,
        height: 36,
    },
    {
        id: "2",
        title: "Python",
        icon: python,
        width: 36,
        height: 28,
    },
    {
        id: "3",
        title: "React",
        icon: react,
        width: 34,
        height: 35,
    },
    {
        id: "4",
        title: "expressjs",
        icon: expressjs,
        width: 34,
        height: 34,
    },
    {
        id: "5",
        title: "MongoDB",
        icon: mongo,
        width: 34,
        height: 34,
    },
    {
        id: "6",
        title: "amazon s3",
        icon: amazons3,
        width: 26,
        height: 34,
    },
    {
        id: "7",
        title: "Firebase",
        icon: firebase,
        width: 38,
        height: 32,
    },
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
        description: "AI chatbot, personalized recommendations",
        price: "0",
        features: [
            "An AI chatbot that can understand your queries",
            "Personalized recommendations based on your preferences",
            "Ability to explore the app and its features without any cost",
        ],
    },
    {
        id: "1",
        title: "Premium",
        description: "Advanced AI chatbot, priority support, analytics dashboard",
        price: "9.99",
        features: [
            "An advanced AI chatbot that can understand complex queries",
            "An analytics dashboard to track your conversations",
            "Priority support to solve issues quickly",
        ],
    },
    {
        id: "2",
        title: "Enterprise",
        description: "Custom AI chatbot, advanced analytics, dedicated account",
        price: null,
        features: [
            "An AI chatbot that can understand your queries",
            "Personalized recommendations based on your preferences",
            "Ability to explore the app and its features without any cost",
        ],
    },
    {
        id: "3",
        title: "Enterprise",
        description: "Custom AI chatbot, advanced analytics, dedicated account",
        price: null,
        features: [
            "An AI chatbot that can understand your queries",
            "Personalized recommendations based on your preferences",
            "Ability to explore the app and its features without any cost",
        ],
    },
];

export const benefits = [
    {
        id: "0",
        title: "Multilingual Support",
        text: "Create videos in multiple languages, broadening your reach to a global audience with seamless translation and narration capabilities",
        backgroundUrl: "./src/assets/benefits/card-1.svg",
        iconUrl: benefitIcon1,
        imageUrl: benefitImage2,
    },
    {
        id: "1",
        title: "AI-Driven Content Generation",
        text: "Automatically convert any text—brochures, PDFs, or documents—into engaging, visually compelling videos.",
        backgroundUrl: "./src/assets/benefits/card-2.svg",
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
        light: true,
    },
    {
        id: "2",
        title: "Interactive Quiz Creation",
        text: "Enhance engagement by generating quizzes based on the video content, perfect for educational or training purposes.",
        backgroundUrl: "./src/assets/benefits/card-3.svg",
        iconUrl: benefitIcon3,
        imageUrl: benefitImage2,
    },
    {
        id: "3",
        title: "Advanced Analytics Dashboard",
        text: "Track user interaction with detailed metrics on video engagement, quiz performance, and audience retention.",
        backgroundUrl: "./src/assets/benefits/card-4.svg",
        iconUrl: benefitIcon4,
        imageUrl: benefitImage2,
        light: true,
    },
    {
        id: "4",
        title: "User-Friendly Interface",
        text: "Enjoy a streamlined, intuitive platform that makes video creation accessible for users of all skill levels, from beginners to experts.",
        backgroundUrl: "./src/assets/benefits/card-5.svg",
        iconUrl: benefitIcon1,
        imageUrl: benefitImage2,
    },
    {
        id: "5",
        title: "Voiceover Integration",
        text: "Easily add AI-generated or custom voiceovers to your videos, allowing for a more engaging and personalized viewing experience.",
        backgroundUrl: "./src/assets/benefits/card-6.svg",
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
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