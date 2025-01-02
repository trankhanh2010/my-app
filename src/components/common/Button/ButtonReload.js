import React from "react";

const Button = ({
    handleReload
}) => {
    return (
        <button
            onClick={handleReload}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
            Làm mới
        </button>
    );
};

export default Button;
