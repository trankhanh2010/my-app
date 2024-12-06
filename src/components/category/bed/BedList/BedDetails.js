import React from "react";
import Select from "react-select";
import ModalConfirmUpdate from "../../../../components/common/Modal/ModalConfirmUpdate";

const BedDetails = ({ 
    selectedBed,
    bedDetails,
    setBedDetails,
    bedTypes,
    bedRooms,
    setBedRoomKeyword,
    setBedTypeKeyword,
    handleCreate,
    handleUpdate,
    openUpdateModal,
    isModalConfirmUpdateOpen,
    confirmUpdate,
    closeModalConfirmUpdate,
    calculateChanges,
}) => {
    if (!bedDetails) return <p className="text-gray-500">Chưa chọn giường</p>;
     // Hàm trung gian xử lý submit
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Ngăn việc reload trang
        if (bedDetails.id) {
            // Mở modal xác nhận
            openUpdateModal(bedDetails)
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
                onChange={(selectedOption) => {
                    const selectedBedType = bedTypes.find(bedType => bedType.id === selectedOption?.value);
                    setBedDetails({
                        ...bedDetails,
                        bedTypeId: selectedOption?.value,
                        bedTypeName: selectedBedType ? selectedBedType.bedTypeName : '',  // Cập nhật bedTypeName từ selectedBedType
                    });
                }}
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
                onChange={(selectedOption) => {
                    const selectedBedRoom = bedRooms.find(bedRoom => bedRoom.id === selectedOption?.value);
                    setBedDetails({
                        ...bedDetails,
                        bedRoomId: selectedOption?.value,
                        bedRoomName: selectedBedRoom ? selectedBedRoom.bedRoomName : '',  // Cập nhật bedTypeName từ selectedBedType
                    });
                }}
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
         {/* Modal xác nhận cập nhật */}
         <ModalConfirmUpdate
                isOpen={isModalConfirmUpdateOpen}
                onConfirm={confirmUpdate}  // Gọi confirmUpdate nếu xác nhận
                onCancel={closeModalConfirmUpdate}  // Đóng modal nếu không xác nhận
                message={`${selectedBed?.bedName} (${selectedBed?.bedCode})`} // Truyền tên giường vào modal
                changes={calculateChanges(selectedBed, bedDetails)}
        />
    </form>
    );
};

export default BedDetails;
