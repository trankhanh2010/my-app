import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTestServiceReqList from "../../../hooks/data/testServiceReqListVView/useTestServiceReqList";
import TestServiceReqListTable from "../../../components/data/testServiceReqListVView/TestServiceReqListTable";
import InfoTransaction from "../../../components/data/testServiceReqListVView/InfoTransaction";
import InfoPatient from "../../../components/data/testServiceReqListVView/InfoPatient";
import SearchTestServiceReqTypeListTable from "../../../components/data/testServiceReqListVView/SearchTestServiceReqTypeListTable";
import TestServiceReqTypeListTable from "../../../components/data/testServiceReqListVView/TestServiceReqTypeListTable";
import FilterNoLogin from "../../../components/data/testServiceReqListVView/FilterNoLogin";
import ShowAllPayment from "../../../components/common/Modal/Payment/ShowAllPayment";
import ResultPaymentModal from "../../../components/common/Modal/Payment/ResultPaymentModal";
import Card from "../../../components/common/Master/Card";
import NoFeeModal from "../../../components/common/Modal/Payment/NoFeeModal";

const TestServiceReqList = () => {
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
        treatmentId,
        setTreatmentId,
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
        creatingPayment,
        handleRawChange,
        getPaymentMoMoQRCode,
        getPaymentMoMoTheQuocTe,
        getPaymentMoMoTheATMNoiDia,
        payment,
        openModalPaymentMoMoQRCode,
        setOpenModalPaymentMoMoQRCode,
        openModalPaymentMoMoTheQuocTe,
        setOpenModalPaymentMoMoTheQuocTe,
        openModalPaymentMoMoTheATMNoiDia,
        setOpenModalPaymentMoMoTheATMNoiDia,
        opentShowAllPayment,
        setOpentShowAllPayment,
        openModalResultPayment,
        setOpenModalResultPayment,
        gettingResultPayment,
        handleOpenMoMoPayment,
        openModalNoFee, 
        setOpenModalNoFee,
        setIsApiNoAuth, 
        scrollContainerRef,
        handleLoadMore,
    }
        = useTestServiceReqList();
    // Các api của trang này k cần đăng nhập
    // chỉ gán giá trị 1 lần
    const hasSetNoAuth = useRef(false);
    if (!hasSetNoAuth.current) {
        setIsApiNoAuth(true);
        hasSetNoAuth.current = true;
    }
    // if (loading) return  <div className="spinner"></div> // Hiển thị spinner khi đang tải;
    if (error) return <p>{error}</p>;
    return (
        <div className={`flex flex-wrap gap-1 w-full p-1 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="w-full md:w-5/12 md:mr-1 md:border-r md:pr-2">
                {/* Phần điều khiển và lọc */}
                <Card>
                    <div className="h-[20vh] overflow-y-auto">
                        <FilterNoLogin
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
                            scrollContainerRef={scrollContainerRef}
                            setScrollPosition={setScrollPosition}
                            handleLoadMore={handleLoadMore}
                        />
                    </div>
                </Card>

                {/* Danh sách dữ liệu */}
                <Card>
                    <div
                        className="relative overflow-x-auto overflow-y-auto max-h-[30vh] min-h-[30vh] mb-2 flex flex-col"
                        ref={scrollContainerRef}
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
                            setTreatmentId={setTreatmentId}
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
                        {selectedRecord && selectedRecord.treatmentCode 
                        && Number(selectedRecord.feeAdd) > 0 
                        && (
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
                    <div className="flex flex-col md:flex-row md:space-x-2 border">
                        <div className="w-full flex flex-col whitespace-pre-line break-words relative overflow-x-auto overflow-y-auto max-h-[65vh] min-h-[65vh]">
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
                creatingPayment={creatingPayment}
                selectedRecord={selectedRecord}
                opentShowAllPayment={opentShowAllPayment}
                setOpentShowAllPayment={setOpentShowAllPayment}
                openModalPaymentMoMoQRCode={openModalPaymentMoMoQRCode}
                setOpenModalPaymentMoMoQRCode={setOpenModalPaymentMoMoQRCode}
                openModalPaymentMoMoTheQuocTe={openModalPaymentMoMoTheQuocTe}
                setOpenModalPaymentMoMoTheQuocTe={setOpenModalPaymentMoMoTheQuocTe}
                openModalPaymentMoMoTheATMNoiDia={openModalPaymentMoMoTheATMNoiDia}
                setOpenModalPaymentMoMoTheATMNoiDia={setOpenModalPaymentMoMoTheATMNoiDia}
                getPaymentMoMoQRCode={getPaymentMoMoQRCode}
                getPaymentMoMoTheQuocTe={getPaymentMoMoTheQuocTe}
                getPaymentMoMoTheATMNoiDia={getPaymentMoMoTheATMNoiDia}
                payment={payment}
                handleOpenMoMoPayment={handleOpenMoMoPayment}
            />
            <ResultPaymentModal
                openModalResultPayment={openModalResultPayment}
                setOpenModalResultPayment={setOpenModalResultPayment}
                payment={payment}
                gettingResultPayment={gettingResultPayment}
            />
            <NoFeeModal
              openModalNoFee={openModalNoFee}
              setOpenModalNoFee={setOpenModalNoFee}
            />
        </div>
    );
};

export default TestServiceReqList;
