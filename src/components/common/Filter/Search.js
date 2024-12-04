import React from "react";

const Search = ({
    keyword,
    setKeyword,
}) => {
    return (
        <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật giá trị keyword
            placeholder="Nhập từ khóa tìm kiếm"
        />
    );
};

export default Search;
