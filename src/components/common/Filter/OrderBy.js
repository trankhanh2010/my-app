import React from "react";
import Select from "react-select";

const OrderBy = ({ orderBy, setOrderBy, options }) => {
    const handleChange = (selectedOption) => {
        setOrderBy(selectedOption.value); // Cập nhật giá trị của orderBy khi chọn
    };

    return (
        <div className="flex items-start">
            <label className="mr-2">Sắp xếp theo:</label>
            <Select
                value={options.find((option) => option.value === orderBy)} // Set giá trị hiện tại
                onChange={handleChange} // Xử lý sự kiện thay đổi
                options={options} // Các tùy chọn cho select
                className="w-full" // Thêm lớp CSS để điều chỉnh chiều rộng của select
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 200 }) }} // Đặt z index cao hơn các phần khác để k bị mất khi scroll
            />
        </div>
    );
};

export default OrderBy;
