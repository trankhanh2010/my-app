import React from "react";
import { FaLock, FaUnlock, FaCheck, FaTrash } from "react-icons/fa";
import ModalConfirmDelete from "../../common/Modal/ModalConfirmDelete";
import ModalConfirmUpdate from "../../common/Modal/ModalConfirmUpdate";
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
    recordDetails,
    setRecordDetails,
    recordToDelete,
    closeModalConfirmDelete,
    confirmDelete,
    isModalConfirmDeleteOpen,
    openDeleteModal,
    openUpdateModal,
    isModalConfirmUpdateOpen,
    confirmUpdate,
    closeModalConfirmUpdate,
    calculateChanges,
    recordToUpdate,
    loading,
    error,
    isProcessing,
}) => {
    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;
    if (isProcessing) return <Loading />;

    return (
        <div>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.bedCode, css: `px-2 py-4 w-[5%] sticky left-0 z-10` },
                        { fieldName: fieldLabels.bedName, css: `px-2 py-4 w-[15%]` },
                        { fieldName: fieldLabels.isActive, css: `px-2 py-4 w-[3%]` },
                        { fieldName: fieldLabels.createTime, css: `px-2 py-4 w-[5%]` },
                        { fieldName: fieldLabels.modifyTime, css: `px-2 py-4 w-[5%]` },
                        { fieldName: fieldLabels.bedTypeCode, css: `px-2 py-4 w-[5%]` },
                        { fieldName: fieldLabels.bedTypeName, css: `px-2 py-4 w-[5%]` },
                        { fieldName: fieldLabels.bedRoomCode, css: `px-2 py-4 w-[10%]` },
                        { fieldName: fieldLabels.bedRoomName, css: `px-2 py-4 w-[10%]` },
                        { fieldName: fieldLabels.departmentCode, css: `px-2 py-4 w-[5%]` },
                        { fieldName: fieldLabels.departmentName, css: `px-2 py-4 w-[10%]` },
                        { fieldName: `Hành động`, css: `px-2 py-4 w-[22%]` },
                    ]}
                />
                <tbody>
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => handleRecordSelect(record)
                            }
                        >
                            <GroupTd
                                fields={[
                                    { dangerouslySetInnerHTML: {__html: record.highlight?.bedCode ? record.highlight.bedCode[0] : record.bedCode, }, css: `font-bold sticky left-0 ${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} truncate` },
                                ]}
                            />
                            <td
                                className="border-b px-2 py-1 truncate"
                                dangerouslySetInnerHTML={{
                                    __html: record.highlight?.bedName
                                        ? record.highlight.bedName[0] // Sử dụng highlight nếu có
                                        : record.bedName, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td className="border-b px-2 py-1 truncate">
                                <span className={`px-2 py-1 rounded text-white ${record.isActive == 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {record.isActive == 1 ? (
                                        <FaCheck className="text-white w-5 h-5 inline-block" />
                                    ) : (
                                        <FaLock className="text-white w-5 h-5 inline-block" />
                                    )}
                                </span>
                            </td>
                            <td className="border-b px-2 py-1 truncate">
                                {record.createTime ? format(convertToDate(record.createTime), "dd/MM/yyyy HH:mm:ss") : ""}
                            </td>
                            <td className="border-b px-2 py-1 truncate">
                                {record.modifyTime ? format(convertToDate(record.modifyTime), "dd/MM/yyyy HH:mm:ss") : ""}
                            </td>
                            <td className="border-b px-2 py-1 truncate">{record.bedTypeCode}</td>
                            <td className="border-b px-2 py-1 truncate">{record.bedTypeName}</td>
                            <td
                                className="border-b px-2 py-1 truncate"
                                dangerouslySetInnerHTML={{
                                    __html: record.highlight?.bedRoomCode
                                        ? record.highlight.bedRoomCode[0] // Sử dụng highlight nếu có
                                        : record.bedRoomCode, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td
                                className="border-b px-2 py-1 truncate"
                                dangerouslySetInnerHTML={{
                                    __html: record.highlight?.bedRoomName
                                        ? record.highlight.bedRoomName[0] // Sử dụng highlight nếu có
                                        : record.bedRoomName, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td className="border-b px-2 py-1 truncate">{record.departmentCode}</td>
                            <td className="border-b px-2 py-1 truncate">{record.departmentName}</td>
                            <td>
                                <div className="flex flex-col md:flex-row md:space-x-2 truncate">
                                    <button
                                        onClick={() => openDeleteModal(record)}
                                        className="bg-red-500 text-white p-2 rounded mt-1 mb-1"
                                    >
                                        <FaTrash className="inline mr-1" /> Xóa
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Tạo bản sao của bed và thay đổi giá trị isActive
                                            const updatedBed = {
                                                ...record,
                                                isActive: record.isActive == 1 ? 0 : 1,
                                            };
                                            setRecordDetails(updatedBed)
                                            openUpdateModal(updatedBed);
                                        }}
                                        className={`${record.isActive == 1 ? "bg-amber-500" : "bg-green-500"} text-white p-2 rounded mt-1 mb-1`}
                                    >
                                        {record.isActive == 1 ? (
                                            <FaLock className="inline mr-1" />
                                        ) : (
                                            <FaUnlock className="inline mr-1" />
                                        )}
                                        {record.isActive == 1 ? "Khóa" : "Mở khóa"
                                        }
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal xác nhận xóa */}
            <ModalConfirmDelete
                isOpen={isModalConfirmDeleteOpen}
                onConfirm={confirmDelete}  // Gọi confirmDelete nếu xác nhận
                onCancel={closeModalConfirmDelete}  // Đóng modal nếu không xác nhận
                message={`${recordToDelete?.bedName} (${recordToDelete?.bedCode})`} // Truyền tên giường vào modal
            />
            {/* Modal xác nhận cập nhật */}
            <ModalConfirmUpdate
                isOpen={isModalConfirmUpdateOpen}
                onConfirm={confirmUpdate}  // Gọi confirmUpdate nếu xác nhận
                onCancel={closeModalConfirmUpdate}  // Đóng modal nếu không xác nhận
                message={`${selectedRecord?.bedName} (${selectedRecord?.bedCode})`} // Truyền tên giường vào modal
                changes={calculateChanges(selectedRecord, recordToUpdate ?? recordDetails)}
            />
        </div>
    );
};

export default BedTable;
