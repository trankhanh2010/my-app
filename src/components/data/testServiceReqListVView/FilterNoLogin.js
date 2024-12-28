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
    setLimitCursor,
    setApplyFilterCursor,
    patientCode, setPatientCode,
    treatmentCode, setTreatmentCode,
    setRefreshTrigger,
    setFilterTrigger,
    handleRawChange,
}) => {
    const handleLoadMore = () => {
        if (dataCursor && dataCursor.length > 0) {
            const lastRecordId = Number(dataCursor[dataCursor.length - 1].id); // Lấy id cuối cùng
            setLastId(lastRecordId); // Cập nhật lastId
            setRefreshTrigger(true);
        }
    };
    return (
        <>
            <CardElement>
                <div className="flex flex-col xl:flex-row xl:space-x-2 border p-2">
                    <div className="mt-1 w-full flex flex-col xl:w-[1/3]">
                        {/* Chọn số bản ghi trên mỗi trang */}
                        <RecordPerPage
                            limit={limitCursor}
                            setLimit={setLimitCursor}
                            options={[
                                { value: 10, label: "10" },
                                { value: 20, label: "20" },
                                { value: 50, label: "50" },
                            ]}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col xl:w-[1/3]">
                        <Search
                            keyword={treatmentCode}
                            setKeyword={setTreatmentCode}
                            label={"Nhập mã điều trị"}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col xl:w-[1/3]">
                        <Search
                            keyword={patientCode}
                            setKeyword={setPatientCode}
                            label={"Nhập mã bệnh nhân"}
                        />
                    </div>
                </div>
            </CardElement>

            <CardElement>
                <div className="mt-1 flex flex-col xl:flex-row xl:space-x-2 border p-2">
                    <div className="mt-1 w-full flex flex-col xl:w-[1/2]">
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
                    <div className="mt-1 w-full flex flex-col xl:w-[1/2]">
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
