// Template.jsx
import React from 'react';

function Template({ images, width, height, ratio }) {
  // Adjust height based on the width and the provided ratio

  return (
    <div style={{padding:`${ratio}px`,gap:`${ratio}`}} className="grid-container grid grid-cols-2  bg-white max-w-fit">
      {images.slice(0, 4).map((imageUrl, index) => (
        <img
          className="object-cover"
          key={index}
          src={imageUrl}
          alt={`selected-image-${index}`}
          style={{ width: `${width}px`, height: `${height}px` }} // Apply dynamic styles
        />
      ))}
    </div>
  );
}

export default Template;


  
