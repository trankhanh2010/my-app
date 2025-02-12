import React, { useState } from 'react';

const ImageWithLightbox = ({ src, alt, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);

  return (
    <>
      {/* Ảnh thu nhỏ */}
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer w-full h-auto ${className}`}
        onClick={openLightbox}
      />

      {/* Lightbox toàn màn hình */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <img src={src} alt={alt} className="max-w-full max-h-full" />
          <button
            className="absolute top-5 right-5 text-white text-2xl font-bold"
            onClick={closeLightbox}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default ImageWithLightbox;

