import React from "react";
import Select from "react-select";

const RecordPerPage = ({ limit, setLimit, options }) => {
    const handleChange = (selectedOption) => {
        setLimit(parseInt(selectedOption.value)); // Cập nhật giá trị limit khi chọn
    };

    return (
        <div className="flex items-center">
            <label className="mr-2">Số bản ghi trên mỗi trang:</label>
            <Select
                value={options.find((option) => option.value === limit)} // Đặt giá trị hiện tại
                onChange={handleChange} // Xử lý sự kiện khi thay đổi
                options={options} // Các tùy chọn cho select
                getOptionLabel={(e) => e.label} // Hiển thị label cho các option
                getOptionValue={(e) => e.value} // Sử dụng value làm giá trị
                className="w-48" // Thêm lớp CSS để điều chỉnh chiều rộng của select
            />
        </div>
    );
};

export default RecordPerPage;
