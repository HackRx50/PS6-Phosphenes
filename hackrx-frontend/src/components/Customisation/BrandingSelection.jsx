


"use client";
import React, { useState } from "react";

import Button from "./../../components/Button";
import { FileUpload } from "./../ui/file-upload";
import { Link } from "react-router-dom";

const BrandingSelection = () => {
    const handleFileUpload = (files) => {
        setFiles(files);
        console.log(files);
      };
    return (
        
        <div classname="w-full h-full p-4 bg-n-9/40 backdrop-blur border border-n-1/10 text-white flex flex-col justify-center items-center ">
            <h2 className="text-xl font-bold mb-4 text-center mt-4">Add Branding</h2>
            <h3 className="text-center">Upload logos fonts and more to kickstart your project</h3>
            <div
                className="w-100 min-h-80 border border-neutral-300 rounded-lg sm:h-50 m-4">
                
                <FileUpload onChange={handleFileUpload} />
            </div>

            <Link to="/customisation" className="flex justify-center items-center mb-[4rem]">
                <Button  >
                   Upload
                </Button>
            </Link>

           

        </div>

    )
}

export default BrandingSelection
