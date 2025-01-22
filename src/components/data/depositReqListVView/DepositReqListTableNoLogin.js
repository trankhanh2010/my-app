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

    if (loading) return <Loading />
    const getTextColor = (record) => {
        return "text-gray-500"; // Màu mặc định
    };
    return (
        <>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.depositReqCode, css: `w-[10%] sticky left-0 z-10` },
                        { fieldName: fieldLabels.amount },
                        { fieldName: fieldLabels.treatmentCode },
                        { fieldName: fieldLabels.tdlPatientCode },
                        { fieldName: fieldLabels.tdlPatientName },
                        { fieldName: fieldLabels.tdlPatientDob },
                        { fieldName: fieldLabels.room },
                        { fieldName: fieldLabels.department },
                        { fieldName: fieldLabels.createTime },
                        { fieldName: fieldLabels.creator },
                        { fieldName: fieldLabels.modifyTime },
                        { fieldName: fieldLabels.modifier },
                    ]}
                />
                <tbody className="text-xs">
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record);
                            }}
                        >
                            <GroupTd
                                fields={[
                                    { fieldValue: record.depositReqCode, css: `font-bold sticky left-0 border-l-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} truncate`},
                                    { fieldValue: Number(record.amount).toLocaleString(), css: `${getTextColor(record)} truncate text-red-500 font-semibold` },
                                    { fieldValue: record.treatmentCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientDob ? format(convertToDate(record.tdlPatientDob), "dd/MM/yyyy") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.roomCode+' - '+record.roomName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.departmentCode+' - '+record.departmentName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.createTime ? format(convertToDate(record.createTime), "dd/MM/yyyy") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.creator, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.modifyTime ? format(convertToDate(record.modifyTime), "dd/MM/yyyy") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.modifier, css: `${getTextColor(record)} truncate` },
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
