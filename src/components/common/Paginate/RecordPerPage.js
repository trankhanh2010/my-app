import React from "react";
import Select from "react-select";

const RecordPerPage = ({ 
    limit, 
    setLimit, 
    options=[
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
        { value: 200, label: "200" },
        { value: 500, label: "500" },
        { value: 1000, label: "1000" },
        { value: 2000, label: "2000" },
        { value: 4000, label: "4000" },
    ], 
}) => {
    const handleChange = (selectedOption) => {
        setLimit(parseInt(selectedOption.value)); // Cập nhật giá trị limit khi chọn
    };

    return (
        <div className="flex items-start">
            <label className="mr-1">SL / Trang:</label>
            <Select
                value={options.find((option) => option.value === limit)} // Đặt giá trị hiện tại
                onChange={handleChange} // Xử lý sự kiện khi thay đổi
                options={options} // Các tùy chọn cho select
                getOptionLabel={(e) => e.label} // Hiển thị label cho các option
                getOptionValue={(e) => e.value} // Sử dụng value làm giá trị
                className="w-full" // Thêm lớp CSS để điều chỉnh chiều rộng của select
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 200 }) }} // Đặt z index cao hơn các phần khác để k bị mất khi scroll
            />
        </div>
    );
};

export default RecordPerPage;
