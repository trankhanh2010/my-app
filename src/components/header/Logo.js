import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <h1 className="text-2xl font-bold tracking-wide">
    <Link to="/home" className="hover:text-gray-200">
      <img 
        src="\image\logo\logo-bvxa-with-text.PNG"
        alt="Logo" 
        className="h-10 w-auto object-contain mr-2" 
      />
    </Link>
  </h1>
);

export default Logo;
