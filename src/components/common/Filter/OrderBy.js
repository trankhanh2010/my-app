import React from "react";
import Select from "react-select";

const OrderBy = ({ orderBy, setOrderBy, options }) => {
    const handleChange = (selectedOption) => {
        setOrderBy(selectedOption.value); // Cập nhật giá trị của orderBy khi chọn
    };

    return (
        <div className="flex items-center">
            <label className="mr-2">Sắp xếp theo:</label>
            <Select
                value={options.find((option) => option.value === orderBy)} // Set giá trị hiện tại
                onChange={handleChange} // Xử lý sự kiện thay đổi
                options={options} // Các tùy chọn cho select
                className="w-48" // Thêm lớp CSS để điều chỉnh chiều rộng của select
            />
        </div>
    );
};

export default OrderBy;
