import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTestServiceReqList from "../../../hooks/data/treatmentFeeListVView/useTreatmentFeeList";
import TreatmentFeeListTable from "../../../components/data/treatmentFeeListVView/TreatmentFeeListTable";
import InfoTransaction from "../../../components/data/treatmentFeeListVView/InfoTransaction";
import InfoPatient from "../../../components/data/treatmentFeeListVView/InfoPatient";
import SearchTestServiceReqTypeListTable from "../../../components/data/treatmentFeeListVView/SearchTestServiceReqTypeListTable";
import TestServiceReqTypeListTable from "../../../components/data/treatmentFeeListVView/TestServiceReqTypeListTable";
import FilterNoLogin from "../../../components/data/treatmentFeeListVView/FilterNoLogin";
import ShowAllPayment from "../../../components/common/Modal/Payment/ShowAllPayment";
import ResultPaymentModal from "../../../components/common/Modal/Payment/ResultPaymentModal";
import Card from "../../../components/common/Master/Card";
import NoFeeModal from "../../../components/common/Modal/Payment/NoFeeModal";
import SectionHeader from "../../../components/common/Data/InfoRecord/SectionHeader";
import ButtonListNoLogin from "../../../components/data/treatmentFeeListVView/ButtonListNoLogin";

const TestServiceReqList = () => {
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
        setIsApiNoAuth,
        scrollContainerRef,
        handleLoadMore,
        setReload,
        reload,
        loadingRecord,
        setSelectedRecord,
        openModalOtherLinkPayment,
        setOpenModalOtherLinkPayment,
        setTreatmentFeeDetail,
        setTestServiceTypeList,
    }
        = useTestServiceReqList();
    // Các api của trang này k cần đăng nhập
    // chỉ gán giá trị 1 lần
    const hasSetNoAuth = useRef(false);
    if (!hasSetNoAuth.current) {
        setIsApiNoAuth(true);
        hasSetNoAuth.current = true;
    }

    // Lọc qua trước khi dùng
    // Chỉ lấy các bản ghi có đang điều trị và chưa khóa viện phí
    const filteredDataCursor = dataCursor.filter(item => item.feeLockTime === null && item.treatmentEndTypeId === null);

    useEffect(() => {
        if (filteredDataCursor.length > 0 && (!selectedRecord || selectedRecord.id !== filteredDataCursor[0].id)) {
            // Tìm đối tượng có `inTime` lớn nhất
            const maxInTimeRecord = filteredDataCursor.reduce((max, current) => {
                return current.inTime > max.inTime ? current : max;
            });
            // Xử lý đối tượng được chọn
            handleRecordSelect(maxInTimeRecord);
            setTreatmentId(maxInTimeRecord.id);
            setReload(true);
        }
        if (filteredDataCursor.length == 0) {
            handleRecordSelect()
        }
    }, [filteredDataCursor, selectedRecord]); // Gọi lại khi data hoặc selectedRecord thay đổi

    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 w-full ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Tên trang*/}
            <Card className="md:order-1 md:col-span-12">
                <SectionHeader title="Thông tin viện phí" />
            </Card>

            {/* Phần điều khiển và lọc */}
            <Card className="md:order-1 md:col-span-4">
                <SectionHeader title="Bộ lọc" />
                <div className="">
                    <FilterNoLogin
                        setApplyFilterCursor={setApplyFilterCursor}
                        patientCode={patientCode}
                        setPatientCode={setPatientCode}
                        treatmentCode={treatmentCode}
                        setTreatmentCode={setTreatmentCode}
                        setFilterTrigger={setFilterTrigger}
                    />
                </div>
            </Card>

            {/* Danh sách dữ liệu */}
            <Card className="md:order-1 md:col-span-8">
                <SectionHeader title="Thông tin các lần điều trị" />
                <div
                    className="relative overflow-x-auto overflow-y-auto max-h-[80vh] md:max-h-[30vh] md:min-h-[30vh]  mb-2 flex flex-col border"
                    ref={scrollContainerRef}
                >
                    <TreatmentFeeListTable
                        fieldLabels={fieldLabels}
                        format={format}
                        data={filteredDataCursor}
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

            {/*Thông tin bệnh nhân*/}
            <Card className="md:order-2 md:col-span-6">
                <SectionHeader title="Thông tin bệnh nhân" />
                {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                <div className={`w-full ${loadingRecord ? "flex" : ""} md:min-h-[35vh] relative md:overflow-x-auto overflow-y-auto`}>
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
                <SectionHeader title="Thông tin các dịch vụ" />
                <SearchTestServiceReqTypeListTable
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <div className="flex flex-col md:flex-row md:space-x-2 border">
                    {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                    <div className={`w-full ${loadingRecord ? "flex" : ""} whitespace-pre-line break-words relative md:h-[60vh] overflow-x-auto overflow-y-auto `}>
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
                <SectionHeader title="Thông tin viện phí" />
                <div className="w-full flex flex-col relative whitespace-pre-line break-words">
                    <InfoTransaction
                        recordDetails={recordDetails}
                        treatmentFeeDetail={treatmentFeeDetail}
                        selectedRecord={selectedRecord}
                        loadingFetchTreatmentFeeDetail={loadingFetchTreatmentFeeDetail}
                        errorFetchTreatmentFeeDetail={errorFetchTreatmentFeeDetail}
                    />
                    <ButtonListNoLogin
                        selectedRecord={selectedRecord}
                    />
                    {treatmentFeeDetail && recordDetails
                        && Number(treatmentFeeDetail.fee) > 0
                        && (
                            <button
                                className="py-2 px-4 rounded bg-pink-500 hover:bg-pink-600 mt-1 mb-1 text-white"
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

export default TestServiceReqList;
