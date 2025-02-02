import React, { useRef, useState } from 'react';
import Album from '../assets/album.svg'; // Assuming you have an image asset for the album icon
import Template from './template.jsx'; // Import the Template component
import Template3 from './template3.jsx'; // Import the Template3 component

function Machine() {
  const [images, setImages] = useState([]); // State to hold the images
  const fileInputRef = useRef(null); // Ref to access the file input for drag and drop

  // Handle file selection via the file input
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert file list to array
    const newImages = files.filter((file) => file.type.startsWith('image/')); // Filter only image files

    setImages((prevImages) => [
      ...prevImages,
      ...newImages.map((file) => URL.createObjectURL(file)), // Convert file to object URL
    ]);

    alert('Images have been uploaded');
  };

  // Handle the drag-over event
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior for drag over
  };

  // Handle drop event to accept images dropped onto the area
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files); // Get files dropped by user
    const newImages = files.filter((file) => file.type.startsWith('image/')); // Filter only image files

    setImages((prevImages) => [
      ...prevImages,
      ...newImages.map((file) => URL.createObjectURL(file)), // Convert file to object URL
    ]);

    alert('Images have been uploaded');
  };

  // Trigger file input click on area click
  const handleDropAreaClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* File selection and drag/drop area */}
      <div className="flex flex-wrap gap-5">
        <div
          className="drp w-1/3 border-2 bg-[#2c2e30] border-white h-32 justify-center items-center rounded-xl border-dotted flex gap-7"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropAreaClick}
        >
          <img
            src={Album}
            className="w-20 h-20 bg-[#3a3c3f] p-4 rounded-3xl"
            alt="Album Icon"
          />
          <button className="bg-blue-500 text-white rounded-lg font-bold px-3 py-2 text-sm">
            Select photo(s)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="hidden"
          />
        </div>
        <div className="babies w-1/3 border-2 border-white border-dotted h-32 rounded-xl"></div>
      </div>

      {/* Images Display Section */}
      <div className="flex gap-3 flex-wrap my-7">
        {images.map((imageUrl, index) => (
          <img
            className="object-cover w-[100px] h-[100px] rounded-3xl brightness-50"
            key={index}
            src={imageUrl}
            alt={`selected-image-${index}`}
          />
        ))}
      </div>

      {/* Conditional Rendering of Templates */}
      <div className="collage min-h-screen bg-[#272729] p-7 flex-col flex gap-10">
        <div className="finalproduct flex justify-center">
          {/* Conditionally render Template or Template3 based on the number of images */}
          {images.length === 4 && (
            <Template images={images} width={300} height={300} ratio={8} />
          )}
          {images.length === 9 && (
            <Template3 images={images} width={200} height={200} ratio={8} />
          )}
        </div>

        <div className="template">
          {/* You can include additional template rendering logic if needed */}
         
          {images.length === 4 &&(
            <Template images={images} width={40} height={40} ratio={1.5} />
          )}
          {images.length === 9 &&(
            <Template3 images={images} width={40} height={40} ratio={1.5} />
          )}
        </div>
      </div>
    </>
  );
}

export default Machine;





