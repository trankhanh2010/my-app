import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <h1 className="text-2xl font-bold tracking-wide">
    <Link to="/" className="hover:text-gray-200">My React App</Link>
  </h1>
);

export default Logo;
