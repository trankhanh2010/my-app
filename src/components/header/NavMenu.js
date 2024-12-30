import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonLogout from './../common/Button/ButtonLogout';
import ButtonLogin from './../common/Button/ButtonLogin';
import Dropdown from './Dropdown';

const NavMenu = ({ isMobileMenuOpen }) => (
  <ul
    className={`${
      isMobileMenuOpen ? "block" : "hidden"
    } md:flex items-center space-x-6 text-sm font-medium absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-blue-700 md:bg-transparent md:flex-row flex-col md:space-y-0 space-y-4 z-10 pb-2`}
  >
    <li>
      <Link to="/home" className="hover:text-gray-300 px-4 py-2 block md:inline">
        Trang chủ
      </Link>
    </li>

    {/* Dropdown */}
    <Dropdown />

    <li>
      <Link
        to="/test-service-req-list"
        className="hover:text-gray-300 px-4 py-2 block md:inline"
      >
        Viện Phí
      </Link>
    </li>
    <li>
      <Link
        to="/test-service-req-list-no-login"
        className="hover:text-gray-300 px-4 py-2 block md:inline"
      >
        Viện Phí (không đăng nhập)
      </Link>
    </li>
    <li>
      <ButtonLogin />
    </li>
    <li>
      <ButtonLogout />
    </li>
  </ul>
);

export default NavMenu;
