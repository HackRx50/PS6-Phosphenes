"use client"
import { curve } from "../assets";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Section from "./Section";
import {  BottomLine } from "./design/Hero";

import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating-box";


import { Gradient } from "./design/Services";

import React, { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { Link } from "react-router-dom";
import LoadingPopup from './Popup'; // Import the LoadingPopup component

const GetStarted = () => {
  const words = ["Text", "Docs", "PDF's", "PPT's"];
  const parallaxRef = useRef(null);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage popup visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [speech, setSpeech] = useState("");

  const handleFileUpload = (files) => {
    if (files && files.length > 0) {
      setFile(files[0]);  // Set the first file from the array
    } else {
      console.error("No files provided.");
    }
  };
  
  

  async function handleGenerateClick(e) {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        const data = await response.json();
        setSpeech(data.speech)
        setLoading(false);
        navigate('/customisation', { state: { filename: data.filename, speech: data.speech, } });
      } else {
        setLoading(false);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Section
      className="pt-[8rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="getstarted"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[4.25rem]">
          <ScrollParallax isAbsolutelyPositioned>
            <Generating className="hidden absolute -left-[4.5rem] top-[11.5rem] bg-n-9/40 backdrop-blur border border-n-1/10 p-5 rounded xl:flex" title={"Make amazing videos"} />
          </ScrollParallax>
          <ScrollParallax isAbsolutelyPositioned>
            <Generating className="hidden absolute -right-[4.5rem] top-[11.5rem] bg-n-9/40 backdrop-blur border border-n-1/10 p-5 rounded xl:flex" title={"AI Video Creation"} />
          </ScrollParallax>
          <h1 className="h2 mb-6">
            The&nbsp;
            <span className="inline-block relative">
              Magic{" "}
              <img
                src={curve}
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-100 xl:-mt-1 scale-y-50 "
                width={504}
                height={10}
                alt="Curve"
              />
            </span>
            &nbsp;Begins Here
          </h1>
        </div>
        <div className="w-full max-w-2xl mx-auto mb-[1rem] min-h-80 border border-neutral-800 rounded-lg sm:h-50">
          <FileUpload onChange={handleFileUpload} />
        </div>
        <button onClick={handleGenerateClick} className="flex justify-center items-center mb-[4rem] mx-auto">
          <Button>
            Generate
          </Button>
        </button>
        {loading && <LoadingPopup />} {/* Display the popup when loading */}
      </div>
      <Gradient />
      <BottomLine />
    </Section>
  );
};

export default GetStarted;
