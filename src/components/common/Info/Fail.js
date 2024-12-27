import React, { useEffect, useState } from "react";

const PaymentFailure = () => {

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-20 h-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-full h-full text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default PaymentFailure;
