import React from "react";
import useTestServiceReqList from "../../../hooks/data/testServiceReqListVView/useTestServiceReqList";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import TestServiceReqListTable from "../../../components/data/testServiceReqListVView/TestServiceReqListTable";
import TestServiceReqListDetails from "../../../components/data/testServiceReqListVView/TestServiceReqListDetails";


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
        searchTerm,
        setSearchTerm,
        expandedGroups,
        setExpandedGroups,
        setLimitCusor,
        convertToDate,
        handleRecordSelect,
        setRecordDetails,
        fetchDataCursor,

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
            <div className="w-full md:w-4/12">
                <div className="mb-4 flex flex-wrap gap-4">
                    <RecordPerPage
                        limit={limitCursor}
                        setLimit={setLimitCusor}
                        options={[
                            { value: 10, label: "10" },
                            { value: 20, label: "20" },
                            { value: 50, label: "50" },
                        ]}
                    />
                    <div className="mt-4 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={isProcessing || !dataCursor || dataCursor.length === 0}
                    >
                        Tải thêm
                    </button>
                </div>
                </div>
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

            <div className="w-full md:w-7/12 border-l border-gray-300 pl-4 mt-4 md:mt-0 flex-grow">
                <TestServiceReqListDetails
                    fieldLabels={fieldLabels}
                    recordDetails={recordDetails}
                    format={format}
                    convertToDate={convertToDate}
                    testServiceTypeList={testServiceTypeList}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    expandedGroups={expandedGroups}
                    setExpandedGroups={setExpandedGroups}
                    selectedRecord={selectedRecord}
                    loadingFetchTestServiceTypeList={loadingFetchTestServiceTypeList}
                    errorFetchTestServiceTypeList={errorFetchTestServiceTypeList}
                />
            </div>
        </div>
    );
};

export default TestServiceReqList;
