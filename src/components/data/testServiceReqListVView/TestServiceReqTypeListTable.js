import React, { useState } from "react";
import Loading from "../../common/Info/Loading";
import ErrorInfo from "../../common/Info/ErrorInfo";
import Thead from "../../common/Data/TableList/Thead";
import GroupTd from "../../common/Data/TableList/GroupTd";

const TestServiceReqTypeListTable = ({
    fieldLabels,
    testServiceTypeList,
    searchTerm,
    expandedGroups,
    setExpandedGroups,
    loadingFetchTestServiceTypeList,
    errorFetchTestServiceTypeList,
}) => {
    if (loadingFetchTestServiceTypeList) return <Loading />
    if (errorFetchTestServiceTypeList) return <ErrorInfo />
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
        <>
            {/* Phần bảng dưới */}
            <table className="table-auto w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.testServiceTypeList.tdlServiceCode, css: `w-[5%] pl-8 truncate sticky left-0 z-10` },
                        { fieldName: fieldLabels.testServiceTypeList.amount, css: `w-[5%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.price, css: `w-[10%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.virTotalPrice, css: `w-[15%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.virTotalHeinPrice, css: `w-[15%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.virTotalPatientPrice, css: `w-[15%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.vatRatio, css: `w-[2%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.tdlServiceName, css: `w-[23%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.discount, css: `w-[5%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.isExpend, css: `w-[5%] pl-8 truncate` },
                        { fieldName: fieldLabels.testServiceTypeList.tdlServiceReqCode, css: `w-[5%] pl-8 truncate` },
                    ]}
                />
                <tbody>
                    {groupedData.map((patientGroup) => (
                        <React.Fragment key={patientGroup.patientType}>
                            {/* Hiển thị tên nhóm patientType và tổng số bản ghi */}
                            <tr>
                                <td colSpan="1" className="bg-yellow-100 text-red-600 uppercase font-bold py-2 pl-2 truncate sticky left-0">
                                    <button
                                        onClick={() => togglePatientGroup(patientGroup.patientType)}
                                        className="flex items-center"
                                    >
                                        {expandedGroups.patientType[patientGroup.patientType] ? '▼' : '►'}
                                        <span className="ml-2">{patientGroup.patientType} <span className="text-black">({patientGroup.services && Object.values(patientGroup.services).flat().length})</span></span>
                                    </button>
                                </td>
                                <td colSpan="2" className="bg-yellow-100 text-red-600 uppercase font-bold py-2 pl-2"></td>
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
                                        <td colSpan="1" className="bg-gray-100 text-md text-blue-600 font-semibold py-1 pl-4 truncate sticky left-0">
                                            <button
                                                onClick={() => toggleServiceGroup(patientGroup.patientType, serviceType)}
                                                className="flex items-center"
                                            >
                                                {expandedGroups.serviceType[patientGroup.patientType]?.[serviceType] ? '▼' : '►'}
                                                <span className="ml-2">{serviceType} <span className="text-gray-600">({patientGroup.services[serviceType].length})</span></span>
                                            </button>
                                        </td>
                                        <td colSpan="2" className="bg-gray-100 text-md text-blue-600 font-semibold py-1 pl-4"></td>
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
                                            <GroupTd
                                                fields={[
                                                    {fieldValue:record.tdlServiceCode, css:`pl-8 truncate ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""} sticky left-0 bg-white`},
                                                    {fieldValue:Number(record.amount).toLocaleString(), css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:Number(record.price).toLocaleString(), css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:Number(record.price).toLocaleString(), css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:Number(record.virTotalHeinPrice).toLocaleString(), css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:Number(record.virTotalPatientPrice).toLocaleString(), css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:record.vatRatio, css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:record.tdlServiceName, css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""} truncate`},
                                                    {fieldValue:Number(record.discount).toLocaleString(), css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:<span className={`${record.isExpend == 1 ? 'text-green-600' : 'text-red-600'}`}>{record.isExpend == 1 ? '✓' : '✘'}</span>, css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                    {fieldValue:record.tdlServiceReqCode, css:`pl-8 ${Number(record.virTotalPatientPrice) == 0 ? "italic bg-green-50 text-green-400" : ""}`},
                                                ]}
                                            />          
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TestServiceReqTypeListTable;
