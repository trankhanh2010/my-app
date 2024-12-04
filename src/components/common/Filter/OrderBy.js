import React from "react";

const OrderBy = ({
    orderBy,
    setOrderBy,
}) => {
    return (
        <div className="flex items-center">
            <label className="mr-2">Sắp xếp theo:</label>
            <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="bedCode">Mã giường</option>
                <option value="bedName">Tên giường</option>
                <option value="createTime">Ngày tạo</option>
                <option value="modifyTime">Ngày sửa</option>
            </select>
        </div>
    );
};

export default OrderBy;
