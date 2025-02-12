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
    isHelpInputFiler,
    setIsHelpInputFiler,
    isHelpButtonSearch,
    setIsHelpButtonSearch,
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
                            onFocus={(e) => {
                                setIsHelpInputFiler(false)
                            }}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <Search
                            keyword={patientCode}
                            setKeyword={setPatientCode}
                            label={"Nhập mã bệnh nhân"}
                            onFocus={(e) => {
                                setIsHelpInputFiler(false)
                            }}
                        />
                    </div>
                </div>
            </CardElement>

            <CardElement>
                <div className="mt-1 flex flex-col border p-2">
                    <div className="mt-1 w-full flex flex-col">
                        {/* Nút Lọc */}
                        <button
                            disabled={!treatmentCode&&!patientCode}
                            onClick={() => {
                                setApplyFilterCursor(true);
                                setFilterTrigger(true);
                                // Tắt hướng dẫn 
                                setIsHelpButtonSearch(false)
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
            {/* Phần hướng dẫn*/}
            {isHelpInputFiler && (
                <div className="absolute bg-white border rounded-lg shadow-lg p-4  max-w-sm border-gray-500 right-10 top-[160px] mx-2 z-40" onClick={(e) => { setIsHelpInputFiler(false) }}>
                    <div className="relative">
                        <div className="absolute -top-6 left-4 w-4 h-4 bg-white border-l border-t border-gray-500 transform rotate-45"></div>
                        <p className="text-lg text-gray-700">
                            Nhập <span className="text-blue-500 font-semibold">mã điều trị</span> hoặc <span className="text-blue-500 font-semibold">mã bệnh nhân</span> mà bạn muốn xem thông tin vào ô tương ứng!
                        </p>
                    </div>
                    <button
                        onClick={(e) => { setIsHelpInputFiler(false) }}
                        className="absolute top-0 right-0  hover:text-red-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            {(!isHelpInputFiler && isHelpButtonSearch) && (
                <div className="absolute bg-white border rounded-lg shadow-lg p-4 max-w-sm border-gray-500 right-10 top-[200px] mx-2 z-40" onClick={(e) => { setIsHelpButtonSearch(false) }}>
                    <div className="relative">
                        <div className="absolute -top-6 left-4 w-4 h-4 bg-white border-l border-t border-gray-500 transform rotate-45"></div>
                        <p className="text-lg text-gray-700">
                            Ấn nút <span className="text-blue-500 font-semibold">Tìm kiếm</span>!
                        </p>
                        <p className="text-lg text-gray-700">
                            Sau đó bạn cần nhập mã OTP mà chúng tôi gửi đến bạn để xem được thông tin!
                        </p>
                    </div>
                    <button
                        onClick={(e) => { setIsHelpButtonSearch(false) }}
                        className="absolute top-0 right-0  hover:text-red-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default Filter;
