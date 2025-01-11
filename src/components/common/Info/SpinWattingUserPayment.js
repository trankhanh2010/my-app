import React from "react";

const Spinner = ({ mess = 'Đang xử lý' }) => {
    return (
        <div className="animate-pulse">
            <div className="centered-container">
                <div className="spinner"></div>
            </div>
            <div className="text-center text-md font-semibold uppercase mt-1 mb-1 text-blue-700">{mess}</div>
        </div>
    );
};

export default Spinner;
