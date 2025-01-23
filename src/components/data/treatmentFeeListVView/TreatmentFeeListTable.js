import React from "react";
import Loading from "../../common/Info/Loading";
import NoRecord from "../../common/Info/NoRecord";
import Thead from "../../common/Data/TableList/Thead";
import GroupTd from "../../common/Data/TableList/GroupTd";

const TestServiceReqListTable = ({
    fieldLabels,
    format,
    data,
    convertToDate,
    handleRecordSelect,
    selectedRecord,
    setTreatmentId,
    loading,
    setReload,
    setIsHelpTreatmentList,
}) => {
    if (loading) return <Loading />
    if (data.length == 0) return <NoRecord />
    const getTextColor = (record) => {
        // Nếu đang khóa
        if (record.isActive == 0) return "text-red-500";
        return "text-gray-500"; // Màu mặc định
    };
    const getTreatmentSTT = (record) => {
        if (record.feeLockTime) return <span className="text-red-500 font-semibold">Đã khóa viện phí</span>
        if (record.treatmentEndTypeId) return <span className="text-blue-500 font-semibold">Đã ra viện</span>
        return <span className="text-green-500 font-semibold">Đang điều trị</span> // Màu mặc định
    };
    return (
        <>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.treatmentCode, css: `w-[10%] sticky left-0 z-10` },
                        { fieldName: "Trạng thái", css: `w-[5%]` },
                        { fieldName: fieldLabels.patientName, css: `w-[5%]` },
                        { fieldName: fieldLabels.gender, css: `w-[5%]` },
                        { fieldName: fieldLabels.dateOfBirth, css: `w-[5%]` },
                        { fieldName: fieldLabels.patientCode, css: `w-[5%]` },
                        { fieldName: fieldLabels.address, css: `w-[5%]` },
                        { fieldName: fieldLabels.heinCardNumber, css: `w-[5%]` },
                        { fieldName: fieldLabels.patientPhone, css: `w-[5%]` },
                        { fieldName: fieldLabels.patientMilitaryRankName, css: `w-[5%]` },
                        { fieldName: fieldLabels.patientCareerName, css: `w-[5%]` },
                        { fieldName: fieldLabels.patientWorkPlaceName, css: `w-[5%]` },
                        { fieldName: fieldLabels.patientTypeName, css: `w-[5%]` },
                        { fieldName: fieldLabels.treatmentResultName, css: `w-[5%]` },
                        { fieldName: fieldLabels.feeLockLoginname, css: `w-[5%]` },
                        { fieldName: fieldLabels.feeLockTime, css: `w-[5%]` },
                        { fieldName: fieldLabels.inTime, css: `w-[10%]` },
                        { fieldName: fieldLabels.outTime, css: `w-[10%]` },
                        { fieldName: fieldLabels.creator, css: `w-[5%]` },
                    ]}
                />
                <tbody className="text-xs">
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record);
                                setTreatmentId(record.id);
                                setReload(true);
                                // Tắt hướng dẫn
                                setIsHelpTreatmentList(false)
                            }
                            }
                        >
                            <GroupTd
                                fields={[
                                    { fieldValue: record.treatmentCode, css: `font-bold sticky left-0 border-l-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} ${getTextColor(record)} truncate` },
                                    { fieldValue: getTreatmentSTT(record), css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.gender, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.dateOfBirth ? format(convertToDate(record.dateOfBirth), "dd/MM/yyyy") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.address, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.heinCardNumber, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientPhone, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientMilitaryRankName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientCareerName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientWorkPlaceName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.patientTypeName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.treatmentResultName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.feeLockLoginname, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.feeLockTime ? format(convertToDate(record.feeLockTime), "dd/MM/yyyy hh:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.inTime ? format(convertToDate(record.inTime), "dd/MM/yyyy hh:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.outTime ? format(convertToDate(record.outTime), "dd/MM/yyyy hh:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.creator, css: `${getTextColor(record)}` },
                                ]}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TestServiceReqListTable;
