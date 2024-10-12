import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Benefits from './components/Features';
import Collaboration from './components/TechStack';
import Roadmap from './components/Enhancements';

import GetStarted from './components/GetStarted';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Customisation from './components/Customisation';
import Preview from './components/Preview';
import OverviewPage from './components/Apages/OverviewPage';
import Sidebar from './components/Apages/components/Sidebar';
import VideoAnalytics from './components/Apages/VideoAnalytics';
import QuizAnalyticsPage from './components/Apages/QuizAnalyticsPage';
import { GradientLight } from './components/design/Features';
import Header from './components/Header';
import Confetti from 'react-confetti';
import VideoAnalyticsPage from './components/Apages/VideoAnalyticsPage';
import Pricing from "./components/Pricing-Plan";
import HowItWorks from './components/HowItWorks';
import UseCaseGrid from './components/UseCase';
import Impact from './components/Impact';
import FeedBack from './components/FeedBack';
import Projects from './components/Projects';
import Team from './components/Team';
import Faq from './components/Faq';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('showConfetti') === 'true') {
      setShowConfetti(true);
      // Hide confetti after 5 seconds (adjust if needed)
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);  // Cleanup timer on component unmount
    }
  }, [location]);

  return (
    <>
      {showConfetti && <Confetti />}
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Benefits />
              {/* <Collaboration /> */}
              <HowItWorks/>
              <UseCaseGrid/>
              {/* <Roadmap /> */}
              <Impact/>
              <FeedBack/>
              <Pricing />
              <Team/>
              <Faq/>
              <Contact/>
              {/* <Services /> */}
            </>
          } />
          <Route path="/getstarted" element={<><Header /><GetStarted /></>} />
          <Route path="/quiz" element={<><Header /><Quiz /></>} />
          <Route path="/login" element={<><Header /><Login /></>} />
          <Route path="/customisation" element={<><Header /><Customisation /></>} />
          <Route path="/preview" element={<><Header /><Preview /></>} />
          <Route path="/overview" element={<><Header /><OverviewPage /></>} />
          <Route path="/quizanalytics" element={<><Header /><QuizAnalyticsPage /></>} />
          <Route path="/videoanalytics" element={<><Header /><VideoAnalyticsPage /></>} />
          <Route path="/projects" element={<><Header /><Projects/></>} />
          <Route path="/privacypolicy" element={<><Header /><PrivacyPolicy/></>} />
          
        </Routes>
      </Layout>
    </>
  );
};

export default App;