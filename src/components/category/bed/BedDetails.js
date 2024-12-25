import React, { useState } from "react";
import Select from "react-select";
import ButtonCreateOrUpdate from "../../common/Button/ButtonCreateOrUpdate";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import Loading from "../../common/Info/Loading";
import InputWithSpan from "../../common/Data/UpdateRecord/InputWithSpan";
import SpanError from "../../common/Data/UpdateRecord/SpanError";
import SpanFieldName from "../../common/Data/InfoRecord/SpanFieldName";
import ReactSelectCustomList from "../../common/Custom/ReactSelect/ReactSelectCustomList";
import CheckBox from "../../common/Data/UpdateRecord/CheckBox";
import CardElement from "../../common/Master/CardElement";

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
    checkUniqueCode,
    errorUniqueCode,
    setErrorUniqueCode,
    isProcessing,
}) => {
    if (!recordDetails) return <NoRecordInfo />;
    if (isProcessing) return <Loading />;
    // Validate Form
    let debounceTimeout;
    const errors = validateForm(recordDetails);
    const handleBlur = async (code, id) => {
        // Hủy bỏ timeout cũ nếu người dùng đang tiếp tục gõ
        clearTimeout(debounceTimeout);
        setTimeout(async () => {
            setErrorUniqueCode(await checkUniqueCode(code, id));
        }, 200)
    }
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
        <form onSubmit={handleFormSubmit}>
            {/*bedCode*/}
            <CardElement>
            <div className={`flex flex-col border p-2`}>
                <InputWithSpan
                    inputName={fieldLabels.bedCode}
                    inputValue={recordDetails.bedCode}
                    inputType='text'
                    inputCss={(errors.bedCode && errors.bedCode.length > 0) || errorUniqueCode ? "border-red-500" : ""}
                    onChange={(e) => {
                        setRecordDetails({ ...recordDetails, bedCode: e.target.value });
                        handleBlur(e.target.value, recordDetails.id)
                    }}
                />
                {(errors.bedCode && errors.bedCode.length > 0) ? (<SpanError errors={errors.bedCode} />) : null}
                {errorUniqueCode ? (<SpanError error={errorUniqueCode} />) : null}
            </div>
            </CardElement>

            {/*bedName*/}
            <CardElement>
            <div className="mt-1 flex flex-col border p-2">
                <InputWithSpan
                    inputName={fieldLabels.bedName}
                    inputValue={recordDetails.bedName}
                    inputType='text'
                    inputCss={(errors.bedName && errors.bedName.length > 0) || errorUniqueCode ? "border-red-500" : ""}
                    onChange={(e) => setRecordDetails({ ...recordDetails, bedName: e.target.value })}
                />
                {(errors.bedName && errors.bedName.length > 0) ? (<SpanError errors={errors.bedName} />) : null}
            </div>
            </CardElement>

            {/*bedType*/}
            <CardElement>
            <div className="mt-1 flex flex-col border p-2">
                <SpanFieldName fieldName={fieldLabels.bedTypeName}/>
                <ReactSelectCustomList
                    recordDetails={recordDetails}
                    setRecordDetails={setRecordDetails}
                    list={bedTypes}
                    setListKeyword={setBedTypeKeyword}
                    listFieldName="bedTypeName"
                    recordFieldName="bedTypeName"
                    recordFieldId="bedTypeId"
                    errors={errors.bedTypeId && errors.bedTypeId.length > 0}
                    placeholder="Chọn loại giường"
                />
                {(errors.bedTypeId && errors.bedTypeId.length > 0) ? (<SpanError errors={errors.bedTypeId} />) : null}
            </div>
            </CardElement>

            {/*bedRoom*/}
            <CardElement>
            <div className="mt-1 flex flex-col border p-2">
                <SpanFieldName fieldName={fieldLabels.bedRoomName}/>
                <ReactSelectCustomList
                    recordDetails={recordDetails}
                    setRecordDetails={setRecordDetails}
                    list={bedRooms}
                    setListKeyword={setBedRoomKeyword}
                    listFieldName="bedRoomName"
                    recordFieldName="bedRoomName"
                    recordFieldId="bedRoomId"
                    errors={errors.bedRoomId && errors.bedRoomId.length > 0}
                    placeholder="Chọn phòng"
                />
                {(errors.bedRoomId && errors.bedRoomId.length > 0) ? (<SpanError errors={errors.bedRoomId} />) : null}
            </div>
            </CardElement>

            <CardElement>
            <div className="mt-1 flex flex-col border p-2">
                <div>
                    <div className="flex flex-row w-full items-end">
                        <div className="w-full md:w-[2/3]">
                            <InputWithSpan
                                inputName={fieldLabels.maxCapacity}
                                inputValue={recordDetails.maxCapacity}
                                inputType='number'
                                inputCss={(errors.maxCapacity && errors.maxCapacity.length > 0) || errorUniqueCode ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, maxCapacity: e.target.value })}
                            />
                        </div>
                        <div className="w-full md:w-[1/3] md:border-l ml-2 md:pl-2">
                            <div className="flex flex-col">
                                <SpanFieldName fieldName={fieldLabels.isBedStretcher}/>
                                <CheckBox
                                    checked={recordDetails.isBedStretcher === "1"}
                                    onChange={(e) => setRecordDetails({
                                        ...recordDetails,
                                        isBedStretcher: e.target.checked ? "1" : "0", // Nếu checkbox được chọn, gán "1", nếu không gán "0"
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    {(errors.maxCapacity && errors.maxCapacity.length > 0) ? (<SpanError errors={errors.maxCapacity} />) : null}
                </div>
            </div>
            </CardElement>

            <div className="flex justify-end mt-1">
                <ButtonCreateOrUpdate
                    recordDetails={recordDetails}
                    errors={errors}
                    errorUniqueCode={errorUniqueCode}
                />
            </div>

        </form>
    );
};

export default BedDetails;
