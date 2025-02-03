import React, { useRef, useState } from 'react';
import Album from '../assets/album.svg';
import Template from './template.jsx';
import Template3 from './template3.jsx';
import Custom from './costumtemplate.jsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function Machine() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const collageRef = useRef(null);
  
  // Handle file selection via the file input
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    handleNewFiles(files);
  };

  // Handle new files (both from input and drop)
  const handleNewFiles = async (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const imageDataArray = await Promise.all(
      imageFiles.map(async (file) => {
        // Convert file to base64
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              data: reader.result,
              name: file.name
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    setImages(prevImages => [...prevImages, ...imageDataArray.map(img => img.data)]);
    alert('Images have been uploaded');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleNewFiles(files);
  };

  const handleDropAreaClick = () => {
    fileInputRef.current.click();
  };

  // Save images to local storage using base64 data
  const saveImagesLocally = () => {
    try {
      localStorage.setItem('saved_images', JSON.stringify(images));
      alert('Images saved locally!');
    } catch (error) {
      console.error('Error saving images:', error);
      alert('Error saving images.');
    }
  };

  // Import images from local storage
  const importImagesLocally = () => {
    try {
      const storedImages = localStorage.getItem('saved_images');
      if (storedImages) {
        const parsedImages = JSON.parse(storedImages);
        setImages(parsedImages);
        alert('Images imported from local storage!');
      } else {
        alert('No saved images found.');
      }
    } catch (error) {
      console.error('Error importing images:', error);
      alert('Error importing images.');
    }
  };

  // Download functions for different formats and qualities
  const downloadCollage = async (format, quality) => {
    if (!collageRef.current) return;

    const scale = {
      low: 1,
      medium: 2,
      high: 3
    }[quality];

    try {
      const canvas = await html2canvas(collageRef.current, {
        scale: scale,
        useCORS: true,
        allowTaint: true
      });

      if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save(collage-`${quality}`-quality.pdf);
      } else {
        const link = document.createElement('a');
        link.download =` collage-${quality}-quality.${format}`;
        link.href = canvas.toDataURL(images/`${format}`, format === 'jpg' ? 0.92 : 1.0);
        link.click();
      }
    } catch (error) {
      console.error('Error downloading collage:', error);
      alert('Error downloading collage. Please try again.');
    }
  };

  return (
    <>
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
        <div className="babies w-1/3 border-2 border-white border-dotted h-32 rounded-xl flex justify-center items-center gap-4 flex-wrap">
          <button
            className="bg-blue-500 text-white rounded-lg font-bold px-3 py-2 text-sm"
            onClick={saveImagesLocally}
          >
            Save Images
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg font-bold px-3 py-2 text-sm"
            onClick={importImagesLocally}
          >
            Import Images
          </button>
          <div className="w-full flex justify-center gap-2">
            <select
              className="bg-blue-500 text-white rounded-lg font-bold px-3 py-2 text-sm"
              onChange={(e) => {
                const [format, quality] = e.target.value.split('-');
                downloadCollage(format, quality);
              }}
            >
              <option value="">Download Collage</option>
              <optgroup label="JPG">
                <option value="jpg-low">JPG - Low Quality</option>
                <option value="jpg-medium">JPG - Medium Quality</option>
                <option value="jpg-high">JPG - High Quality</option>
              </optgroup>
              <optgroup label="PNG">
                <option value="png-low">PNG - Low Quality</option>
                <option value="png-medium">PNG - Medium Quality</option>
                <option value="png-high">PNG - High Quality</option>
              </optgroup>
              <optgroup label="PDF">
                <option value="pdf-low">PDF - Low Quality</option>
                <option value="pdf-medium">PDF - Medium Quality</option>
                <option value="pdf-high">PDF - High Quality</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap my-7">
        {images.map((imageUrl, index) => (
          <img
            className="object-cover w-[100px] h-[100px] rounded-3xl brightness-50"
            key={index}
            src={imageUrl}
            alt={`selected-images-${index}`}
          />
        ))}
      </div>

      <div className="collage min-h-screen bg-[#272729] p-7 flex-col flex gap-10">
        <div className="finalproduct flex justify-center" ref={collageRef}>
          {images.length === 4 && (
            <Template images={images} width={300} height={300} ratio={8} />
          )}
          {images.length === 9 && (
            <Template3 images={images} width={200} height={200} ratio={8} />
          )}
          {images.length > 0 && images.length !== 4 && images.length !== 9 && (
            <Custom images={images} width={150} height={150} ratio={1.5} />
          )}
        </div>

        <div className="template">
          {images.length === 4 && (
            <Template images={images} width={40} height={40} ratio={1.5} />
          )}
          {images.length === 9 && (
            <Template3 images={images} width={40} height={40} ratio={1.5} />
          )}
        </div>
      </div>
    </>
  );
}

export default Machine;