import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from "./ArrowIcon";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <li className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex li-nav-header"
      >
        Giao dịch
        <ArrowIcon isRotated={isDropdownOpen}/>     

      </button>
      {isDropdownOpen && (
        <ul className="mt-2 ml-2 bg-transparent whitespace-nowrap">
          <li>
            <Link
              to="/transaction-list"
              className="li-nav-header-category"
            >
              Danh sách giao dịch
            </Link>
          </li>
          <li>
            <Link
              to="/transaction-tam-ung"
              className="li-nav-header-category"
            >
              Tạm ứng
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="li-nav-header-category"
            >
              Thanh toán
            </Link>
          </li>
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
