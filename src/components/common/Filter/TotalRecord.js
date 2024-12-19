import React from "react";

const TotalRecord = ({
    totalItems
}) => {
    return (
        <div className="mt-4 flex items-center">
            <span className="">Tổng số bản ghi: {totalItems}</span>
        </div>
    );
};

export default TotalRecord;
