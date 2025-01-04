import React from "react";

const ArrowIcon = ({ isRotated = false, size = 4, className = "" }) => {
  return (
    <svg
      className={`w-${size} h-${size} transition-transform ${
        isRotated ? "rotate-180" : ""
      } ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default ArrowIcon;
