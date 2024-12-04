import React from "react";

const OrderDirection = ({
    orderDirection,
    setOrderDirection,
}) => {
    return (
        <div className="flex items-center">
            <label className="mr-2">Hướng:</label>
            <select
                value={orderDirection}
                onChange={(e) => setOrderDirection(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
        </div>
    );
};

export default OrderDirection;
