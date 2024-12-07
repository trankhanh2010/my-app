import React, { useState } from "react";
import Select from "react-select";
import ModalConfirmUpdate from "../../../../components/common/Modal/ModalConfirmUpdate";

const BedDetails = ({
    fieldLabels,
    fieldConfig,
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
    handleBedSelect,
    validateForm,
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
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.bedCode}</label>
                <div className="w-full">
                    <input
                        type="text"
                        value={bedDetails.bedCode}
                        onChange={(e) => setBedDetails({ ...bedDetails, bedCode: e.target.value })}
                        className={`w-full p-2 border rounded 
                            ${validateForm(bedDetails).bedCode && validateForm(bedDetails).bedCode.length > 0 ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(bedDetails).bedCode && (
                        <div className="space-y-1 mt-1">
                            {validateForm(bedDetails).bedCode.map((errorMessage, index) => (
                                <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.bedName}</label>
                <div className="w-full">
                    <input
                        type="text"
                        value={bedDetails.bedName}
                        onChange={(e) => setBedDetails({ ...bedDetails, bedName: e.target.value })}
                        className={`w-full p-2 border rounded 
                        ${validateForm(bedDetails).bedName && validateForm(bedDetails).bedName.length > 0 ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(bedDetails).bedName && (
                        <div className="space-y-1 mt-1">
                            {validateForm(bedDetails).bedName.map((errorMessage, index) => (
                                <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.bedTypeName}</label>
                <div className="w-full">
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
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: `${validateForm(bedDetails).bedTypeId && validateForm(bedDetails).bedTypeId.length > 0 ? "#ef4444" : "#ccc"
                                    }`
                            }),
                        }}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(bedDetails).bedTypeId && (
                        <div className="space-y-1 mt-1">
                            {validateForm(bedDetails).bedTypeId.map((errorMessage, index) => (
                                <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.bedRoomName}</label>
                <div className="w-full">
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
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: `${validateForm(bedDetails).bedRoomId && validateForm(bedDetails).bedRoomId.length > 0 ? "#ef4444" : "#ccc"
                                    }`
                            }),
                        }}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(bedDetails).bedRoomId && (
                        <div className="space-y-1 mt-1">
                            {validateForm(bedDetails).bedRoomId.map((errorMessage, index) => (
                                <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2">
                <div className="w-full">
                    <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.maxCapacity}</label>
                    <div className="w-full">
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={bedDetails.maxCapacity}
                            onChange={(e) => setBedDetails({ ...bedDetails, maxCapacity: e.target.value })}
                            className={`w-full p-2 border rounded 
                            ${validateForm(bedDetails).maxCapacity && validateForm(bedDetails).maxCapacity.length > 0 ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {/* Thông báo lỗi*/}
                        {validateForm(bedDetails).maxCapacity && (
                            <div className="space-y-1 mt-1">
                                {validateForm(bedDetails).maxCapacity.map((errorMessage, index) => (
                                    <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.isBedStretcher}</label>
                    <select
                        value={bedDetails.isBedStretcher}
                        onChange={(e) => setBedDetails({ ...bedDetails, isBedStretcher: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="1">Có</option>
                        <option value="0">Không</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    disabled={Object.keys(validateForm(bedDetails)).length > 0}
                    type="submit"
                    className={`py-2 px-4 rounded 
                        ${bedDetails.id ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}
                        text-white 
                        ${Object.keys(validateForm(bedDetails)).length > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
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
