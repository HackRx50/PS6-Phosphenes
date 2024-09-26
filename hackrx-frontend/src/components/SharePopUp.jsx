import React, { useState } from "react";
import { Gradient } from "./design/Services";
import Button from "./Button";

const SharePopup = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [accessLevel, setAccessLevel] = useState("View");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAccessChange = (e) => {
        setAccessLevel(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the logic to share the project with the provided email and access level
        console.log("Sharing with:", email, accessLevel);
        // Close the popup after submitting
        onClose();
    };

    return (
        
        <div className="fixed inset-0 z-0 flex items-center justify-center bg-n-9 bg-opacity-100 mt-72">
       
            <div className="overflow-hidden border-n-1/10  max-w-md w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-n-8 backdrop-blur border ">
            <Gradient />
                <h2 className="text-xl font-bold mb-4">Share Project</h2>
                <form onSubmit={handleSubmit}>
                
                    <div className="mb-4">
                    
                        <label className="block text-sm font-semibold mb-2">
                            Email Address
                        </label>
                        
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Access Level
                        </label>
                        <select
                            value={accessLevel}
                            onChange={handleAccessChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="View">View</option>
                            <option value="Edit">Edit</option>
                            {/* <option value="Comment">Comment</option> */}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 "
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="px-4 py-2">
                            Share
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SharePopup;
