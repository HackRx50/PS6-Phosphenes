import React from 'react';
import loadingGif from '../assets/loader.png'; // Adjust the path to your GIF file
import './loader.css'

const LoadingPopup = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-6 rounded-lg">
        {/* Replace the text with an image displaying the GIF */}
        {/* <img src={} alt="Loading..." className="loader" /> */}
        <div className="loader w-20 h-20"></div>
      </div>
    </div>
  );
};

export default LoadingPopup;
