import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <h1 className="text-2xl font-bold tracking-wide">
    <Link to="/home" className="hover:text-gray-200">Trang chủ</Link>
  </h1>
);

export default Logo;
