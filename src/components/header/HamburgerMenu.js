import React from 'react';

const HamburgerMenu = ({ isOpen, toggleMenu }) => (
  <button
    className="md:hidden text-white focus:outline-none block"
    onClick={toggleMenu}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
      />
    </svg>
  </button>
);

export default HamburgerMenu;
