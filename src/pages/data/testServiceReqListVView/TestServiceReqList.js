import React from "react";
import useTestServiceReqList from "../../../hooks/data/testServiceReqListVView/useTestServiceReqList";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import TestServiceReqListTable from "../../../components/data/testServiceReqListVView/TestServiceReqListTable";
import InfoTransaction from "../../../components/data/testServiceReqListVView/InfoTransaction";
import InfoPatient from "../../../components/data/testServiceReqListVView/InfoPatient";
import SearchTestServiceReqTypeListTable from "../../../components/data/testServiceReqListVView/SearchTestServiceReqTypeListTable";
import TestServiceReqTypeListTable from "../../../components/data/testServiceReqListVView/TestServiceReqTypeListTable";

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

    } = useTestServiceReqList();
    const handleLoadMore = () => {
        if (dataCursor && dataCursor.length > 0) {
            const lastRecordId = Number(dataCursor[dataCursor.length - 1].id); // Lấy id cuối cùng
            setLastId(lastRecordId); // Cập nhật lastId
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`flex flex-wrap gap-1 w-full p-1 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="w-full md:w-4/12 md:mr-1 md:border-r md:pr-2">
                <div className="mb-4 flex flex-wrap gap-4">
                    <RecordPerPage
                        limit={limitCursor}
                        setLimit={setLimitCursor}
                        options={[
                            { value: 10, label: "10" },
                            { value: 20, label: "20" },
                            { value: 50, label: "50" },
                        ]}
                    />
                    <div className="text-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={isProcessing || !dataCursor || dataCursor.length === 0}
                        >
                            Tải thêm
                        </button>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="fromTime" className="mr-2">Từ ngày:</label>
                        <input
                            type="date"
                            value={fromTime}
                            onChange={(e) => setFromTime(e.target.value )}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="toTime" className="mr-2">Đến ngày:</label>
                        <input
                            type="date"
                            value={toTime}
                            onChange={(e) => setToTime(e.target.value )}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => setApplyFilterCursor(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            Lọc
                        </button>
                    </div>
                </div>
                <div class="relative overflow-x-auto overflow-y-auto max-h-[40vh] min-h-[40vh] mb-2">
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
                    />
                </div>
                <div className="w-full flex flex-col whitespace-pre-line break-words min-h-[30vh]">
                    <InfoTransaction
                        recordDetails={recordDetails}
                        testServiceTypeList={testServiceTypeList}
                        selectedRecord={selectedRecord}
                        loadingFetchTestServiceTypeList={loadingFetchTestServiceTypeList}
                        errorFetchTestServiceTypeList={errorFetchTestServiceTypeList}
                    />
                </div>
            </div>

            <div className="w-full md:w-7/12 mt-4 md:mt-0 flex-grow">
                {/*Thông tin bệnh nhân*/}
                <div className="w-full min-h-[35vh] relative overflow-x-auto overflow-y-auto max-h-[35vh]">
                <InfoPatient
                    fieldLabels={fieldLabels}
                    recordDetails={recordDetails}
                    format={format}
                    convertToDate={convertToDate}
                />
                </div>
                {/* Phần bảng thông tin dịch vụ */}
                <div className="mt-2 w-full flex flex-col whitespace-pre-line break-words">
                    <SearchTestServiceReqTypeListTable
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300">
                    <div className="w-full min-h-[55vh] flex flex-col md:border-r whitespace-pre-line break-words relative overflow-x-auto overflow-y-auto max-h-[55vh]">
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
            </div>
        </div>
    );
};

export default TestServiceReqList;