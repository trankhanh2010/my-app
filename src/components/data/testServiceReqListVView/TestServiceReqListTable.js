import React from "react";
import Loading from "../../common/Info/Loading";

const TestServiceReqListTable = ({
    fieldLabels,
    format,
    data,
    convertToDate,
    handleRecordSelect,
    selectedRecord,
    setPatientId,
    loading,
}) => {
    if (loading) return <Loading/>
    const getTextColor = (record) => {
        if (record.feeLockTime) return "text-red-500";
        return "text-gray-500"; // Màu mặc định
    };
    return (
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* Tiêu đề bảng */}
                        <th className="px-2 py-1 w-[5%] sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                            {fieldLabels.treatmentCode}</th>
                        <th className="px-2 py-1 w-[10%]">   {fieldLabels.patientName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.gender}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.dateOfBirth}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.patientCode}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.address}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.heinCardNumber}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.patientPhone}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.patientMilitaryRankName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.patientCareerName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.patientWorkPlaceName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.patientTypeName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.treatmentResultName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.feeLockLoginname}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.feeLockTime}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.inTime}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.outTime}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.creator}</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record);
                                setPatientId(record.tdlPatientId);
                                }
                            }
                        >
                            <td
                                className={`border-b px-2 py-1 font-bold sticky left-0 z-10 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} ${getTextColor(record)}`}
                            >
                                {record.treatmentCode}
                            </td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientName}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.gender}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>
                                {record.dateOfBirth ? format(convertToDate(record.dateOfBirth), "dd/MM/yyyy") : ""}
                            </td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientCode}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)} truncate max-w-[250px]`} title={record.address}>
                                {record.address}
                            </td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.heinCardNumber}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientPhone}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientMilitaryRankName}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientCareerName}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientWorkPlaceName}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.patientTypeName}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.treatmentResultName}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.feeLockLoginname}</td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>
                                {record.feeLockTime ? format(convertToDate(record.feeLockTime), "dd/MM/yyyy hh:mm:ss") : ""}
                            </td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>
                                {record.inTime ? format(convertToDate(record.inTime), "dd/MM/yyyy hh:mm:ss") : ""}
                            </td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>
                                {record.outTime ? format(convertToDate(record.outTime), "dd/MM/yyyy hh:mm:ss") : ""}
                            </td>
                            <td className={`border-b px-2 py-1 ${getTextColor(record)}`}>{record.creator}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default TestServiceReqListTable;
