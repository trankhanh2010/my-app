import React from "react";

const TableRow = ({ children, className = "", ...props }) => {
  return (
    <tr className={`odd:bg-white even:bg-gray-50 hover:bg-gray-50 ${className}`} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
