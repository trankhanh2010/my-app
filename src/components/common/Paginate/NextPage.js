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
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
        >
            Trang sau
        </button>
    );
};

export default NextPage;
