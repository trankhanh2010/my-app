import React from "react";

const RecordPerPage = ({
    limit,
    setLimit,
    options,
}) => {
    return (
        <div className="flex items-center">
            <label className="mr-2">Số bản ghi trên mỗi trang:</label>
            <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded"
            >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
            </select>
        </div>
    );
};

export default RecordPerPage;
