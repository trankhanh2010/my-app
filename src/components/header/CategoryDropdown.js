import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <li className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex li-nav-header"
      >
        Danh mục
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isDropdownOpen && (
        <ul className="mt-2 ml-2 bg-transparent whitespace-nowrap">
          <li>
            <Link
              to="/bed"
              className="li-nav-header-category"
            >
              Buồng bệnh
            </Link>
          </li>
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
