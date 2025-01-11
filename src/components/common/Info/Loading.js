import React from "react";

const Loading = ({ }) => {
    return (
        <div className="centered-container flex flex-col animate-pulse">
            <div className="spinner"></div>
            <div className="block text-center text-md font-semibold uppercase mt-1 mb-1 text-blue-700">đang xử lý...</div>
        </div>
    );
};

export default Loading;
