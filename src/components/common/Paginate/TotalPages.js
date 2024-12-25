import React from "react";

const TotalPages = ({
  page, 
  totalPages, 
  setPage,
}) => {
  return (
    <div className="flex items-center">
      <label className="mr-2">Trang:</label>
      <input
        type="number"
        value={page}
        min="1"
        max={totalPages || 1} // Giới hạn số trang không quá tổng số trang
        onChange={(e) => setPage(parseInt(e.target.value))}
        className="p-2 border rounded w-[6rem]"
      />
      <span className="ml-2 w-[6rem]">/{totalPages || 0}</span> {/* Hiển thị tổng số trang hoặc 0 nếu không có bản ghi */}
    </div>
  );
};

export default TotalPages;
