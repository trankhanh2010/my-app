import React, { useState } from "react";

const TestServiceReqTypeListTable = ({
    fieldLabels,
    testServiceTypeList,
    searchTerm,
    expandedGroups,
    setExpandedGroups,
    loadingFetchTestServiceTypeList,
    errorFetchTestServiceTypeList,
}) => {
    if (loadingFetchTestServiceTypeList) return <p className="text-gray-500">Đang tải dữ liệu</p>;
    if (errorFetchTestServiceTypeList) return <p className="text-gray-500">Có lỗi khi tải dữ liệu</p>;
    // Lọc danh sách dựa trên từ khóa tìm kiếm
    const filteredList = testServiceTypeList.filter((record) =>
        record.tdlServiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.tdlServiceCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Hàm nhóm theo một thuộc tính
    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            // Lấy giá trị của thuộc tính cần nhóm
            const groupKey = currentValue[key];
            // Nếu nhóm đó chưa có trong result, tạo một nhóm mới
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            // Thêm phần tử vào nhóm
            result[groupKey].push(currentValue);
            return result;
        }, {});
    };
    // Nhóm theo patientTypeName
    const groupedByPatientType = groupBy(filteredList, 'patientTypeName');
    // Nhóm con theo serviceTypeName trong mỗi nhóm patientTypeName
    const groupedData = Object.keys(groupedByPatientType).map((patientType) => {
        const patientGroup = groupedByPatientType[patientType];
        // Nhóm tiếp theo theo serviceTypeName
        const groupedByServiceType = groupBy(patientGroup, 'serviceTypeName');
        return {
            patientType,
            services: groupedByServiceType
        };
    });

    // Hàm toggle mở rộng/thu gọn nhóm patientType
    const togglePatientGroup = (patientType) => {
        setExpandedGroups((prevState) => ({
            ...prevState,
            patientType: {
                ...prevState.patientType,
                [patientType]: !prevState.patientType[patientType],
            },
        }));
    };

    // Hàm toggle mở rộng/thu gọn nhóm serviceType trong một patientType
    const toggleServiceGroup = (patientType, serviceType) => {
        setExpandedGroups((prevState) => ({
            ...prevState,
            serviceType: {
                ...prevState.serviceType,
                [patientType]: {
                    ...prevState.serviceType[patientType],
                    [serviceType]: !prevState.serviceType[patientType]?.[serviceType],
                },
            },
        }));
    };
    return (
        <div className="text-xs">
            {/* Phần bảng dưới */}
                    <table className="table-auto w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-2 py-1 w-[23%] pl-6">{fieldLabels.testServiceTypeList.tdlServiceName}</th>
                                <th className="px-2 py-1 w-[5%] pl-6">{fieldLabels.testServiceTypeList.amount}</th>
                                <th className="px-2 py-1 w-[10%] pl-6">{fieldLabels.testServiceTypeList.price}</th>
                                <th className="px-2 py-1 w-[15%] pl-6">{fieldLabels.testServiceTypeList.virTotalPrice}</th>
                                <th className="px-2 py-1 w-[15%] pl-6">{fieldLabels.testServiceTypeList.virTotalHeinPrice}</th>
                                <th className="px-2 py-1 w-[15%] pl-6">{fieldLabels.testServiceTypeList.virTotalPatientPrice}</th>
                                <th className="px-2 py-1 w-[2%] pl-6">{fieldLabels.testServiceTypeList.vatRatio}</th>
                                <th className="px-2 py-1 w-[5%] pl-6">{fieldLabels.testServiceTypeList.tdlServiceCode}</th>
                                <th className="px-2 py-1 w-[5%] pl-6">{fieldLabels.testServiceTypeList.discount}</th>
                                <th className="px-2 py-1 w-[5%] pl-6">{fieldLabels.testServiceTypeList.isExpend}</th>
                                <th className="px-2 py-1 w-[5%] pl-6">{fieldLabels.testServiceTypeList.tdlServiceReqCode}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedData.map((patientGroup) => (
                                <React.Fragment key={patientGroup.patientType}>
                                    {/* Hiển thị tên nhóm patientType và tổng số bản ghi */}
                                    <tr>
                                        <td colSpan="3" className="bg-yellow-100 text-red-600 uppercase font-bold py-2 pl-2">
                                            <button
                                                onClick={() => togglePatientGroup(patientGroup.patientType)}
                                                className="flex items-center"
                                            >
                                                {expandedGroups.patientType[patientGroup.patientType] ? '▼' : '►'}
                                                <span className="ml-2">{patientGroup.patientType} <span className="text-black">({patientGroup.services && Object.values(patientGroup.services).flat().length})</span></span>
                                            </button>
                                        </td>
                                        {/* Hiển thị tổng các cột tổng */}
                                        {(
                                            <td className="bg-yellow-100  text-red-600 font-bold py-2 pl-2">
                                                <span className="pl-6 ">
                                                    {/* Tổng virTotalPrice */}
                                                    {patientGroup.services && Object.values(patientGroup.services).flat().reduce((total, record) => total + (Number(record.virTotalPrice) || 0), 0).toLocaleString()}
                                                </span>
                                            </td>
                                        )}
                                        {(
                                            <td className="bg-yellow-100  text-red-600 font-bold py-2 pl-2">
                                                <span className="pl-6">
                                                    {/* Tổng virTotalHeinPrice */}
                                                    {patientGroup.services && Object.values(patientGroup.services).flat().reduce((total, record) => total + (Number(record.virTotalHeinPrice) || 0), 0).toLocaleString()}
                                                </span>
                                            </td>
                                        )}
                                        {(
                                            <td className="bg-yellow-100  text-red-600 font-bold py-2 pl-2">
                                                <span className="pl-6">
                                                    {/* Tổng virTotalPatientPrice */}
                                                    {patientGroup.services && Object.values(patientGroup.services).flat().reduce((total, record) => total + (Number(record.virTotalPatientPrice) || 0), 0).toLocaleString()}
                                                </span>
                                            </td>
                                        )}
                                        <td colSpan="5" className="bg-yellow-100  text-red-600 font-bold py-2 pl-2"></td>
                                    </tr>
                                    {/* Hiển thị các serviceTypeName trong nhóm patientType nếu patientType được mở rộng */}
                                    {expandedGroups.patientType[patientGroup.patientType] && Object.keys(patientGroup.services).map((serviceType) => (
                                        <React.Fragment key={serviceType}>
                                            {/* Hiển thị tên nhóm serviceType và tổng số bản ghi trong serviceType */}
                                            <tr>
                                                <td colSpan="3" className="bg-gray-100 text-md text-blue-600 font-semibold py-1 pl-4">
                                                    <button
                                                        onClick={() => toggleServiceGroup(patientGroup.patientType, serviceType)}
                                                        className="flex items-center"
                                                    >
                                                        {expandedGroups.serviceType[patientGroup.patientType]?.[serviceType] ? '▼' : '►'}
                                                        <span className="ml-2">{serviceType} <span className="text-gray-600">({patientGroup.services[serviceType].length})</span></span>
                                                    </button>
                                                </td>
                                                {/* Hiển thị tổng các cột tổng */}
                                                {(
                                                    <td className="bg-gray-100 text-blue-600 font-bold py-2 pl-2">
                                                        <span className="pl-6">
                                                            {patientGroup.services[serviceType] && patientGroup.services[serviceType].reduce(
                                                                (total, record) => total + (Number(record.virTotalPrice) || 0), 0
                                                            ).toLocaleString()}
                                                        </span>
                                                    </td>
                                                )}
                                                {(
                                                    <td className="bg-gray-100 text-blue-600 font-bold py-2 pl-2">
                                                        <span className="pl-6">
                                                            {patientGroup.services[serviceType] && patientGroup.services[serviceType].reduce(
                                                                (total, record) => total + (Number(record.virTotalHeinPrice) || 0), 0
                                                            ).toLocaleString()}
                                                        </span>
                                                    </td>
                                                )}
                                                {(
                                                    <td className="bg-gray-100 text-blue-600 font-bold py-2 pl-2">
                                                        <span className="pl-6">
                                                            {patientGroup.services[serviceType] && patientGroup.services[serviceType].reduce(
                                                                (total, record) => total + (Number(record.virTotalPatientPrice) || 0), 0
                                                            ).toLocaleString()}
                                                        </span>
                                                    </td>
                                                )}
                                                <td colSpan="5" className="bg-gray-100  text-blue-600 font-bold py-2 pl-2"></td>
                                            </tr>

                                            {/* Hiển thị các bản ghi trong serviceType nếu serviceType được mở rộng */}
                                            {expandedGroups.serviceType[patientGroup.patientType]?.[serviceType] && patientGroup.services[serviceType].map((record) => (
                                                <tr key={record.id} className="hover:bg-gray-50 cursor-pointer">
                                                    <td className={`border-b px-2 py-1 pl-8 truncate ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{record.tdlServiceName}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{Number(record.amount).toLocaleString()}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{Number(record.price).toLocaleString()}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{Number(record.virTotalPrice).toLocaleString()}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{Number(record.virTotalHeinPrice).toLocaleString()}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{Number(record.virTotalPatientPrice).toLocaleString()}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{record.vatRatio}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{record.tdlServiceCode}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{Number(record.discount).toLocaleString()}</td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""} ${record.isExpend == 1 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {record.isExpend == 1 ? '✓' : '✘'}
                                                    </td>
                                                    <td className={`border-b px-2 py-1 pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`}>{record.tdlServiceReqCode}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
        </div>
    );
};

export default TestServiceReqTypeListTable;
