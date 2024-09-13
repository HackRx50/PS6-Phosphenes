import React, { useState } from 'react';
import avatar from "../../assets/avatar/avatar-1.jpg";
import Button from '../Button';

// Sample avatar data (replace these with your actual avatar URLs)
const avatars = [
    { id: 1, src: avatar },
    { id: 2, src: avatar },
    { id: 3, src: avatar },
    { id: 4, src: avatar },
    { id: 5, src: avatar },
    { id: 6, src: avatar },
    { id: 7, src: avatar },
    { id: 8, src: avatar },
    { id: 9, src: avatar },
    { id: 10, src: avatar },
    { id: 11, src: avatar },
    // { id: 12, src: avatar },
];

const AvatarSelection = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleAvatarClick = (avatarId) => {
        setSelectedAvatar(avatarId);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-n-9/40 backdrop-blur border border-n-1/10 text-white h-full">
            <h2 className="text-white mb-4 font-bold text-xl">Select an Avatar</h2>
            
            {/* Avatar grid with scroll */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-n-8 border border-gray-300 rounded max-h-[52rem] overflow-y-auto w-full">
                {avatars.map((avatar) => (
                    <div
                        key={avatar.id}
                        className={`cursor-pointer rounded-full border-4 ${selectedAvatar === avatar.id ? 'border-purple-500' : 'border-transparent'}`}
                        onClick={() => handleAvatarClick(avatar.id)}
                    >
                        <img
                            src={avatar.src}
                            alt={`Avatar ${avatar.id}`}
                            className="w-30 h-30 object-cover rounded-full"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4 flex space-x-4">
                <Button>Select</Button>
            </div>

            {/* Optional: Display selected avatar */}
            {/* {selectedAvatar && (
                <div className="mt-4 text-white">
                    <p>Selected Avatar: {selectedAvatar}</p>
                </div>
            )} */}
        </div>
    );
};

export default AvatarSelection;
