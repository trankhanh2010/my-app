import React from 'react';

const YourComponent = ({ onClose, zoom, setZoom, title="" }) => {
    return (
        <div className='sticky top-0 z-50 w-full min-h-8 h-auto bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md'>
            <div className="absolute top-1 left-2 text-sm font-semibold">
            {title}
            </div>
            <button
                onClick={onClose}
                className="absolute top-1 right-2  hover:text-red-600 hover:bg-gray-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <button
                onClick={() => { setZoom(!zoom) }}
                className="absolute top-1 right-8  hover:text-blue-600 hover:bg-gray-100"
            >
                {zoom ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" transform="rotate(180)">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4V7C15 8.10457 15.8954 9 17 9H20M9 4V7C9 8.10457 8.10457 9 7 9H4M15 20V17C15 15.8954 15 15 17 15H20M9 20V17C9 15.8954 8.10457 15 7 15H4" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" transform="rotate(180)">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15V18C4 19.1046 4.89543 20 6 20H9M15.2173 20H18C19.1046 20 20 19.1046 20 18V15M20 9V6C20 4.89543 19.1046 4 18 4H15M4 9V6C4 4.89543 4.89543 4 6 4H9" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default YourComponent;
