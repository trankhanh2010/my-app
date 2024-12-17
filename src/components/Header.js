import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from "./common/Button/ButtonLogout";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo hoặc Tiêu đề */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-gray-200">My React App</Link>
        </h1>

        {/* Menu điều hướng */}
        <ul className="flex items-center space-x-6 text-sm font-medium relative">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>

          {/* Dropdown Giường Bệnh */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-gray-300 flex items-center"
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
              <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link
                    to="/bed"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Buồng bệnh
                  </Link>
                </li>
                
              </ul>
            )}
          </li>

          <li>
            <Link to="/test-service-req-list" className="hover:text-gray-300">Viện Phí</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">Đăng Nhập</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
