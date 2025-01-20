import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTransactionListNoLogin from "../../../hooks/data/transactionListVView/useTransactionListNoLogin";
import TransactionListTableNoLogin from "../../../components/data/transactionListVView/TransactionListTableNoLogin";
import FilterTransactionListTableNoLogin from "../../../components/data/transactionListVView/FilterTransactionListTableNoLogin";

import Card from "../../../components/common/Master/Card";

const Page = ({
    paramTreatmentCode,
    isFullScreen = false,
}) => {
    const {
        fieldLabels,
        format,
        data,
        loading,
        error,
        setError,
        isProcessing,
        limit,
        selectedRecord,
        recordDetails,
        lastId,
        setLastId,
        setTreatmentId,
        setLimit,
        filter,
        setFilter,
        fromTime, setFromTime,
        toTime, setToTime,
        setSelectedRecord,
        setRecordDetails,
        convertToDate,
        handleRecordSelect,
        setApplyFilter,
        transactionTypeId, setTransactionTypeId,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        scrollPosition,
        setScrollPosition,
        handleRawChange,
        scrollContainerRef,
        handleLoadMore,
        setReload,
        loadingRecord,
        transactionCode, setTransactionCode,
        treatmentCode, setTreatmentCode,
        transactionTypes, setTransactionTypes,
        transactionTypeKeyword, setTransactionTypeKeyword,
        listTransactionType, setListTransactionType,
        loadingTransactionType,
    }
        = useTransactionListNoLogin();
    // Nếu có param từ trang khác truyền vào thì xử lý
    useEffect(() => {
        if (paramTreatmentCode) {
            setTreatmentCode(paramTreatmentCode);
            setFilterTrigger(true);
        }
    }, [paramTreatmentCode]);
    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Phần điều khiển và lọc */}
            <Card className="md:col-span-3">
                <div className="flex flex-col">
                    <FilterTransactionListTableNoLogin
                        fromTime={fromTime}
                        setFromTime={setFromTime}
                        toTime={toTime}
                        setToTime={setToTime}
                        setApplyFilter={setApplyFilter}
                        setFilterTrigger={setFilterTrigger}
                        handleRawChange={handleRawChange}
                        transactionCode={transactionCode}
                        setTransactionCode={setTransactionCode}
                        treatmentCode={treatmentCode}
                        setTreatmentCode={setTreatmentCode}
                        transactionTypes={transactionTypes}
                        setTransactionTypeKeyword={setTransactionTypeKeyword}
                        listTransactionType={listTransactionType}
                        setListTransactionType={setListTransactionType}
                        loadingTransactionType={loadingTransactionType}
                    />
                </div>
            </Card>
            {/* Danh sách dữ liệu */}
            <Card className="md:col-span-9">
                <div
                    className={`relative overflow-x-auto overflow-y-auto ${isFullScreen ? 'h-[90vh]' : 'h-[75vh]'} mb-2 flex flex-col border`}
                    ref={scrollContainerRef}
                >
                    <TransactionListTableNoLogin
                        fieldLabels={fieldLabels}
                        format={format}
                        data={data}
                        convertToDate={convertToDate}
                        handleRecordSelect={handleRecordSelect}
                        selectedRecord={selectedRecord}
                        loading={loading}
                        setReload={setReload}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Page;
