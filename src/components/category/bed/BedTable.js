import React from "react";
import { FaLock, FaUnlock, FaCheck, FaTrash } from "react-icons/fa";
import Loading from "../../common/Info/Loading";
import ErrorInfo from "../../common/Info/ErrorInfo";
import Thead from "../../common/Data/TableList/Thead";
import GroupTd from "../../common/Data/TableList/GroupTd";

const BedTable = ({
    fieldLabels,
    format,
    data,
    convertToDate,
    handleRecordSelect,
    selectedRecord,
    setRecordDetails,
    openDeleteModal,
    openUpdateModal,
    loading,
    error,
    isProcessing,
    setReload,
}) => {
    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;
    if (isProcessing) return <Loading />;

    return (
        <div>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.bedCode, css: `w-[5%] sticky left-0 z-10` },
                        { fieldName: `Hành động`, css: `w-[22%]` },
                        { fieldName: fieldLabels.bedName, css: `w-[15%]` },
                        { fieldName: fieldLabels.isActive, css: `w-[3%]` },
                        { fieldName: fieldLabels.createTime, css: `w-[5%]` },
                        { fieldName: fieldLabels.modifyTime, css: `w-[5%]` },
                        { fieldName: fieldLabels.bedTypeCode, css: `w-[5%]` },
                        { fieldName: fieldLabels.bedTypeName, css: `w-[5%]` },
                        { fieldName: fieldLabels.bedRoomCode, css: `w-[10%]` },
                        { fieldName: fieldLabels.bedRoomName, css: `w-[10%]` },
                        { fieldName: fieldLabels.departmentCode, css: `w-[5%]` },
                        { fieldName: fieldLabels.departmentName, css: `w-[10%]` },
                    ]}
                />
                <tbody>
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record)
                                setReload(true)
                            }}
                        >
                            <GroupTd
                                fields={[
                                    { dangerouslySetInnerHTML: {__html: record.highlight?.bedCode ? record.highlight.bedCode[0] : record.bedCode, }, css: `font-bold sticky left-0 border-l-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} truncate` },
                                    { fieldValue:
                                        <div className="flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0"> 
                                            <button onClick={() => openDeleteModal(record)} className="bg-red-500 text-white p-1 rounded "><FaTrash className="inline-block mr-1 w-5 h-3" /> Xóa</button>                                     
                                            <button onClick={() => {const updatedBed = {...record, isActive: record.isActive == 1 ? 0 : 1}; setRecordDetails(updatedBed); openUpdateModal(updatedBed);}} className={`${record.isActive == 1 ? "bg-amber-500" : "bg-green-500"} text-white p-1 rounded`}>{record.isActive == 1 ? (<FaLock className="inline-block mr-1 w-5 h-3" />) : (<FaUnlock className="inline-block mr-1 w-5 h-3" />)}{record.isActive == 1 ? "Khóa" : "Mở khóa"}</button> 
                                        </div>, 
                                        css: `truncate` },
                                    { dangerouslySetInnerHTML: {__html: record.highlight?.bedName ? record.highlight.bedName[0] : record.bedName, }, css: ` truncate` },
                                    { fieldValue: <span>{record.isActive == 1 ? (<FaCheck className="text-green-500 w-5 h-3 inline-block" />) : (<FaLock className="text-red-500 w-5 h-3 inline-block" />)}</span>, css: `truncate text-center` },
                                    { fieldValue: record.createTime ? format(convertToDate(record.createTime), "dd/MM/yyyy HH:mm:ss") : "" , css: `truncate` },
                                    { fieldValue: record.modifyTime ? format(convertToDate(record.modifyTime), "dd/MM/yyyy HH:mm:ss") : "" , css: `truncate` },
                                    { fieldValue: record.bedTypeCode , css: `truncate text-center` },
                                    { fieldValue: record.bedTypeName , css: `truncate` },
                                    { dangerouslySetInnerHTML: {__html: record.highlight?.bedRoomCode ? record.highlight.bedRoomCode[0] : record.bedRoomCode, }, css: ` truncate` },
                                    { dangerouslySetInnerHTML: {__html: record.highlight?.bedRoomName ? record.highlight.bedRoomName[0] : record.bedRoomName, }, css: ` truncate` },
                                    { fieldValue: record.departmentCode , css: `truncate` },
                                    { fieldValue: record.departmentName , css: `truncate` },
                                ]}
                            />                         
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BedTable;
