import React, { useState, useEffect } from "react";
import bedService from "../../../services/bedService";
import { format, parse } from "date-fns";
import { FaLock, FaCheck } from 'react-icons/fa';
import config from "../../../config";

const isDB = config.apiService.bed.typeGetApi === 'db';
const isElastic = config.apiService.bed.typeGetApi === 'elastic';
const BedList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [orderBy, setOrderBy] = useState("modifyTime");
    const [orderDirection, setOrderDirection] = useState("desc");
    const [keyword, setKeyword] = useState(null);

    const [selectedBed, setSelectedBed] = useState(null);
    const [bedDetails, setBedDetails] = useState(null);

    const start = (page - 1) * limit;

    const fetchData = async () => {
        try {
            const beds = await bedService.getBeds(start, limit, orderBy, orderDirection, keyword || null);
            //  console.log(config);
            // console.log(config.config.laravelAppApiUrl);
            // console.log(config.apiService.bed.typeGetApi); 
            // console.log("Data fetched:", beds.data); // Debug dữ liệu
            // console.log("Data fetched:", beds.param.Count); // Debug dữ liệu
            if(isDB){
                setData(beds.data); 
            }
            if(isElastic){
                setData(beds.data.map((item) => item._source));
            }
            setTotalItems(beds.param.Count); // Tổng bản ghi
            setLoading(false);

            if (!selectedBed && beds.length > 0) {
                setSelectedBed(beds[0]); // Chọn bản ghi đầu tiên nếu chưa có bản ghi nào được chọn
                setBedDetails(beds[0]);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoading(false);
        }
    };

    const handleBedSelect = (bed) => {
        setSelectedBed(bed);
        setBedDetails(bed);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gửi dữ liệu đến API để lưu lại thông tin giường đã chỉnh sửa
        try {
            // Gọi API cập nhật thông tin giường
            const param = {
                CommonParam: {
                    Elastic: false,
                },
                ApiData: {
                    ...bedDetails,
                },
            };

            const paramBase64 = btoa(JSON.stringify(param)); // Mã hóa base64
            await bedService.updateBed(paramBase64); // Sử dụng dịch vụ để gửi dữ liệu
            alert("Cập nhật thông tin giường thành công");
        } catch (err) {
            console.error("Lỗi khi cập nhật thông tin giường:", err);
            alert("Lỗi khi cập nhật thông tin giường");
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
          fetchData();
        }, 200); // Chờ 200ms trước khi gọi API
    
        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
      }, [page, limit, orderBy, orderDirection, keyword]); // Gọi lại khi có thay đổi

    if (loading) return <p className="text-center text-xl">Đang tải dữ liệu...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Hàm chuyển đổi chuỗi thời gian "YYYYMMDDHHMMSS" thành đối tượng Date
    const convertToDate = (dateString) => {
        if (!dateString) return null;
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const hour = dateString.substring(8, 10);
        const minute = dateString.substring(10, 12);
        const second = dateString.substring(12, 14);

        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    };
    const totalPages = Math.ceil(totalItems / limit);
    return (
        <div className="flex flex-wrap gap-8 w-full p-4">
            <div className="w-full md:w-8/12"> {/* Đảm bảo phần danh sách giường chiếm toàn bộ chiều rộng trên màn hình nhỏ */}
                <div className="mb-4 flex flex-wrap gap-4">
                    {/* Các phần tử lọc và sắp xếp */}
                    <div className="flex items-center">
                        <label className="mr-2">Trang:</label>
                        <input
                            type="number"
                            value={page}
                            min="1"
                            max={totalPages || 1} // Giới hạn số trang không quá tổng số trang
                            onChange={(e) => setPage(parseInt(e.target.value))}
                            className="p-2 border border-gray-300 rounded w-[6rem]"
                        />
                        <span className="ml-2 w-[6rem]">/{totalPages || 0}</span> {/* Hiển thị tổng số trang hoặc 0 nếu không có bản ghi */}
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Số bản ghi trên mỗi trang:</label>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(parseInt(e.target.value))}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} // Cập nhật giá trị keyword
                        placeholder="Nhập từ khóa tìm kiếm"
                    />
                    <div className="flex items-center">
                        <label className="mr-2">Sắp xếp theo:</label>
                        <select
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="bedCode">Mã giường</option>
                            <option value="bedName">Tên giường</option>
                            <option value="createTime">Ngày tạo</option>
                            <option value="modifyTime">Ngày sửa</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Hướng:</label>
                        <select
                            value={orderDirection}
                            onChange={(e) => setOrderDirection(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="asc">Tăng dần</option>
                            <option value="desc">Giảm dần</option>
                        </select>
                    </div>
                    <button
                        onClick={fetchData}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Lọc
                    </button>
                </div>
                <div className="mt-4 flex justify-between mb-4">
                    {/* Phân trang */}
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                        className="bg-gray-300 p-2 rounded disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <div className="mt-4 flex items-center">
                        <span className="text-sm font-medium">Tổng số bản ghi: {totalItems}</span>
                    </div>
                    <button
                        onClick={() => setPage(page + 1)}
                        className="bg-gray-300 p-2 rounded"
                    >
                        Trang sau
                    </button>
                </div>
                <div class="relative overflow-x-auto">
                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((bed) => (
                                <tr
                                    key={bed.id}
                                    className={`hover:bg-gray-50 cursor-pointer ${selectedBed?.id === bed.id ? "bg-blue-100" : ""}`}
                                    onClick={() => handleBedSelect(bed)}
                                >
                                    <td className="border-b px-2 py-1">{bed.bedCode}</td>
                                    <td className="border-b px-2 py-1">{bed.bedName}</td>
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
                                    <td className="border-b px-2 py-1">{bed.bedRoomCode}</td>
                                    <td className="border-b px-2 py-1">{bed.bedRoomName}</td>
                                    <td className="border-b px-2 py-1">{bed.departmentCode}</td>
                                    <td className="border-b px-2 py-1">{bed.departmentName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full md:w-auto border-l border-gray-300 pl-4 mt-4 md:mt-0 flex-grow">
                <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>
                {bedDetails ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Các trường thông tin chi tiết giường */}
                        <div>
                            <label className="block text-sm font-medium">Mã giường</label>
                            <input
                                type="text"
                                value={bedDetails.bedCode}
                                onChange={(e) => setBedDetails({ ...bedDetails, bedCode: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Tên giường</label>
                            <input
                                type="text"
                                value={bedDetails.bedName}
                                onChange={(e) => setBedDetails({ ...bedDetails, bedName: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Loại giường</label>
                            <input
                                type="text"
                                value={bedDetails.bedTypeId}
                                onChange={(e) => setBedDetails({ ...bedDetails, bedTypeId: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Buồng bệnh</label>
                            <input
                                type="text"
                                value={bedDetails.bedRoomName}
                                onChange={(e) => setBedDetails({ ...bedDetails, bedRoomId: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Sức chứa</label>
                            <input
                                type="text"
                                value={bedDetails.maxCapacity}
                                onChange={(e) => setBedDetails({ ...bedDetails, maxCapacity: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Giường cáng</label>
                            <select
                                value={bedDetails.isBedStretcher}
                                onChange={(e) => setBedDetails({ ...bedDetails, isBedStretcher: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="1">Có</option>
                                <option value="0">Không</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="text-gray-500">Chưa chọn giường</p>
                )}
            </div>
        </div>

    );
};

export default BedList;
