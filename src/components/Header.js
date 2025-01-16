import React, { useState } from 'react';
import Logo from './header/Logo';
import HamburgerMenu from './header/HamburgerMenu';
import NavMenuAuth from './header/NavMenuAuth';
import NavMenuContainer from './header/NavMenuContainer';
import { useMenuContext } from "../context/MenuContext";

const Header = () => {
  const { selectedMenu, setSelectedMenu } = useMenuContext();
  // Nếu đang chọn Menu thì mở nav nhỏ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(selectedMenu);

  return (
    <header className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-1">
        {/* Logo */}
        <Logo />
        {/* Container for NavMenuAuth and HamburgerMenu */}
        <div className="flex items-center space-x-6">
          <NavMenuAuth />
          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </nav>

      {/* Nav Menu Container */}
      <NavMenuContainer 
      isMobileMenuOpen={isMobileMenuOpen} 
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>
  );
};

export default Header;
