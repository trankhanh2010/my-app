import React from "react";

const Search = ({
    keyword,
    setKeyword,
    label,
    onFocus,
}) => {
    return (
        <input
            className="p-2 border rounded"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật giá trị keyword
            onFocus={onFocus}
            placeholder={`${label ? label : "Nhập từ khóa tìm kiếm..."}`}
        />
    );
};

export default Search;
