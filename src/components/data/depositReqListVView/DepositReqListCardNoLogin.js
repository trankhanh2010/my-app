import React, { useRef, useEffect, useState } from "react";
import Loading from "../../common/Info/Loading";
import NoRecord from "../../common/Info/NoRecord";
import Thead from "../../common/Data/TableList/Thead";
import GroupTd from "../../common/Data/TableList/GroupTd";
import ModalPageDepositReqDetailNoLogin from '../../common/Modal/Page/ModalPageDepositReqDetailNoLogin';
import PayIcon from "../../common/Icon/PayIcon";
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
        setReload(true) // Tải lại dữ liệu
    }

    const handleOpenModalPage = (record) => {
        setIsModalChiTietTTOpen(true);  // Nếu isLSGD là true, mở modal
    }

    if (loading) return <Loading />
    const getTextColor = (record) => {
        return "text-gray-500"; // Màu mặc định
    };
    if(data.length == 0) return <NoRecord/>
    return (
        <>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.amount },
                        { fieldName: 'Thao tác'},
                        { fieldName: fieldLabels.depositReqCode},
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
                                    { fieldValue: Number(record.amount).toLocaleString(), css: `${getTextColor(record)} truncate text-red-500 font-semibold` },
                                    { fieldValue: <button onClick={() => {handleOpenModalPage(record)}} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded "><PayIcon/> Thanh toán</button> , css: `font-bold ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} truncate`},
                                    { fieldValue: record.depositReqCode, css: `${getTextColor(record)} truncate`},
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

            {/* Modal Chi tiết*/}
            <ModalPageDepositReqDetailNoLogin
                isOpen={isModalChiTietTTOpen}
                onClose={closeModalChiTietTT}
                paramDepositReqId={selectedRecord?.id ?? ""}
            />
        </>
    );
};

export default TestServiceReqListTable;
