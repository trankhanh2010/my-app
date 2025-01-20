import React from "react";
import DatePicker from "react-datepicker";
import Search from "../../common/Filter/Search";
import CardElement from "../../common/Master/CardElement";
import ReactSelectMultiCustomList from "../../common/Custom/ReactSelect/ReactSelectMultiCustomList";
const Filter = ({
    fromTime, 
    setFromTime,
    toTime, 
    setToTime,
    setApplyFilter,
    setFilterTrigger,
    handleRawChange,
    transactionCode, 
    setTransactionCode,
    treatmentCode, 
    setTreatmentCode,
    transactionTypes, 
    setTransactionTypeKeyword,
    listTransactionType, 
    setListTransactionType,
    loadingTransactionType,
}) => {
    return (
        <>
            <CardElement>
                <div className="flex flex-col border p-2">
                    <div className="w-full flex flex-row items-center">
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
                </div>
            </CardElement>

            {/* <CardElement>
                <div className="flex flex-col 2xl:flex-row 2xl:space-x-2 border p-2">
                    <div className="w-full flex flex-col 2xl:w-[1/5]">
                        <Search
                            keyword={treatmentCode}
                            setKeyword={setTreatmentCode}
                            label={"Nhập mã điều trị"}
                        />
                    </div>
                    <div className="mt-1 w-full flex flex-col 2xl:w-[1/5]">
                        <Search
                            keyword={transactionCode}
                            setKeyword={setTransactionCode}
                            label={"Nhập mã giao dịch"}
                        />
                    </div>
                </div>
            </CardElement> */}

            {/* transactionType*/}
            <CardElement>
                <div className="flex flex-col border p-2">
                    <ReactSelectMultiCustomList
                        list={transactionTypes}
                        setListKeyword={setTransactionTypeKeyword}
                        listFieldName="transactionTypeName"
                        listFieldCode="transactionTypeCode"
                        recordFieldName="transactionTypeName"
                        recordFieldId="transactionTypeId"
                        placeholder={`Chọn loại giao dịch`}
                        listSelected={listTransactionType}
                        setListSelected={setListTransactionType}
                        createOrUpdate={false}
                        loading={loadingTransactionType}
                    />
                </div>
            </CardElement>

            <CardElement>
                <div className="flex flex-col xl:flex-row xl:space-x-2 border p-2">
                    <div className="mt-1 w-full flex flex-col xl:w-[2/5]">
                        {/* Nút Lọc */}
                        <button
                            onClick={() => {
                                setApplyFilter(true);
                                setFilterTrigger(true);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:-not-allowed truncate"
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
