import React from "react";

const TotalRecord = ({
    totalItems
}) => {
    return (
        <div className="mt-4 flex items-center">
            <span className="text-sm font-medium">Tổng số bản ghi: {totalItems}</span>
        </div>
    );
};

export default TotalRecord;
