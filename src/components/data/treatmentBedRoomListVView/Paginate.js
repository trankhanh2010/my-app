import React from "react";
import Select from "react-select";
import { FaArrowLeft, FaArrowRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Component = ({
    filter,
    setFilter,
    setApplyFilter,
    paramData,
    data,
}) => {
    if (!data || !paramData) return null

    const totalPages = Math.ceil(paramData.Count / filter.limit); // Tổng số trang
    const currentPage = Math.floor(filter.start / filter.limit) + 1; // Trang hiện tại

    // Các tùy chọn cho số bản ghi trên mỗi trang
    const recordsPerPageOptions = [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },

    ];

    // Xử lý khi thay đổi số bản ghi trên mỗi trang
    const handleRecordsPerPageChange = (selectedOption) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            limit: selectedOption.value,
            start: 0, // Reset về trang đầu khi thay đổi số bản ghi/trang
        }));
        setApplyFilter(true);
    };

    // Xử lý khi nhập số trang
    const handlePageInputChange = (event) => {
        const pageNumber = Number(event.target.value);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setFilter((prevFilter) => ({
                ...prevFilter,
                start: (pageNumber - 1) * prevFilter.limit,
            }));
            setApplyFilter(true);
        }
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 grid-row-12 gap-2">
            {/* Nút nhảy về trang đầu */}
            <button
                className={`bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50 md:col-span-2 flex items-center justify-center`}
                onClick={() => {
                    setFilter((prevFilter) => ({ ...prevFilter, start: 0 }));
                    setApplyFilter(true);
                }}
                disabled={filter.start === 0}
            >
                <FaAngleDoubleLeft className="w-4 h-3"/>
            </button>

            {/* Nút trang trước */}
            <button
                className={`bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50 md:col-span-2 flex items-center justify-center`}
                onClick={() => {
                    setFilter((prevFilter) => ({
                        ...prevFilter,
                        start: prevFilter.start - prevFilter.limit,
                    }));
                    setApplyFilter(true);
                }}
                disabled={filter.start <= 0}
            >
                <FaArrowLeft className="w-4 h-3"/>
            </button>

            {/* Input nhập số trang */}
            <div className="md:col-span-2 flex items-center justify-center">
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={handlePageInputChange}
                    className="w-full text-center p-2 border rounded"
                />
            </div>

            {/* Hiển thị tổng số trang */}
            <div className="md:col-span-2 flex items-center justify-center">
                <span>
                    / {totalPages}
                </span>
            </div>

            {/* Nút trang sau */}
            <button
                className={`bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50 md:col-span-2 flex items-center justify-center`}
                onClick={() => {
                    setFilter((prevFilter) => ({
                        ...prevFilter,
                        start: prevFilter.start + prevFilter.limit,
                    }));
                    setApplyFilter(true);
                }}
                disabled={filter.start + filter.limit >= paramData.Count}
            >
                <FaArrowRight className="w-4 h-3"/>
            </button>

            {/* Nút nhảy về trang cuối */}
            <button
                className={`bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50 md:col-span-2 flex items-center justify-center`}
                onClick={() => {
                    setFilter((prevFilter) => ({
                        ...prevFilter,
                        start: (totalPages - 1) * filter.limit,
                    }));
                    setApplyFilter(true);
                }}
                disabled={filter.start + filter.limit >= paramData.Count}
            >
                <FaAngleDoubleRight className="w-4 h-3"/>
            </button>


            {/* Select chọn số bản ghi trên mỗi trang */}
            <div className="md:col-span-6 flex items-center justify-center">
                <Select
                    options={recordsPerPageOptions}
                    defaultValue={recordsPerPageOptions.find(option => option.value === filter.limit)}
                    onChange={handleRecordsPerPageChange}
                />
            </div>
            {/* Hiện là đang ở bản ghi thứ bao nhiêu */}
            <div className="md:col-span-6 flex items-center justify-center">
                <span>
                    {` ${filter.start + 1} - ${Math.min(filter.start + filter.limit, paramData.Count)} / ${paramData.Count}`}
                </span>
            </div>
        </div>
    );
};

export default Component;
