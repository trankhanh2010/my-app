import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTestServiceReqList from "../../../hooks/data/testServiceReqListVView/useTestServiceReqList";
import TestServiceReqListTable from "../../../components/data/testServiceReqListVView/TestServiceReqListTable";
import InfoTransaction from "../../../components/data/testServiceReqListVView/InfoTransaction";
import InfoPatient from "../../../components/data/testServiceReqListVView/InfoPatient";
import SearchTestServiceReqTypeListTable from "../../../components/data/testServiceReqListVView/SearchTestServiceReqTypeListTable";
import TestServiceReqTypeListTable from "../../../components/data/testServiceReqListVView/TestServiceReqTypeListTable";
import Filter from "../../../components/data/testServiceReqListVView/Filter";
import ShowAllPayment from "../../../components/common/Modal/Payment/ShowAllPayment";
import Card from "../../../components/common/Master/Card";
const TestServiceReqList = () => {
    const scrollContainerRef = useRef(null); // Dùng ref để tham chiếu đến thẻ div
    const {
        fieldLabels,
        fieldConfig,
        format,
        dataCursor,
        loading,
        loadingFetchTestServiceTypeList,
        isProcessing,
        error,
        errorFetchTestServiceTypeList,
        limitCursor,
        selectedRecord,
        lastId,
        setLastId,
        recordDetails,
        testServiceTypeList,
        patientId,
        setPatientId,
        fromTime, setFromTime,
        toTime, setToTime,
        tdlPatientId, setTdlPatientId,
        executeDepartmentCode, setExecuteDepartmentCode,
        isSpecimen, setIsSpecimen,
        isNoExcute, setIsNoExcute,
        searchTerm,
        setSearchTerm,
        expandedGroups,
        setExpandedGroups,
        setLimitCursor,
        filterCursor,
        setFilterCursor,
        convertToDate,
        handleRecordSelect,
        setRecordDetails,
        fetchDataCursor,
        setApplyFilterCursor,
        patientCode, setPatientCode,
        treatmentCode, setTreatmentCode,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        scrollPosition,
        setScrollPosition,
        handleRawChange,
        getPaymentMoMoQRCode,
        getPaymentMoMoTheQuocTe,
        paymentMoMo,
        openModalPaymentMoMoQRCode,
        setOpenModalPaymentMoMoQRCode,
        openModalPaymentMoMoTheQuocTe,
        setOpenModalPaymentMoMoTheQuocTe,
        opentShowAllPayment,
        setOpentShowAllPayment,
    }
        = useTestServiceReqList();
    const debounceTimeout = useRef(null);
    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        // Nếu có sự kiện cuộn trước đó đang chờ xử lý, hủy bỏ nó
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        // Đặt một timeout để thực hiện hành động sau khi người dùng ngừng cuộn
        debounceTimeout.current = setTimeout(() => {
            setScrollPosition(scrollTop);
        }, 400);
    };
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPosition; // Gán lại scrollTop của div
        }
    }, [dataCursor]); // Chạy lại khi scrollPosition thay đổi
    // if (loading) return  <div className="spinner"></div> // Hiển thị spinner khi đang tải;
    if (error) return <p>{error}</p>;
    return (
        <div className={`flex flex-wrap gap-1 w-full p-1 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="w-full md:w-5/12 md:mr-1 md:border-r md:pr-2">
                {/* Phần điều khiển và lọc */}
                <Card>
                    <div className="min-h-[20vh]">
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
                            patientCode={patientCode}
                            setPatientCode={setPatientCode}
                            treatmentCode={treatmentCode}
                            setTreatmentCode={setTreatmentCode}
                            setRefreshTrigger={setRefreshTrigger}
                            setFilterTrigger={setFilterTrigger}
                            handleRawChange={handleRawChange}
                        />
                    </div>
                </Card>

                {/* Danh sách dữ liệu */}
                <Card>
                    <div
                        className="relative overflow-x-auto overflow-y-auto max-h-[30vh] min-h-[30vh] mb-2 flex flex-col"
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                    >
                        <TestServiceReqListTable
                            fieldLabels={fieldLabels}
                            format={format}
                            data={dataCursor}
                            convertToDate={convertToDate}
                            handleRecordSelect={handleRecordSelect}
                            selectedRecord={selectedRecord}
                            recordDetails={recordDetails}
                            setRecordDetails={setRecordDetails}
                            setPatientId={setPatientId}
                            loading={loading}
                        />
                    </div>
                </Card>

                {/* Thông tin giao dịch */}
                <Card>
                    <div className="w-full flex flex-col relative overflow-x-auto overflow-y-auto whitespace-pre-line break-words min-h-[50vh] max-h-[50vh]">
                        <InfoTransaction
                            recordDetails={recordDetails}
                            testServiceTypeList={testServiceTypeList}
                            selectedRecord={selectedRecord}
                            loadingFetchTestServiceTypeList={loadingFetchTestServiceTypeList}
                            errorFetchTestServiceTypeList={errorFetchTestServiceTypeList}
                        />
                        {selectedRecord && selectedRecord.treatmentCode && Number(selectedRecord.feeAdd) > 0 && (
                            <button
                                className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-500 mt-1 mb-1 text-white"
                                onClick={() => setOpentShowAllPayment(true)}>
                                Thanh toán
                            </button>
                        )}
                    </div>
                </Card>

            </div>
            <div className="w-full md:w-6/12 mt-4 md:mt-0 flex-grow">
                {/*Thông tin bệnh nhân*/}
                <Card>
                    <div className="w-full min-h-[35vh] relative overflow-x-auto overflow-y-auto max-h-[35vh]">
                        <InfoPatient
                            fieldLabels={fieldLabels}
                            recordDetails={recordDetails}
                            format={format}
                            convertToDate={convertToDate}
                        />
                    </div>
                </Card>
                {/* Phần bảng thông tin dịch vụ */}
                <Card>
                    <div className="mt-1 w-full flex flex-col whitespace-pre-line break-words">
                        <SearchTestServiceReqTypeListTable
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300">
                        <div className="w-full flex flex-col md:border-r whitespace-pre-line break-words relative overflow-x-auto overflow-y-auto max-h-[65vh] min-h-[65vh]">
                            <TestServiceReqTypeListTable
                                fieldLabels={fieldLabels}
                                recordDetail={recordDetails}
                                testServiceTypeList={testServiceTypeList}
                                searchTerm={searchTerm}
                                expandedGroups={expandedGroups}
                                setExpandedGroups={setExpandedGroups}
                                loadingFetchTestServiceTypeList={loadingFetchTestServiceTypeList}
                                errorFetchTestServiceTypeList={errorFetchTestServiceTypeList}
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <ShowAllPayment
                selectedRecord={selectedRecord}
                opentShowAllPayment={opentShowAllPayment}
                setOpentShowAllPayment={setOpentShowAllPayment}
                openModalPaymentMoMoQRCode={openModalPaymentMoMoQRCode}
                setOpenModalPaymentMoMoQRCode={setOpenModalPaymentMoMoQRCode}
                openModalPaymentMoMoTheQuocTe={openModalPaymentMoMoTheQuocTe}
                setOpenModalPaymentMoMoTheQuocTe={setOpenModalPaymentMoMoTheQuocTe}
                getPaymentMoMoQRCode={getPaymentMoMoQRCode}
                getPaymentMoMoTheQuocTe={getPaymentMoMoTheQuocTe}
                paymentMoMo={paymentMoMo}
            />
        </div>
    );
};

export default TestServiceReqList;
