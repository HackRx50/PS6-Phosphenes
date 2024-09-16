# AURA.ai

AURA.ai is a cutting-edge AI platform designed to automate video creation from text-based inputs such as brochures or PDFs. It seamlessly integrates interactive quizzes and provides detailed analytics to enhance user engagement. Ideal for education, corporate training, and HR assessments, the system offers multilingual support and real-time feedback, revolutionizing content delivery.

## Features

- **Text to Video Creation**: Convert text documents into dynamic videos with AI-driven summarization and voice-over.
- **Quiz Integration**: Automatically generate quizzes following videos to assess comprehension.
- **Analytics Dashboard**: In-depth user engagement tracking, including viewership, quiz scores, and performance heatmaps.
- **Multilingual Support**: Generate videos in over 10 languages for global scalability.
- **Collaboration Tools**: Streamline team-based content creation, perfect for corporate and educational teams.

## Technologies Used:

### Frontend
- **React.js**
- **Recharts**
- **Tailwind CSS**

### Backend
- **Python**
- **FastAPI**
- **Node.js**
- **Express.js**

### Cloud Service Providers
- **Firebase** (for real-time database and authentication)
- **DigitalOcean** (for server and database hosting)

### Hosting
- **Vercel** (for frontend deployment)
- **Railway** (for backend hosting)

### Industrial Add-Ons
- **Husky** (enforce code quality pre-commit hooks)
- **Clarity** (error recording and monitoring)
- **Sentry** (real-time error detection and logging)
- **Playwright** (end-to-end testing for UI)

### NLP & ML
- **BART** (text summarization)
- **Stable Diffusion** (image generation)
- **Tesseract OCR** (optical character recognition)
- **Gemini 1.5 Flash**
- **TensorFlow & PyTorch** (for AI model training and execution)

### Tools & Others
- **Postman** (API testing)
- **Git/GitHub** (version control)
- **Kaggle** (datasets and model training)
- **CI/CD Pipelines** (for automated deployments)
- **Pexels** (for media assets)
- **Transformers** (for NLP tasks)
- **pdfplumber**, **pydub**, **moviepy** (for PDF processing, audio, and video generation)

## Unique Selling Points (USPs)

- **Multilingual Videos**: Automatically generate videos in 10+ languages with accurate voice-over.
- **Hands-Free Navigation**: Voice-activated platform controls for enhanced accessibility.
- **Seamless Sharing**: Download, embed, or share videos easily with embedded analytics.
- **Gamified Learning**: Leaderboards, badges, and scores for interactive learning experiences.
- **Adaptive Content**: Customize videos based on user preferences and performance metrics.

## Target Sectors

- **Education & EdTech**: Interactive video classes and quizzes for enhanced learning.
- **Corporate Training & E-learning**: Scalable training solutions with real-time progress tracking.
- **HR & Recruitment**: AI-driven interview analysis and onboarding training videos.

## Future Enhancements

- **AI Avatars**: Lifelike avatars for video explanations with dynamic facial expressions.
- **Virtual Reality Support**: Immersive VR learning experiences.
- **AI-Driven Interview Analytics**: Automated interview conducting with analytics on candidate performance.
  
## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/your-repo-url](https://github.com/happyrao78/Phosphenes-HackRx-5.0.git)
   ```
2. **Move to the Backend Directory**:
   ```bash
   cd hackrx-backend
   ```
3. **Setup the Environment Variables**:
   Create a `.env` file in the server directory and add your NEWSAPI key, and PORT for local host.
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   IMG_API=your_video_pexels_api
   ```
4. **Set up Firebase**:

    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Google authentication in the Firebase Authentication section.
    - Obtain the Firebase configuration settings (API key, Auth domain, Project ID, etc.) 
   
5. **Install the python Libraries & Run the backend Server**:
   ```bash
   pip install -r requirements.txt
   ```
   ```bash
   uvicorn server:app --reload
   ```
6. **Shift to the Frontend Directory**:
   ```bash
   cd hackrx-frontend
   ```
7. **Install the Required Dependencies & Run the Script**:
   ```bash
   npm install
   ```
8. **Setup the Environment Varibles**
   ```bash
   npm run dev
   ```
   
   

