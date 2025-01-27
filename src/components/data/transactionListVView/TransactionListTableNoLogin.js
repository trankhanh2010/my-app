import React, { useRef, useEffect, useState } from "react";
import Loading from "../../common/Info/Loading";
import Thead from "../../common/Data/TableList/Thead";
import GroupTd from "../../common/Data/TableList/GroupTd";
import ModalPageTransactionTTDetailNoLogin from '../../common/Modal/Page/ModalPageTransactionTTDetailNoLogin';


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

    const [isModalChiTietTTOpen, setIsModalChiTietTTOpen] = useState(false); // State để điều khiển modal chi tiết giao dịch

    const closeModalChiTietTT = () => {
        setIsModalChiTietTTOpen(false) // Đóng modal
    }

    const handleOpenModalPage = (record) => {
        if(record.transactionTypeCode == 'TT'){
            setIsModalChiTietTTOpen(true);  // Nếu isLSGD là true, mở modal
        }
    }

    const getShowButtonOpenModal = (record) => {
        if(record.transactionTypeCode == 'TT'){
            return true
        }
        return false
    }
    if (loading) return <Loading />
    const getTextColor = (record) => {
        // Màu khi khóa viện phí
        if (record.isCancel) return "line-through";
        if (record.transactionTypeCode == 'HU') return "text-red-500";
        if (record.transactionTypeCode == 'TU') return "text-green-500";
        if (record.transactionTypeCode == 'TT') return "text-blue-500";

        return "text-gray-500"; // Màu mặc định
    };
    return (
        <>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.transactionCode, css: `w-[10%] sticky left-0 z-10` },
                        { fieldName: fieldLabels.amount},
                        { fieldName: `Hành động` },
                        { fieldName: 'Trạng thái giao dịch' },
                        { fieldName: fieldLabels.kcAmount },
                        { fieldName: fieldLabels.tdlBillFundAmount },
                        { fieldName: fieldLabels.exemption },
                        { fieldName: fieldLabels.exemptionReason },
                        { fieldName: fieldLabels.roundedTotalPrice },
                        { fieldName: fieldLabels.swipeAmount },
                        { fieldName: fieldLabels.transferAmount },
                        { fieldName: fieldLabels.payFormName },
                        { fieldName: fieldLabels.bankName },
                        { fieldName: fieldLabels.bankTransactionCode },
                        { fieldName: fieldLabels.transactionTypeName },
                        { fieldName: fieldLabels.cashierUsername },
                        { fieldName: fieldLabels.transactionTime },
                        { fieldName: fieldLabels.cashierRoomName },
                        { fieldName: fieldLabels.einvoiceNumOrder },
                        { fieldName: fieldLabels.accountBookCode },
                        { fieldName: fieldLabels.accountBookName },
                        { fieldName: fieldLabels.cancelReason },
                        { fieldName: fieldLabels.cancelUsername },
                        { fieldName: fieldLabels.cancelTime },
                        { fieldName: fieldLabels.tdlTreatmentCode },
                        { fieldName: fieldLabels.tdlPatientName },
                        { fieldName: fieldLabels.tdlPatientDob },
                        { fieldName: fieldLabels.tdlPatientGenderName },
                        { fieldName: fieldLabels.tdlPatientCode },
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
                                    { fieldValue: record.transactionCode, css: `font-bold sticky left-0 border-l-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} ${getTextColor(record)} truncate` },
                                    {fieldValue:record.amount, css:`${getTextColor(record)} truncate`},
                                    {
                                        fieldValue: 
                                        <div className="flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0"> 
                                            <button
                                                onClick={() => {
                                                    handleOpenModalPage(record)
                                                }}
                                                className={`${!getShowButtonOpenModal(record) ? "opacity-0 cursor-not-allowed" : ""} px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 truncate`}
                                            >
                                                Chi tiết
                                            </button>
                                        </div>, 
                                        css: `truncate`
                                    },
                                    { fieldValue: `${record.isCancel ? 'Đã hủy' : ""}`, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.kcAmount, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlBillFundAmount, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.exemption, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.exemptionReason, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.roundedTotalPrice, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.swipeAmount, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.transferAmount, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.payFormName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.bankName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.bankTransactionCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.transactionTypeName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.cashierUsername, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.transactionTime ? format(convertToDate(record.transactionTime), "dd/MM/yyyy HH:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.cashierRoomName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.numOrder, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.accountBookCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.accountBookName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.cancelReason, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: `${record.cancelLoginname != null ? record.cancelLoginname : ""} ${record.cancelUsername != null ? record.cancelUsername : ""}`, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.cancelTime ? format(convertToDate(record.cancelTime), "dd/MM/yyyy HH:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlTreatmentCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientDob ? format(convertToDate(record.tdlPatientDob), "dd/MM/yyyy") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientGenderName, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.tdlPatientCode, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.createTime ? format(convertToDate(record.createTime), "dd/MM/yyyy HH:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.creator, css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.modifyTime ? format(convertToDate(record.modifyTime), "dd/MM/yyyy HH:mm:ss") : "", css: `${getTextColor(record)} truncate` },
                                    { fieldValue: record.modifier, css: `${getTextColor(record)} truncate` },

                                ]}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Chi tiết*/}
            <ModalPageTransactionTTDetailNoLogin
                isOpen={isModalChiTietTTOpen}
                onClose={closeModalChiTietTT}
                paramBillCode={selectedRecord?.transactionCode ?? ""}
            />
        </>
    );
};

export default TestServiceReqListTable;
