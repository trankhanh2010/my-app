import React from "react";
import NoRecordInfo from "../common/Info/NoRecordInfo";
import Loading from "../common/Info/Loading";

const BedDetails = ({
    loading,
    setFilterTrigger,
}) => {
    return (
        <div className="mt-1 w-full flex flex-col gap-2">
            {/* Nút Lọc */}
            <div className="text-lg text-center text-blue-600 font-semibold">
                <p> Danh sách chỉ hiện những thiết bị đang bị chặn trong 24h</p>
            </div>
            <button
                onClick={() => {
                    setFilterTrigger(true);
                }}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
            >
                Làm mới
            </button>
        </div>
    );
};

export default BedDetails;
