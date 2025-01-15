import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTransactionList from "../../../hooks/data/transactionListVView/useTransactionList";
import TransactionListTable from "../../../components/data/transactionListVView/TransactionListTable";
import Filter from "../../../components/data/transactionListVView/FilterTransactionListTable";
import Card from "../../../components/common/Master/Card";

const Page = ({
    paramTreatmentCode,
    isFullScreen = false,
}) => {
    const {
        fieldLabels,
        format,
        dataCursor,
        loading,
        error,
        setError,
        isProcessing,
        limitCursor,
        selectedRecord,
        recordDetails,
        lastId,
        setLastId,
        setTreatmentId,
        setLimitCursor,
        filterCursor,
        setFilterCursor,
        fromTime, setFromTime,
        toTime, setToTime,
        setSelectedRecord,
        setRecordDetails,
        convertToDate,
        handleRecordSelect,
        setApplyFilterCursor,
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
        = useTransactionList();
    // Nếu có param từ trang khác truyền vào thì xử lý
    useEffect(() => {
        if (paramTreatmentCode) {
            setTreatmentCode(paramTreatmentCode);
            setFilterTrigger(true);
        }
    }, [paramTreatmentCode]);
    return (
        <div className={`grid grid-cols-12 gap-1 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="col-span-12 md:col-span-3 flex flex-col md:mr-1 md:border-r md:pr-2 ">
                {/* Phần điều khiển và lọc */}
                <Card className="flex-grow">
                    <div className="flex flex-col">
                        <Filter
                            dataCursor={dataCursor}
                            isProcessing={isProcessing}
                            limitCursor={limitCursor}
                            setLastId={setLastId}
                            recordDetails={recordDetails}
                            fromTime={fromTime}
                            setFromTime={setFromTime}
                            toTime={toTime}
                            setToTime={setToTime}
                            setLimitCursor={setLimitCursor}
                            setApplyFilterCursor={setApplyFilterCursor}
                            setRefreshTrigger={setRefreshTrigger}
                            setFilterTrigger={setFilterTrigger}
                            handleRawChange={handleRawChange}
                            scrollContainerRef={scrollContainerRef}
                            setScrollPosition={setScrollPosition}
                            handleLoadMore={handleLoadMore}
                            transactionTypeId={transactionTypeId}
                            setTransactionTypeId={setTransactionTypeId}
                            transactionCode={transactionCode}
                            setTransactionCode={setTransactionCode}
                            treatmentCode={treatmentCode}
                            setTreatmentCode={setTreatmentCode}
                            transactionTypes={transactionTypes}
                            setTransactionTypes={setTransactionTypes}
                            transactionTypeKeyword={transactionTypeKeyword}
                            setTransactionTypeKeyword={setTransactionTypeKeyword}
                            listTransactionType={listTransactionType} 
                            setListTransactionType={setListTransactionType}
                            loadingTransactionType={loadingTransactionType}
                        />
                    </div>
                </Card>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-col flex-grow mt-4 md:mt-1">
                {/* Danh sách dữ liệu */}
                <Card>
                    <div
                        className={`relative overflow-x-auto overflow-y-auto ${isFullScreen?'h-[90vh]':'h-[75vh]'} mb-2 flex flex-col border`}
                        ref={scrollContainerRef}
                    >
                        <TransactionListTable
                            fieldLabels={fieldLabels}
                            format={format}
                            data={dataCursor}
                            convertToDate={convertToDate}
                            handleRecordSelect={handleRecordSelect}
                            selectedRecord={selectedRecord}
                            // recordDetails={recordDetails}
                            // setRecordDetails={setRecordDetails}
                            // setTreatmentId={setTreatmentId}
                            loading={loading}
                            setReload={setReload}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Page;
