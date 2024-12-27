import React, { useEffect, useState } from "react";

const PaymentSuccess = () => {

  return (
    <div className="flex justify-center items-center">
        <div className="relative w-20 h-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-full h-full text-green-500 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
    </div>
  );
};

export default PaymentSuccess;
