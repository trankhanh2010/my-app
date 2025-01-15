import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-xl p-4 mt-1 rounded ${className}`}>
      {children}
    </div>
  );
};

export default Card;
