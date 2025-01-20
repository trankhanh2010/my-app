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
        openModalOtherLinkPayment,
        setOpenModalOtherLinkPayment,
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
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Phần điều khiển và lọc */}
            <Card className="md:order-1 md:col-span-4 md:row-span-2">
                <div className=" min-h-[20vh] md:overflow-y-auto">
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
            <Card className="md:order-1 md:col-span-8">
                <div
                    className="relative overflow-x-auto overflow-y-auto max-h-[80vh] md:max-h-[40vh] md:min-h-[40vh] mb-2 flex flex-col border"
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

            {/* danh sách nút điều kiển*/}
            <Card className="md:order-2 md:col-span-8">
                <div className="min-h-[10vh] md:overflow-y-auto">
                    <ButtonList
                        selectedRecord={selectedRecord}
                        setReload={setReload}
                    />
                </div>
            </Card>

            {/*Thông tin bệnh nhân*/}
            <Card className="md:order-2 md:col-span-6">
                {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                <div className={`w-full ${loadingRecord ? "flex" : ""} md:min-h-[35vh] relative overflow-x-auto`}>
                    <InfoPatient
                        fieldLabels={fieldLabels}
                        recordDetails={recordDetails}
                        format={format}
                        convertToDate={convertToDate}
                        loadingRecord={loadingRecord}
                    />
                </div>
            </Card>

            {/* Phần bảng thông tin dịch vụ */}
            <Card className="md:flex-grow md:order-4 md:col-span-12">
                <SearchTestServiceReqTypeListTable
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <div className="flex flex-col md:flex-row md:space-x-2 border">
                    {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                    <div className={`w-full ${loadingRecord ? "flex" : ""} flex-grow whitespace-pre-line break-words relative overflow-x-auto md:h-[50vh] overflow-y-auto`}>
                        <TestServiceReqTypeListTable
                            recordDetails={recordDetails}
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

            {/* Thông tin giao dịch */}
            <Card className=" md:order-3 md:col-span-6">
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
                openModalOtherLinkPayment={openModalOtherLinkPayment}
                setOpenModalOtherLinkPayment={setOpenModalOtherLinkPayment}
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
