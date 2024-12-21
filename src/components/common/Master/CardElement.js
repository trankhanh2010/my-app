import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md mt-1 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
