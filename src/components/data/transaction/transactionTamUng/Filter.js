import React from "react";
import Search from "../../../common/Filter/Search";
import CardElement from "../../../common/Master/CardElement";
const Filter = ({
    setFilterTrigger,
    treatmentCode, 
    setTreatmentCode,
}) => {
    return (
        <>
            <CardElement>
                <div className="flex flex-col 2xl:flex-row 2xl:space-x-2 border p-2">
                    <div className="mt-1 w-full flex flex-col 2xl:w-[100%]">
                        <Search
                            keyword={treatmentCode}
                            setKeyword={setTreatmentCode}
                            label={"Nhập mã điều trị"}
                        />
                    </div>
                </div>
            </CardElement>

            <CardElement>
                <div className="mt-1 flex flex-col xl:flex-row xl:space-x-2 border p-2">
                    <div className="mt-1 w-full flex flex-col xl:w-[100%]">
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
