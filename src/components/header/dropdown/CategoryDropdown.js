import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from "../ArrowIcon";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <li className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex li-nav-header"
      >
        Danh mục
        <ArrowIcon isRotated={isDropdownOpen}/>     

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
