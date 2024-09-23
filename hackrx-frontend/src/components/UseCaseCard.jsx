import React from 'react';
// import './UseCaseCard.css'; // Import your CSS file here


const UseCaseCard = ({ imageSrc, title, description, className }) => {
  return (
    <div
      className={`${
        className || ""
      } flex flex-col items-center bg-gradient-to-tl from-n-1/0 via-n-1/0 to-n-1/15 p-4 backdrop-blur-lg border border-n-1/10 rounded-2xl gap-5  `}
    >
      {/* Image on top */}
      <img
        src={imageSrc}
        alt={title}
        className="w-auto h-36 object-cover rounded-xl mb-1"
      />

      {/* Title */}
      <h3 className="h5 -mb-4 text-center">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-400 text-center px-4">{description}</p>
    </div>
  );
};

export default UseCaseCard;
