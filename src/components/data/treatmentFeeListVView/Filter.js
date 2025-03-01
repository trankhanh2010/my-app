import React from "react";
import DatePicker from "react-datepicker";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import Search from "../../../components/common/Filter/Search";
import SpanFieldName from "../../common/Data/InfoRecord/SpanFieldName";
import CardElement from "../../common/Master/CardElement";
const Filter = ({
    dataCursor,
    isProcessing,
    limitCursor,
    setLastId,
    fromTime, setFromTime,
    toTime, setToTime,
    setLimitCursor,
    setApplyFilterCursor,
    patientCode, setPatientCode,
    treatmentCode, setTreatmentCode,
    setRefreshTrigger,
    setFilterTrigger,
    handleRawChange,
    setScrollPosition,
    scrollContainerRef,
    handleLoadMore,
}) => {

    return (
        <>
            <CardElement>
                <div className="flex flex-col border p-2">
                    <div className="mt-1 w-full flex flex-row items-center">
                    <label className="mr-1">Từ:</label>
                        <DatePicker
                            selected={fromTime}
                            onChange={(date) => setFromTime(date)}
                            dateFormat="dd/MM/yyyy"
                            className="p-2 border rounded"
                            placeholderText="dd/MM/yyyy"
                            wrapperClassName="datepicker-wrapper"
                            onChangeRaw={(e) => handleRawChange(e, setFromTime)}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-row items-center">
                    <label className="mr-1">Đến:</label>
                        <DatePicker
                            selected={toTime}
                            onChange={(date) => setToTime(date)}
                            dateFormat="dd/MM/yyyy"
                            className="p-2 border rounded"
                            placeholderText="dd/MM/yyyy"
                            wrapperClassName="datepicker-wrapper"
                            onChangeRaw={(e) => handleRawChange(e, setToTime)}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        {/* Chọn số bản ghi trên mỗi trang */}
                        <RecordPerPage
                            limit={limitCursor}
                            setLimit={setLimitCursor}
                        />
                    </div>
                </div>
            </CardElement>

            <CardElement>
                <div className="mt-1 flex flex-col  border p-2">
                    <div className="mt-1 w-full flex flex-col ">
                        <Search
                            keyword={treatmentCode}
                            setKeyword={setTreatmentCode}
                            label={"Nhập mã điều trị"}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col ">
                        <Search
                            keyword={patientCode}
                            setKeyword={setPatientCode}
                            label={"Nhập mã bệnh nhân"}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col ">
                        {/* Nút Lọc */}
                        <button
                            onClick={() => {
                                setApplyFilterCursor(true);
                                setFilterTrigger(true);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Lọc
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        {/* Nút Tải thêm */}
                        <button
                            onClick={handleLoadMore}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                            disabled={isProcessing || !dataCursor || dataCursor.length === 0}
                        >
                            Tải thêm
                        </button>
                    </div>
                </div>
            </CardElement>
        </>
    );
};

export default Filter;
