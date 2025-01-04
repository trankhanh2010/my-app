import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTreatmentFeeList from "../../../hooks/data/treatmentFeeListVView/useTreatmentFeeList";
import TreatmentFeeListTable from "../../../components/data/treatmentFeeListVView/TreatmentFeeListTable";
import InfoTransaction from "../../../components/data/treatmentFeeListVView/InfoTransaction";
import InfoPatient from "../../../components/data/treatmentFeeListVView/InfoPatient";
import SearchTestServiceReqTypeListTable from "../../../components/data/treatmentFeeListVView/SearchTestServiceReqTypeListTable";
import TestServiceReqTypeListTable from "../../../components/data/treatmentFeeListVView/TestServiceReqTypeListTable";
import Filter from "../../../components/data/treatmentFeeListVView/Filter";
import ShowAllPayment from "../../../components/common/Modal/Payment/ShowAllPayment";
import ResultPaymentModal from "../../../components/common/Modal/Payment/ResultPaymentModal";
import Card from "../../../components/common/Master/Card";
import NoFeeModal from "../../../components/common/Modal/Payment/NoFeeModal";
import ButtonList from "../../../components/data/treatmentFeeListVView/ButtonList";

const Page = () => {
    const {
        fieldLabels,
        fieldConfig,
        format,
        dataCursor,
        loading,
        loadingFetchTestServiceTypeList,
        treatmentFeeDetail,
        loadingFetchTreatmentFeeDetail,
        errorFetchTreatmentFeeDetail,
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
        scrollContainerRef,
        handleLoadMore,
        setReload,
        loadingRecord,
    }
        = useTreatmentFeeList();

    return (
        <div className={`grid grid-cols-12 gap-1 p-1 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="col-span-12 md:col-span-5 flex flex-col md:mr-1 md:border-r md:pr-2">
                {/* Phần điều khiển và lọc */}
                <Card>
                    <div className="md:max-h-[20vh] min-h-[20vh] md:overflow-y-auto">
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
                            scrollContainerRef={scrollContainerRef}
                            setScrollPosition={setScrollPosition}
                            handleLoadMore={handleLoadMore}
                        />
                    </div>
                </Card>

                {/* Danh sách dữ liệu */}
                <Card>
                    <div
                        className="relative overflow-x-auto overflow-y-auto max-h-[40vh] md:min-h-[40vh] mb-2 flex flex-col"
                        ref={scrollContainerRef}
                    >
                        <TreatmentFeeListTable
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
                            setReload={setReload}
                        />
                    </div>
                </Card>

                {/* Thông tin giao dịch */}
                <Card className="flex-grow">
                    <div className="w-full flex flex-col relative whitespace-pre-line break-words">
                        <InfoTransaction
                            recordDetails={recordDetails}
                            treatmentFeeDetail={treatmentFeeDetail}
                            selectedRecord={selectedRecord}
                            loadingFetchTreatmentFeeDetail={loadingFetchTreatmentFeeDetail}
                            errorFetchTreatmentFeeDetail={errorFetchTreatmentFeeDetail}
                        />
                        {treatmentFeeDetail
                            && Number(treatmentFeeDetail.fee) > 0
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
            <div className="col-span-12 md:col-span-7 flex flex-col flex-grow mt-4 md:mt-0">
                {/*Thông tin bệnh nhân*/}
                <Card>
                    {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                    <div className={`w-full ${loadingRecord ? "flex" : ""} md:min-h-[35vh] relative overflow-x-auto md:overflow-y-auto md:max-h-[35vh]`}>
                        <InfoPatient
                            fieldLabels={fieldLabels}
                            recordDetails={recordDetails}
                            format={format}
                            convertToDate={convertToDate}
                            loadingRecord={loadingRecord}
                        />
                    </div>
                </Card>
                {/*danh sách nút điều kiển*/}
                <Card>
                    <div className="min-h-[10vh] md:overflow-y-auto">
                        <ButtonList />
                    </div>
                </Card>
                {/* Phần bảng thông tin dịch vụ */}
                <Card className="flex-grow mt-1">
                    <SearchTestServiceReqTypeListTable
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <div className="flex flex-col md:flex-row md:space-x-2 border">
                        {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                        <div className={`w-full ${loadingRecord ? "flex" : ""} flex-grow whitespace-pre-line break-words relative overflow-x-auto md:h-[50vh] overflow-y-auto`}>
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

export default Page;
