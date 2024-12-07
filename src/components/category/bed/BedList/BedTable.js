import React from "react";
import { FaLock, FaUnlock, FaCheck, FaTrash } from "react-icons/fa";
import ModalConfirmDelete from "../../../../components/common/Modal/ModalConfirmDelete";
import ModalConfirmUpdate from "../../../../components/common/Modal/ModalConfirmUpdate";

const BedTable = ({
    fieldLabels,
    format,
    data,
    convertToDate,
    handleBedSelect,
    selectedBed,
    bedDetails,
    setBedDetails,
    bedToDelete,
    closeModalConfirmDelete,
    confirmDelete,
    isModalConfirmDeleteOpen,
    openDeleteModal,
    openUpdateModal,
    isModalConfirmUpdateOpen,
    confirmUpdate,
    closeModalConfirmUpdate,
    calculateChanges,
    bedToUpdate,
}) => {
    return (
        <div class="relative overflow-x-auto">
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* Tiêu đề bảng */}
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.bedCode}</th>
                        <th className="px-2 py-1 w-[15%]">  {fieldLabels.bedName}</th>
                        <th className="px-2 py-1 w-[3%]">   {fieldLabels.isActive}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.createTime}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.modifyTime}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.bedTypeCode}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.bedTypeName}</th>
                        <th className="px-2 py-1 w-[10%]">  {fieldLabels.bedRoomCode}</th>
                        <th className="px-2 py-1 w-[10%]">  {fieldLabels.bedRoomName}</th>
                        <th className="px-2 py-1 w-[5%]">   {fieldLabels.departmentCode}</th>
                        <th className="px-2 py-1 w-[10%]">  {fieldLabels.departmentName}</th>
                        <th className="px-2 py-1 w-[22%]">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((bed) => (
                        <tr
                            key={bed.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedBed?.id === bed.id ? "bg-blue-100" : ""}`}
                            onClick={() => handleBedSelect(bed)
                            }
                        >
                            <td
                                className="border-b px-2 py-1"
                                dangerouslySetInnerHTML={{
                                    __html: bed.highlight?.bedCode
                                        ? bed.highlight.bedCode[0] // Sử dụng highlight nếu có
                                        : bed.bedCode, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td
                                className="border-b px-2 py-1"
                                dangerouslySetInnerHTML={{
                                    __html: bed.highlight?.bedName
                                        ? bed.highlight.bedName[0] // Sử dụng highlight nếu có
                                        : bed.bedName, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td className="border-b px-2 py-1">
                                <span className={`px-2 py-1 rounded text-white ${bed.isActive == 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {bed.isActive == 1 ? (
                                        <FaCheck className="text-white w-5 h-5 inline-block" />
                                    ) : (
                                        <FaLock className="text-white w-5 h-5 inline-block" />
                                    )}
                                </span>
                            </td>
                            <td className="border-b px-2 py-1">
                                {bed.createTime ? format(convertToDate(bed.createTime), "dd/MM/yyyy HH:mm") : ""}
                            </td>
                            <td className="border-b px-2 py-1">
                                {bed.modifyTime ? format(convertToDate(bed.modifyTime), "dd/MM/yyyy HH:mm") : ""}
                            </td>
                            <td className="border-b px-2 py-1">{bed.bedTypeCode}</td>
                            <td className="border-b px-2 py-1">{bed.bedTypeName}</td>
                            <td
                                className="border-b px-2 py-1"
                                dangerouslySetInnerHTML={{
                                    __html: bed.highlight?.bedRoomCode
                                        ? bed.highlight.bedRoomCode[0] // Sử dụng highlight nếu có
                                        : bed.bedRoomCode, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td
                                className="border-b px-2 py-1"
                                dangerouslySetInnerHTML={{
                                    __html: bed.highlight?.bedRoomName
                                        ? bed.highlight.bedRoomName[0] // Sử dụng highlight nếu có
                                        : bed.bedRoomName, // Nếu không có highlight thì hiển thị mã giường bình thường
                                }}
                            ></td>
                            <td className="border-b px-2 py-1">{bed.departmentCode}</td>
                            <td className="border-b px-2 py-1">{bed.departmentName}</td>
                            <td>
                                <div className="flex flex-col md:flex-row md:space-x-2">
                                    <button
                                        onClick={() => openDeleteModal(bed)}
                                        className="bg-red-500 text-white p-2 rounded mt-1 mb-1"
                                    >
                                        <FaTrash className="inline mr-1" /> Xóa
                                    </button>
                                    <button
                                        onClick={() => {
                                             // Tạo bản sao của bed và thay đổi giá trị isActive
                                            const updatedBed = {
                                                ...bed,
                                                isActive: bed.isActive == 1 ? 0 : 1, 
                                            };
                                            setBedDetails(updatedBed)
                                            openUpdateModal(updatedBed);
                                        }}
                                        className={`${bed.isActive == 1 ? "bg-amber-500" : "bg-green-500"} text-white p-2 rounded mt-1 mb-1`}
                                    >
                                        {bed.isActive == 1 ? (
                                            <FaLock className="inline mr-1" />
                                        ) : (
                                            <FaUnlock className="inline mr-1" />
                                        )}
                                        {bed.isActive == 1 ? "Khóa" : "Mở khóa"
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
                message={`${bedToDelete?.bedName} (${bedToDelete?.bedCode})`} // Truyền tên giường vào modal
            />
            {/* Modal xác nhận cập nhật */}
            <ModalConfirmUpdate
                isOpen={isModalConfirmUpdateOpen}
                onConfirm={confirmUpdate}  // Gọi confirmUpdate nếu xác nhận
                onCancel={closeModalConfirmUpdate}  // Đóng modal nếu không xác nhận
                message={`${selectedBed?.bedName} (${selectedBed?.bedCode})`} // Truyền tên giường vào modal
                changes={calculateChanges(selectedBed, bedToUpdate ?? bedDetails)}
            />
        </div>
    );
};

export default BedTable;
