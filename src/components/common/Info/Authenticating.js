import React from "react";

const Loading = ({ }) => {
    return (
        <>
        <div className="centered-container mt-10">
            <div className="spinner"></div>
        </div>
        <div className="text-center text-md font-semibold uppercase mt-1 mb-1 text-blue-700">đang kiểm tra token...</div>
        </>
    );
};

export default Loading;
