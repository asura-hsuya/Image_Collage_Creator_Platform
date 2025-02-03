import React, { useState } from 'react';

function CustomTemplate({ images = [], width, height, ratio }) {
  // Ensure positions are initialized correctly if images is empty or undefined
  const [positions, setPositions] = useState(
    images.length > 0 ? images.map(() => ({ x: 0, y: 0 })) : [] // Initialize positions only if images is not empty
  );
  const [clickedIndex, setClickedIndex] = useState(null); // Index of the clicked image

  // Handle click on the div to move the image
  const handleDivClick = (e) => {
    // Get the position of the click inside the div
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // Calculate X position relative to the div
    const y = e.clientY - rect.top; // Calculate Y position relative to the div

    // Ensure the image stays inside the container (restrict movement within the div)
    const maxX = rect.width - width;
    const maxY = rect.height - height;

    const clampedX = Math.min(Math.max(0, x), maxX); // Restrict X within bounds
    const clampedY = Math.min(Math.max(0, y), maxY); // Restrict Y within bounds

    // Update the position for the clicked image
    if (clickedIndex !== null) {
      setPositions((prevPositions) => {
        const updatedPositions = [...prevPositions];
        updatedPositions[clickedIndex] = { x: clampedX, y: clampedY }; // Set the position for the clicked image
        return updatedPositions;
      });
    }
  };

  // Handle click on image to activate it and start moving
  const handleImageClick = (index, e) => {
    e.stopPropagation(); // Prevent triggering the div click handler
    // Toggle selection: if already selected, deselect; if not selected, select
    setClickedIndex(clickedIndex === index ? null : index);
  };

  return (
    <div
      style={{
        padding: `${ratio}px`,
        gap: `${ratio}px`,
        position: 'relative', // Ensure absolute positioning works for child images
      }}
      className="grid-container grid grid-cols-2 bg-white w-1/2 min-h-[70vh] h-fit"
      onClick={handleDivClick} // Update the position on div click
    >
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`selected-image-${index}`}
          className="object-contain absolute cursor-pointer"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            // Move each image based on its individual position
            left: positions[index] ? `${positions[index].x}px` : '0px', // Safely access positions[index]
            top: positions[index] ? `${positions[index].y}px` : '0px', // Safely access positions[index]
            zIndex: clickedIndex === index ? 2 : 0, // Bring clicked image to front
            transition: 'all 0.2s ease-out', // Smooth transition for movement
            boxShadow: clickedIndex === index 
              ? '0px 0px 15px 5px rgba(255, 99, 71, 0.6), 0px 0px 25px 6px rgba(0, 0, 0, 0.3)' // Light red and black shadow mix
              : 'none',
            border: clickedIndex === index ? '3px solid rgba(255, 99, 71, 0.6)' : 'none', // Light red border
          }}
          onClick={(e) => handleImageClick(index, e)} // Handle image click to set the image as active
        />
      ))}
    </div>
  );
}

export default CustomTemplate;







