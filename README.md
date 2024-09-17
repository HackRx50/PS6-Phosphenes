<table style="border-collapse: collapse; border: none;">
  <tr>
    <td><h1>AURA.ai</h1></td>
    <td><img src="https://hackerx-winner.vercel.app/assets/logo-aura-IEnDMhwM.png" height="70px" width="50px" alt="Aura.ai"></td>
  </tr>
</table>

---

AURA.ai is a cutting-edge AI platform designed to **automate video creation** from text-based inputs such as brochures or PDFs. It seamlessly integrates **interactive quizzes** and provides detailed **analytics** to enhance user engagement. Perfect for **education, corporate training,** and **HR assessments**, AURA.ai offers **multilingual support** and real-time feedback, transforming the way content is delivered.

---

## **Key Features**

- **Text to Video Creation**  
   Convert text documents into dynamic videos with AI-driven summarization and voice-over.

- **Quiz Integration**  
   Automatically generate quizzes after videos to assess user comprehension.

- **Analytics Dashboard**  
   In-depth user engagement tracking with viewership data, quiz scores, and performance heatmaps.

- **Multilingual Support**  
   Generate videos in **over 10 languages**, making your content globally accessible.

- **Collaboration Tools**  
   Seamlessly collaborate on content creation, ideal for corporate teams and educational institutions.

---

## **Technologies Used**

### **Frontend:**
- **React.Js**
- **Recharts**  
- **Tailwind CSS**

### **Backend:**
- **Python**  
- **FastAPI**  
- **Node.Js**  
- **Express.Js**

### **Cloud Service Providers:**
- **Firebase** - (real-time database and authentication)  
- **DigitalOcean** - (server and database hosting)

### **Hosting Platforms:**
- **Vercel** - (Frontend deployment)  
- **Railway** - (Backend hosting)

### **Industrial Add-Ons:**
- **Husky** - (Enforces code quality pre-commit hooks)  
- **Clarity** - (Error recording and monitoring)  
- **Sentry** - (Real-time error detection and logging)  
- **Playwright** - (End-to-end UI testing)

### **NLP & ML:**
- **BART** - (Text summarization)  
- **Stable Diffusion** - (Image generation)  
- **Tesseract OCR** - (Optical Character Recognition)  
- **Gemini 1.5 Flash**  
- **TensorFlow** & **PyTorch** - (For AI model training)

### **Tools & Others:**
- **Postman** - (API testing)  
- **Git/GitHub** - (Version control)  
- **Kaggle** - (Datasets & model training)  
- **CI/CD Pipelines** - (For automated deployments)  
- **Pexels** - (For media assets)  
- **Transformers** - (For NLP tasks)  
- **pdfplumber**, **pydub**, **moviepy** - (For PDF processing, audio, and video generation)

---

## **Getting Started with AURA.ai**

### **1. Clone the Repository:**
```bash
git clone [https://github.com/your-repo-url](https://github.com/happyrao78/Phosphenes-HackRx-5.0.git)
```

### **2. Move to the Backend Directory:**
```bash
cd hackrx-backend
```

### **3. Setup the Environment Variables:**
Create a `.env` file in the root directory and add your API keys.
```env
GEMINI_API_KEY=your_gemini_api_key
IMG_API=your_api
```

### **4. Set up Firebase:**
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Enable Google authentication in the Firebase Authentication section.
- Obtain the Firebase configuration settings (API key, Auth domain, Project ID, etc.)

### **5. Install Python Libraries & Run the Backend Server:**
```bash
pip install -r requirements.txt
```
```bash
uvicorn server:app --reload
```

### **6. Move to the Frontend Directory:**
```bash
cd hackrx-frontend
```

### **7. Install Required Dependencies & Run the Script:**
```bash
npm install
```

### **8. Run the Development Server:**
```bash
npm run dev
```

---
