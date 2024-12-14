import React, { useState } from "react";

const SearchTestServiceReqTypeListTable = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <input
        type="text"
        placeholder="Tìm kiếm theo tên dịch vụ hoặc mã dịch vụ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-l border-t border-r border-gray-300 p-2 w-full"
    />
    );
};

export default SearchTestServiceReqTypeListTable;
