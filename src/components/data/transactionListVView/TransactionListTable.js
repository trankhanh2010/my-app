import React, { useRef, useEffect, useState } from "react";
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
    setReload,
}) => {

    if (loading) return <Loading/>
    const getTextColor = (record) => {
        // Màu khi khóa viện phí
        if (record.isCancel) return "line-through";
        if (record.transactionTypeCode == 'HU') return "text-red-500";
        if (record.transactionTypeCode == 'TU') return "text-green-500";
        if (record.transactionTypeCode == 'TT') return "text-blue-500";

        return "text-gray-500"; // Màu mặc định
    };
    return (
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead 
                    fields={[
                            {fieldName:<div className="space-x-4 "><div className="inline-block pr-2">{fieldLabels.transactionCode}</div><div className="inline-block text-center">{fieldLabels.amount}</div></div>, css:`w-[10%] sticky left-0 z-10`},
                            // {fieldName:fieldLabels.amount},
                            {fieldName:'Trạng thái giao dịch'},
                            {fieldName:fieldLabels.kcAmount},
                            {fieldName:fieldLabels.tdlBillFundAmount},
                            {fieldName:fieldLabels.exemption},
                            {fieldName:fieldLabels.exemptionReason},
                            {fieldName:fieldLabels.roundedTotalPrice},
                            {fieldName:fieldLabels.swipeAmount},
                            {fieldName:fieldLabels.transferAmount},
                            {fieldName:fieldLabels.payFormName},
                            {fieldName:fieldLabels.bankName},
                            {fieldName:fieldLabels.bankTransactionCode},
                            {fieldName:fieldLabels.transactionTypeName},
                            {fieldName:fieldLabels.cashierUsername},
                            {fieldName:fieldLabels.transactionTime},
                            {fieldName:fieldLabels.cashierRoomName},
                            {fieldName:fieldLabels.einvoiceNumOrder},
                            {fieldName:fieldLabels.accountBookCode},
                            {fieldName:fieldLabels.accountBookName},
                            {fieldName:fieldLabels.cancelReason},
                            {fieldName:fieldLabels.cancelUsername},
                            {fieldName:fieldLabels.cancelTime},
                            {fieldName:fieldLabels.tdlTreatmentCode},
                            {fieldName:fieldLabels.tdlPatientName},
                            {fieldName:fieldLabels.tdlPatientDob},
                            {fieldName:fieldLabels.tdlPatientGenderName},
                            {fieldName:fieldLabels.tdlPatientCode},
                            {fieldName:fieldLabels.createTime},
                            {fieldName:fieldLabels.creator},
                            {fieldName:fieldLabels.modifyTime},
                            {fieldName:fieldLabels.modifier},

                    ]}
                />
                <tbody className="text-xs">
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            // onClick={() => {
                            //     handleRecordSelect(record);
                            //     setTreatmentId(record.id);
                            //     setReload(true);
                            //     }
                            // }
                        >
                            <GroupTd
                                fields={[
                                    {fieldValue:<div className={`space-x-4 h-full block truncate`}><div className={`inline-block pr-2 border-r h-full ${getTextColor(record)}`}>{record.transactionCode}</div><div className={`inline-block font-normal h-full ${getTextColor(record)}`}>{Number(record.amount).toLocaleString()}</div></div>, css:`font-bold sticky left-0 border-l-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} ${getTextColor(record)} truncate`},
                                    // {fieldValue:record.amount, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:`${record.isCancel ? 'Đã hủy' : ""}`, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.kcAmount, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.tdlBillFundAmount, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.exemption, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.exemptionReason, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.roundedTotalPrice, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.swipeAmount, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.transferAmount, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.payFormName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.bankName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.bankTransactionCode, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.transactionTypeName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.cashierUsername, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.transactionTime ? format(convertToDate(record.transactionTime), "dd/MM/yyyy") : "", css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.cashierRoomName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.numOrder, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.accountBookCode, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.accountBookName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.cancelReason, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:`${record.cancelLoginname!=null?record.cancelLoginname:""} ${record.cancelUsername!=null?record.cancelUsername:""}`, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.cancelTime ? format(convertToDate(record.cancelTime), "dd/MM/yyyy") : "", css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.tdlTreatmentCode, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.tdlPatientName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.tdlPatientDob ? format(convertToDate(record.tdlPatientDob), "dd/MM/yyyy") : "", css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.tdlPatientGenderName, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.tdlPatientCode, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.createTime ? format(convertToDate(record.createTime), "dd/MM/yyyy") : "", css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.creator, css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.modifyTime ? format(convertToDate(record.modifyTime), "dd/MM/yyyy") : "", css:`${getTextColor(record)} truncate`},
                                    {fieldValue:record.modifier, css:`${getTextColor(record)} truncate`},

                                ]}
                            />                                                                                                        
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default TestServiceReqListTable;
