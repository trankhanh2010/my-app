import React from "react";

const ButtonAddNew = ({
    handleAddNew
}) => {
    return (
        <button
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
            Thêm mới
        </button>
    );
};

export default ButtonAddNew;
