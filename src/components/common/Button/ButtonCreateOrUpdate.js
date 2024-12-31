import React from "react";

const ButtonCreateOrUpdate = ({
    recordDetails,
    errors,
    errorUniqueCode,
}) => {
    return (
        <button
            disabled={Object.keys(errors).length > 0 || errorUniqueCode}
            type="submit"
            className={`py-2 px-4 rounded w-full
            ${recordDetails.id ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}
            text-white 
            ${Object.keys(errors).length > 0 || errorUniqueCode ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
            {recordDetails.id ? "Cập nhật" : "Thêm mới"}  {/* Hiển thị "Cập nhật" nếu có id, nếu không thì "Thêm mới" */}
        </button>
    );
};

export default ButtonCreateOrUpdate;
