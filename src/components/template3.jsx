import React from 'react'

function template3({ images, width, height, ratio }) {
    // Adjust height based on the width and the provided ratio
    const computedHeight = width / ratio; // This will adjust the height according to the given ratio

    return (
        <div style={{ padding: `${ratio}px`, gap: `${ratio}px` }} className="grid-container grid grid-cols-3  bg-white max-w-fit">
            {images.slice(0, 9).map((imageUrl, index) => (
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

export default template3
