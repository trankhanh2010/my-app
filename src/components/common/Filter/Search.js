import React from "react";

const Search = ({
    keyword,
    setKeyword,
    label,
}) => {
    return (
        <input
            className="p-1 border border-gray-300 rounded"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật giá trị keyword
            placeholder={`${label ? label : "Nhập từ khóa tìm kiếm..."}`}
        />
    );
};

export default Search;
