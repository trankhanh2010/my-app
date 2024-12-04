import React from "react";
import Select from "react-select";

const BedDetails = ({ 
    bedDetails,
    setBedDetails,
    bedTypes,
    bedRooms,
    setBedRoomKeyword,
    setBedTypeKeyword,
    handleCreate,
    handleUpdate,
}) => {
    if (!bedDetails) return <p className="text-gray-500">Chưa chọn giường</p>;
     // Hàm trung gian xử lý submit
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Ngăn việc reload trang
        if (bedDetails.id) {
            handleUpdate(bedDetails); // Gọi hàm cập nhật
        } else {
            handleCreate(bedDetails); // Gọi hàm tạo mới
        }
    };
    return (
        <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Các trường thông tin chi tiết giường */}
        <div>
            <label className="block text-sm font-medium">Mã giường</label>
            <input
                type="text"
                value={bedDetails.bedCode}
                onChange={(e) => setBedDetails({ ...bedDetails, bedCode: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                // readOnly={!!bedDetails.id} // Khóa nếu đang cập nhật
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
            <Select
                options={bedTypes.map((bedType) => ({
                    value: bedType.id,
                    label: (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: bedType.highlight?.bedTypeName
                              ? bedType.highlight.bedTypeName[0]  // Nếu có highlight, sử dụng highlight
                              : bedType.bedTypeName,         // Nếu không có highlight, sử dụng tên bình thường
                          }}
                        />
                      ),
                }))}
                value={
                    bedDetails.bedTypeId
                        ? {
                            value: bedDetails.bedTypeId,
                            label: bedTypes.find((bedType) => bedType.id == bedDetails.bedTypeId)?.bedTypeName || "",
                        }
                        : null
                }
                filterOption={() => true}  // Tắt lọc tự động từ `react-select`
                onChange={(selectedOption) =>
                    setBedDetails({ ...bedDetails, bedTypeId: selectedOption?.value })
                }
                onInputChange={(inputValue) => {
                    setBedTypeKeyword(inputValue); // Cập nhật từ khóa tìm kiếm khi người dùng nhập
                }}
                isClearable
                placeholder="Chọn loại giường"
                className="w-full"
            />
        </div>

        <div>
            <label className="block text-sm font-medium">Buồng bệnh</label>
            <Select
                options={bedRooms.map((bedRoom) => ({
                    value: bedRoom.id,
                    label: (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: bedRoom.highlight?.bedRoomName
                              ? bedRoom.highlight.bedRoomName[0]  // Nếu có highlight, sử dụng highlight
                              : bedRoom.bedRoomName,         // Nếu không có highlight, sử dụng tên bình thường
                          }}
                        />
                      ),
                }))}
                value={
                    bedDetails.bedRoomId
                        ? {
                            value: bedDetails.bedRoomId,
                            label: bedRooms.find((bedRoom) => bedRoom.id == bedDetails.bedRoomId)?.bedRoomName || "",
                        }
                        : null
                }
                filterOption={() => true}  // Tắt lọc tự động từ `react-select`
                onChange={(selectedOption) =>
                    setBedDetails({ ...bedDetails, bedRoomId: selectedOption?.value })
                }
                onInputChange={(inputValue) => {
                    setBedRoomKeyword(inputValue); // Cập nhật từ khóa tìm kiếm khi người dùng nhập
                }}
                isClearable
                placeholder="Chọn buồng bệnh"
                className="w-full"
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
                className={`py-2 px-4 rounded ${bedDetails.id ? "bg-blue-500" : "bg-green-500"} text-white`}
            >
                {bedDetails.id ? "Cập nhật" : "Thêm mới"}  {/* Hiển thị "Cập nhật" nếu có id, nếu không thì "Thêm mới" */}
            </button>
        </div>
    </form>
    );
};

export default BedDetails;
