import React, { useState } from "react";

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

    // Tổng các tiền
    const totalVirPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPrice) || 0), 0);
    const totalHeinPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalHeinPrice) || 0), 0);
    const totalOtherSourcePrice = testServiceTypeList.reduce((total, record) => total + (Number(record.otherSourcePrice) || 0), 0);
    const totalPatientPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPatientPrice) || 0), 0);
    return (
        <div className="text-xs">
            {/* Phần bảng trên */}
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[20%] md:border-r">
                    <span className="font-semibold uppercase">{fieldLabels.patientName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.patientName}</p>
                </div>
                <div className="w-full flex flex-col  md:w-[20%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.dateOfBirth}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.dateOfBirth ? format(convertToDate(recordDetails.dateOfBirth), "dd/MM/yyyy") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[15%] md:border-r">
                    <span className="font-semibold uppercase">{fieldLabels.gender}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.gender}</p>
                </div>
                <div className="w-full flex flex-col md:w-[45%]">
                    <span className="font-semibold uppercase">{fieldLabels.address}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.address}</p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[20%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.heinCardNumber}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.heinCardNumber}</p>
                </div>
                <div className="w-full flex flex-col md:w-[15%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.heinCardFromTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.heinCardFromTime ? format(convertToDate(recordDetails.heinCardFromTime), "dd/MM/yyyy") : ""} -
                    </p>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.heinCardToTime ? format(convertToDate(recordDetails.heinCardToTime), "dd/MM/yyyy") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[40%] md:border-r">
                    <span className="font-semibold uppercase">{fieldLabels.heinMediOrgName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.heinMediOrgCode} - {recordDetails.heinMediOrgName}</p>
                </div>
                <div className="w-full flex flex-col md:w-[25%]">
                    <span className="font-semibold uppercase">{fieldLabels.rightRouteCode}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.rightRouteCode === 'DT' ? "Đúng tuyến" : recordDetails.rightRouteCode === 'TT' ? "Trái tuyến" : ""}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.inTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.inTime ? format(convertToDate(recordDetails.inTime), "dd/MM/yyyy hh:mm:ss") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.clinicalInTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.clinicalInTime ? format(convertToDate(recordDetails.clinicalInTime), "dd/MM/yyyy hh:mm:ss") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.outTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.outTime ? format(convertToDate(recordDetails.outTime), "dd/MM/yyyy hh:mm:ss") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">Số ngày: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">

                        {recordDetails.inTime && recordDetails.outTime ?
                            `${Math.ceil((new Date(recordDetails.outTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6")) -
                                new Date(recordDetails.inTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6"))) / (1000 * 60 * 60 * 24))} ngày` : ""}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[50%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.icdName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.icdCode && recordDetails.icdName ? `${recordDetails.icdCode} - ${recordDetails.icdName}` : ""}</p>
                </div>
                <div className="w-full flex flex-col md:w-[50%] whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.icdText}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.icdSubCode && recordDetails.icdText ? `${recordDetails.icdSubCode} - ${recordDetails.icdText}` : ""}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[50%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.requestRoomName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.requestRoomName}</p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.treatmentEndTypeName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.treatmentEndTypeName}</p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.treatmentResultName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.treatmentResultName}</p>
                </div>
            </div>

            {/* Phần bảng dưới */}
            <div className="mt-2 w-full flex flex-col whitespace-pre-line break-words relative overflow-x-auto overflow-y-auto max-h-[50vh]">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên dịch vụ hoặc mã dịch vụ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-l border-t border-r border-gray-300 p-2 w-full"
                />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-4">
                <div className="w-full min-h-[500px] flex flex-col md:w-[75%] md:border-r whitespace-pre-line break-words relative overflow-x-auto overflow-y-auto max-h-[50vh]">
                    {loadingFetchTestServiceTypeList ? 'Đang tải dữ liệu ...' : errorFetchTestServiceTypeList ? 'Có lỗi khi tải dữ liệu' : (
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

                    )}
                </div>
                {loadingFetchTestServiceTypeList ? 'Đang tải dữ liệu' : errorFetchTestServiceTypeList ? 'Có lỗi khi tải dữ liệu' : (
                    <div className="w-full flex flex-col md:w-[25%] whitespace-pre-line break-words">
                        <div className="w-full border-b-2 pb-2">
                            <div className="border p-1">
                                <span className="font-semibold uppercase">Tổng chi phí: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">{totalVirPrice.toLocaleString()}</p>
                            </div>
                            <div className="border p-1 mt-1">
                                <span className="font-semibold uppercase">BHYT thanh toán: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">{totalHeinPrice.toLocaleString()}</p>
                            </div>
                            <div className="border p-1 mt-1">
                                <span className="font-semibold uppercase">Nguồn khác thanh toán: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">{totalOtherSourcePrice.toLocaleString()}</p>
                            </div>
                            <div className="border p-1 mt-1">
                                <span className="font-semibold uppercase">Công ty thanh toán: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">null</p>
                            </div>
                            <div className="border p-1 mt-1">
                                <span className="font-semibold uppercase">BN phải thanh toán: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">{totalPatientPrice.toLocaleString()}</p>
                            </div>
                            <div className="border p-1 mt-1">
                                <span className="font-semibold uppercase">Miễn giảm: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">null</p>
                            </div>
                        </div>
                        <div className="w-full border-b-2 pt-2 pb-2">
                            <div className="border p-1">
                                <span className="font-semibold text-red-600 uppercase">BN cần nộp thêm: </span>
                                <p className="p-1 flex-grow text-red-600 font-semibold  bg-gray-100">
                                    {(totalPatientPrice - selectedRecord.totalTreatmentBillAmount).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="w-full border-b-2 pt-2 pb-2">
                            <div className="border p-1">
                                <span className="font-semibold text-blue-600 uppercase">Đã thu: </span>
                                <p className="p-1 flex-grow text-blue-600 font-semibold  bg-gray-100">
                                    {Number(selectedRecord.totalTreatmentBillAmount).toLocaleString()}
                                </p>
                            </div>
                            <div className="border p-1 mt-1">
                                <span className="font-semibold uppercase">Tạm ứng: </span>
                                <p className="p-1 flex-grow font-semibold  bg-gray-100">
                                    {Number(selectedRecord.totalTreatmentTu).toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>)

                }
            </div>
        </div>
    );
};

export default TestServiceReqListDetails;
