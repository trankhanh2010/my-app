import React from "react";

const NextPage = ({
    page,
    setPage,
    totalPages,
}) => {
    return (
        <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            className={`bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50 ${page >= totalPages ? "cursor-not-allowed" : ""}`}
        >
            Trang sau
        </button>
    );
};

export default NextPage;
