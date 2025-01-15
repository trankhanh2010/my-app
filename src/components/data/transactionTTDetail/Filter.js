import React from "react";
import Search from "../../common/Filter/Search";
import CardElement from "../../common/Master/CardElement";
const Filter = ({
    billCode,
    setBillCode,
    setFilterTrigger,
}) => {

    return (
        <>
            <CardElement>
                <div className="mt-1 flex flex-col border p-2">
                    <div className="mt-1 w-full flex flex-col">
                        <Search
                            keyword={billCode}
                            setKeyword={setBillCode}
                            label={"Nhập mã giao dịch"}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        {/* Nút Lọc */}
                        <button
                            onClick={() => {
                                setFilterTrigger(true);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Lọc
                        </button>
                    </div>
                </div>
            </CardElement>
        </>
    );
};

export default Filter;
