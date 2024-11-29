// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-semibold">My React App</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/bed" className="hover:text-gray-300">Giường Bệnh</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
