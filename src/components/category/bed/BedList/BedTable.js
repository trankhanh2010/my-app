import React from "react";
import { FaLock, FaCheck, FaTrash } from "react-icons/fa";

const BedTable = ({ 
    format,
    data, 
    convertToDate,
    handleBedSelect,
    handleDelete,
    selectedBed
}) => {
    return (
        <div class="relative overflow-x-auto">
        <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {/* Tiêu đề bảng */}
                    <th className="px-2 py-1 w-[5%]">Mã giường</th>
                    <th className="px-2 py-1 w-[15%]">Tên giường</th>
                    <th className="px-2 py-1 w-[3%]">Trạng thái</th>
                    <th className="px-2 py-1 w-[5%]">Ngày tạo</th>
                    <th className="px-2 py-1 w-[5%]">Ngày cập nhật</th>
                    <th className="px-2 py-1 w-[5%]">Mã loại giường</th>
                    <th className="px-2 py-1 w-[5%]">Tên loại giường</th>
                    <th className="px-2 py-1 w-[10%]">Mã buồng</th>
                    <th className="px-2 py-1 w-[10%]">Tên buồng</th>
                    <th className="px-2 py-1 w-[5%]">Mã khoa</th>
                    <th className="px-2 py-1 w-[10%]">Tên khoa</th>
                    <th className="px-2 py-1 w-[10%]">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {data.map((bed) => (
                    <tr
                        key={bed.id}
                        className={`hover:bg-gray-50 cursor-pointer ${selectedBed?.id === bed.id ? "bg-blue-100" : ""}`}
                        onClick={() => handleBedSelect(bed)}
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
                            <button
                                onClick={() => handleDelete(bed.id, bed.bedName)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                <FaTrash className="inline mr-1" /> Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default BedTable;
