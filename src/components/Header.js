import React, { useState } from 'react';
import Logo from './header/Logo';
import HamburgerMenu from './header/HamburgerMenu';
import NavMenu from './header/NavMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Logo />

        {/* Hamburger Icon */}
        <HamburgerMenu
          isOpen={isMobileMenuOpen}
          toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Nav Menu */}
        <NavMenu isMobileMenuOpen={isMobileMenuOpen} />
      </nav>
    </header>
  );
};

export default Header;
