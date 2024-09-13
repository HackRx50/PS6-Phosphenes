import React from 'react';
import PropTypes from 'prop-types';

const SceneThumbnail = ({ scene, current, onClick }) => {
    return (
        <div 
            onClick={() => onClick(scene.id)} 
            className={`relative w-20 h-12 cursor-pointer mx-1 ${current ? 'border-4 border-blue-500' : 'border-2 border-gray-300'} rounded-md overflow-hidden`}>
            {/* Thumbnail Image */}
            <img 
                src={scene.thumbnail} 
                alt={`Scene ${scene.id}`} 
                className="w-full h-full object-cover" 
            />
            {/* Scene Number Overlay */}
            <span className="absolute bottom-1 right-1 text-white bg-black bg-opacity-60 rounded-full px-1 text-xs">
                {scene.id}
            </span>
        </div>
    );
};

// PropTypes to ensure data type integrity
SceneThumbnail.propTypes = {
    scene: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    current: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

SceneThumbnail.defaultProps = {
    current: false,
};

export default SceneThumbnail;
