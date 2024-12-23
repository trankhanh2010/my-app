import React from "react";
import Loading from "../../common/Info/Loading";
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
}) => {
    if (loading) return <Loading/>
    const getTextColor = (record) => {
        // Màu khi khóa viện phí
        if (record.feeLockTime) return "text-red-500";
        return "text-gray-500"; // Màu mặc định
    };
    return (
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead 
                    fields={[
                            {fieldName:fieldLabels.treatmentCode, css:`w-[10%] sticky left-0 z-10`},
                            {fieldName:fieldLabels.patientName, css:`w-[5%]`},
                            {fieldName:fieldLabels.gender, css:`w-[5%]`},
                            {fieldName:fieldLabels.dateOfBirth, css:`w-[5%]`},
                            {fieldName:fieldLabels.patientCode, css:`w-[5%]`},
                            {fieldName:fieldLabels.address, css:`w-[5%]`},
                            {fieldName:fieldLabels.heinCardNumber, css:`w-[5%]`},
                            {fieldName:fieldLabels.patientPhone, css:`w-[5%]`},
                            {fieldName:fieldLabels.patientMilitaryRankName, css:`w-[5%]`},
                            {fieldName:fieldLabels.patientCareerName, css:`w-[5%]`},
                            {fieldName:fieldLabels.patientWorkPlaceName, css:`w-[5%]`},
                            {fieldName:fieldLabels.patientTypeName, css:`w-[5%]`},
                            {fieldName:fieldLabels.treatmentResultName, css:`w-[5%]`},
                            {fieldName:fieldLabels.feeLockLoginname, css:`w-[5%]`},
                            {fieldName:fieldLabels.feeLockTime, css:`w-[5%]`},
                            {fieldName:fieldLabels.inTime, css:`w-[10%]`},
                            {fieldName:fieldLabels.outTime, css:`w-[10%]`},
                            {fieldName:fieldLabels.creator, css:`w-[5%]`},
                    ]}
                />
                <tbody className="text-xs">
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record);
                                setTreatmentId(record.treatmentId);
                                }
                            }
                        >
                            <GroupTd
                                fields={[
                                    {fieldValue:record.treatmentCode, css:`font-bold sticky left-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} ${getTextColor(record)}`},
                                    {fieldValue:record.patientName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.gender, css:`${getTextColor(record)}`},
                                    {fieldValue:record.dateOfBirth ? format(convertToDate(record.dateOfBirth), "dd/MM/yyyy") : "", css:`${getTextColor(record)}`},
                                    {fieldValue:record.patientCode, css:`${getTextColor(record)}`},
                                    {fieldValue:record.address, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.heinCardNumber, css:`${getTextColor(record)}`},
                                    {fieldValue:record.patientPhone, css:`${getTextColor(record)}`},
                                    {fieldValue:record.patientMilitaryRankName, css:`${getTextColor(record)}`},
                                    {fieldValue:record.patientCareerName, css:`${getTextColor(record)}`},
                                    {fieldValue:record.patientWorkPlaceName, css:`${getTextColor(record)}`},
                                    {fieldValue:record.patientTypeName, css:`${getTextColor(record)}`},
                                    {fieldValue:record.treatmentResultName, css:`${getTextColor(record)}`},
                                    {fieldValue:record.feeLockLoginname, css:`${getTextColor(record)}`},
                                    {fieldValue:record.feeLockTime ? format(convertToDate(record.feeLockTime), "dd/MM/yyyy hh:mm:ss") : "", css:`${getTextColor(record)}`},
                                    {fieldValue:record.inTime ? format(convertToDate(record.inTime), "dd/MM/yyyy hh:mm:ss") : "", css:`${getTextColor(record)}`},
                                    {fieldValue:record.outTime ? format(convertToDate(record.outTime), "dd/MM/yyyy hh:mm:ss") : "", css:`${getTextColor(record)}`},
                                    {fieldValue:record.creator, css:`${getTextColor(record)}`},
                                ]}
                            />                                                                                                        
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default TestServiceReqListTable;
