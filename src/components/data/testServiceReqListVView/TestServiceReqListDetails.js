import React from "react";
import InfoTransaction from "./InfoTransaction";
import TestServiceReqTypeListTable from "./TestServiceReqTypeListTable";
import SearchTestServiceReqTypeListTable from "./SearchTestServiceReqTypeListTable";
import InfoPatient from "./InfoPatient";

const TestServiceReqListDetails = ({
    fieldLabels,
    recordDetails,
    format,
    convertToDate,
    testServiceTypeList,
    searchTerm,
    setSearchTerm,
    expandedGroups,
    setExpandedGroups,
    selectedRecord,
    loadingFetchTestServiceTypeList,
    errorFetchTestServiceTypeList,
}) => {
    if (!recordDetails) return <p className="text-gray-500">Chưa chọn bản ghi</p>;
    return (
        <div className="text-xs">
            {/* Phần bảng trên */}


        </div>
    );
};

export default TestServiceReqListDetails;
