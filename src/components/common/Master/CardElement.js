import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
