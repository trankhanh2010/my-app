import React, { useState } from "react";
import Select from "react-select";
import ButtonCreateOrUpdate from "../../../../components/common/Button/ButtonCreateOrUpdate";

const BedDetails = ({
    fieldLabels,
    recordDetails,
    setRecordDetails,
    bedTypes,
    bedRooms,
    setBedRoomKeyword,
    setBedTypeKeyword,
    handleCreate,
    openUpdateModal,
    validateForm,
}) => {
    if (!recordDetails) return <p className="text-gray-500">Chưa chọn giường</p>;
    // Hàm trung gian xử lý submit
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Ngăn việc reload trang
        if (recordDetails.id) {
            // Mở modal xác nhận
            openUpdateModal(recordDetails)
        } else {
            handleCreate(recordDetails); // Gọi hàm tạo mới
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
                        value={recordDetails.bedCode}
                        onChange={(e) => setRecordDetails({ ...recordDetails, bedCode: e.target.value })}
                        className={`w-full p-2 border rounded 
                            ${validateForm(recordDetails).bedCode && validateForm(recordDetails).bedCode.length > 0 ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(recordDetails).bedCode && (
                        <div className="space-y-1 mt-1">
                            {validateForm(recordDetails).bedCode.map((errorMessage, index) => (
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
                        value={recordDetails.bedName}
                        onChange={(e) => setRecordDetails({ ...recordDetails, bedName: e.target.value })}
                        className={`w-full p-2 border rounded 
                        ${validateForm(recordDetails).bedName && validateForm(recordDetails).bedName.length > 0 ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(recordDetails).bedName && (
                        <div className="space-y-1 mt-1">
                            {validateForm(recordDetails).bedName.map((errorMessage, index) => (
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
                            recordDetails.bedTypeId
                                ? {
                                    value: recordDetails.bedTypeId,
                                    label: bedTypes.find((bedType) => bedType.id == recordDetails.bedTypeId)?.bedTypeName || "",
                                }
                                : null
                        }
                        filterOption={() => true}  // Tắt lọc tự động từ `react-select`
                        onChange={(selectedOption) => {
                            const selectedBedType = bedTypes.find(bedType => bedType.id === selectedOption?.value);
                            setRecordDetails({
                                ...recordDetails,
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
                                borderColor: `${validateForm(recordDetails).bedTypeId && validateForm(recordDetails).bedTypeId.length > 0 ? "#ef4444" : "#ccc"
                                    }`
                            }),
                        }}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(recordDetails).bedTypeId && (
                        <div className="space-y-1 mt-1">
                            {validateForm(recordDetails).bedTypeId.map((errorMessage, index) => (
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
                            recordDetails.bedRoomId
                                ? {
                                    value: recordDetails.bedRoomId,
                                    label: bedRooms.find((bedRoom) => bedRoom.id == recordDetails.bedRoomId)?.bedRoomName || "",
                                }
                                : null
                        }
                        filterOption={() => true}  // Tắt lọc tự động từ `react-select`
                        onChange={(selectedOption) => {
                            const selectedBedRoom = bedRooms.find(bedRoom => bedRoom.id === selectedOption?.value);
                            setRecordDetails({
                                ...recordDetails,
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
                                borderColor: `${validateForm(recordDetails).bedRoomId && validateForm(recordDetails).bedRoomId.length > 0 ? "#ef4444" : "#ccc"
                                    }`
                            }),
                        }}
                    />
                    {/* Thông báo lỗi*/}
                    {validateForm(recordDetails).bedRoomId && (
                        <div className="space-y-1 mt-1">
                            {validateForm(recordDetails).bedRoomId.map((errorMessage, index) => (
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
                            value={recordDetails.maxCapacity}
                            onChange={(e) => setRecordDetails({ ...recordDetails, maxCapacity: e.target.value })}
                            className={`w-full p-2 border rounded 
                            ${validateForm(recordDetails).maxCapacity && validateForm(recordDetails).maxCapacity.length > 0 ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {/* Thông báo lỗi*/}
                        {validateForm(recordDetails).maxCapacity && (
                            <div className="space-y-1 mt-1">
                                {validateForm(recordDetails).maxCapacity.map((errorMessage, index) => (
                                    <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium w-full md:w-[30%]">{fieldLabels.isBedStretcher}</label>
                    <select
                        value={recordDetails.isBedStretcher}
                        onChange={(e) => setRecordDetails({ ...recordDetails, isBedStretcher: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="1">Có</option>
                        <option value="0">Không</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end">
                <ButtonCreateOrUpdate
                    recordDetails = {recordDetails}
                    validateForm={validateForm}
                />
            </div>
            
        </form>
    );
};

export default BedDetails;
