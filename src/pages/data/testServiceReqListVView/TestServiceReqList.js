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
        isProcessing,
        error,
        limitCursor,
        selectedRecord,
        recordDetails,
        testServiceTypeList,
        patientId,
        setPatientId,
        searchTerm,
        setSearchTerm,
        setLimitCusor,
        convertToDate,
        handleRecordSelect,
        setRecordDetails,
        fetchDataCursor,

    } = useTestServiceReqList();
    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`flex flex-wrap gap-8 w-full p-4 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
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
                />
            </div>
        </div>
    );
};

export default TestServiceReqList;
