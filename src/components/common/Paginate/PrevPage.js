import React from "react";

const PrevPage = ({
    page,
    setPage,
}) => {
    return (
        <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className={`bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50 ${page <= 1 ? "cursor-not-allowed" : ""}`}
        >
            Trang trước
        </button>
    );
};

export default PrevPage;
