import React, { useState } from 'react';
import Logo from './header/Logo';
import HamburgerMenu from './header/HamburgerMenu';
import NavMenu from './header/NavMenu';
import NavMenuAuth from './header/NavMenuAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Logo />
        {/* Container for NavMenuAuth and HamburgerMenu */}
        <div className="flex items-center space-x-6">
          {/* Nút đăng nhập đăng xuất */}
          <NavMenuAuth />

          {/* Hamburger Icon */}
          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </nav>

      {/* Nav Menu */}
      <NavMenu isMobileMenuOpen={isMobileMenuOpen} />
    </header>
  );
};

export default Header;
