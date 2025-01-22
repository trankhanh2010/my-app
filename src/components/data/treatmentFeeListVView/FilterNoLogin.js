import React from "react";
import DatePicker from "react-datepicker";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import Search from "../../../components/common/Filter/Search";
import SpanFieldName from "../../common/Data/InfoRecord/SpanFieldName";
import CardElement from "../../common/Master/CardElement";
import SearchIcon from "../../common/Icon/SearchIcon";
const Filter = ({
    setApplyFilterCursor,
    patientCode,
    setPatientCode,
    treatmentCode,
    setTreatmentCode,
    setFilterTrigger,
}) => {

    return (
        <>
            <CardElement>
                <div className="flex flex-col border p-2">
                    <div className="mt-1 w-full flex flex-col">
                        <Search
                            keyword={treatmentCode}
                            setKeyword={setTreatmentCode}
                            label={"Nhập mã điều trị"}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <Search
                            keyword={patientCode}
                            setKeyword={setPatientCode}
                            label={"Nhập mã bệnh nhân"}
                        />
                    </div>
                </div>
            </CardElement>

            <CardElement>
                <div className="mt-1 flex flex-col border p-2">
                    <div className="mt-1 w-full flex flex-col">
                        {/* Nút Lọc */}
                        <button
                            onClick={() => {
                                setApplyFilterCursor(true);
                                setFilterTrigger(true);
                            }}
                            className="relative px-4 py-2 pl-8 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate flex items-center justify-center"
                        >
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                <SearchIcon />
                            </span>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </CardElement>
        </>
    );
};

export default Filter;
