import React, { useState } from 'react';
import Logo from './header/Logo';
import HamburgerMenu from './header/HamburgerMenu';
import NavMenuAuth from './header/NavMenuAuth';
import NavMenuContainer from './header/NavMenuContainer';
import { useMenuContext } from "../context/MenuContext";
import { useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import routes from "../../src/routes"; 

const Header = () => {
  const { selectedMenu, setSelectedMenu } = useMenuContext();
  const location = useLocation();
  // Lấy danh sách route dành cho khách
  const urlGuest = routes.filter(route => route.public).map(route => route.path);

  const { authToken } = useAuth();
  const currentPath = location.pathname;
  // Khách là khi không có token và vào trang dành cho khách
  const isGuest = urlGuest.includes(currentPath) && !authToken
  // Nếu đang chọn Menu thì mở nav nhỏ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(selectedMenu);

  return (
    <header className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <Logo />
        {/* Container for NavMenuAuth and HamburgerMenu */}
        {!isGuest && <div className="flex items-center space-x-6">
          <NavMenuAuth />
          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>}
      </nav>

      {/* Nav Menu Container */}
      {!isGuest && <NavMenuContainer 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />}
    </header>
  );
};

export default Header;
