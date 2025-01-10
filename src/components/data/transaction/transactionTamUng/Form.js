import React, { useState } from "react";
import ButtonCreateOrUpdate from "../../../common/Button/ButtonCreateOrUpdate";
import NoRecordInfo from "../../../common/Info/NoRecordInfo";
import Loading from "../../../common/Info/Loading";
import SpanError from "../../../common/Data/UpdateRecord/SpanError";
import SpanFieldName from "../../../common/Data/InfoRecord/SpanFieldName";
import ReactSelectCustomList from "../../../common/Custom/ReactSelect/ReactSelectCustomList";
import CardElement from "../../../common/Master/CardElement";
import InputWithSpan from "../../../common/Data/UpdateRecord/InputWithSpan";
import TextAreaWithSpan from "../../../common/Data/UpdateRecord/TextAreaWithSpan";

const Component = ({
    fieldLabels,
    recordDetails,
    setRecordDetails,
    accountBooks,
    setAccountBookKeyword,
    payForms,
    setPayFormKeyword,
    cashierRooms,
    setCashierRoomKeyword,
    validateForm,
    isProcessing,
    loadingRecord,
    handleFormSubmit,
    parseNumberToLocalString,
}) => {
    if (isProcessing) return <Loading />;
    if (loadingRecord) return <Loading />;
    if (!recordDetails) return <NoRecordInfo />
    // Validate Form
    const errors = validateForm(recordDetails);
    const isPayForm03 = recordDetails['payFormCode']=='03';
    const isPayForm06 = recordDetails['payFormCode']=='06';
    return (
        <form onSubmit={handleFormSubmit}>
            {/* amount */}
            <div className="flex md:flex-row flex-col md:space-x-1 flex-grow">
                <div className="md:w-[50%] flex flex-grow flex-col">
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.amount}
                                inputValue={Number(recordDetails.amount).toLocaleString()} // Định dạng số khi hiển thị
                                inputType='text' // Đặt type là text để định dạng
                                inputCss={(errors.amount && errors.amount.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, amount: parseNumberToLocalString(e.target.value)})} // Chuyển từ chuỗi định dạng về số khi set data
                            />
                            {(errors.amount && errors.amount.length > 0) ? (<SpanError errors={errors.amount} />) : null}
                        </div>
                    </CardElement>

                    {/* cashierRoom */}
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <SpanFieldName fieldName={fieldLabels.cashierRoomName} />
                            <ReactSelectCustomList
                                recordDetails={recordDetails}
                                setRecordDetails={setRecordDetails}
                                list={cashierRooms}
                                setListKeyword={setCashierRoomKeyword}
                                listFieldName="cashierRoomName"
                                recordFieldName="cashierRoomName"
                                listFieldCode="cashierRoomCode" // dùng để kiểm tra khi người dùng nhập tiền
                                recordFieldCode="cashierRoomCode" // dùng để kiểm tra khi người dùng nhập tiền
                                recordFieldId="cashierRoomId"
                                errors={errors.cashierRoomId && errors.cashierRoomId.length > 0}
                                placeholder="Chọn hình thức thanh toán"
                                createOrUpdate={true}
                            />
                            {(errors.cashierRoomId && errors.cashierRoomId.length > 0) ? (<SpanError errors={errors.cashierRoomId} />) : null}
                        </div>
                    </CardElement>

                    {/* accountBook */}
                    <CardElement className="flex flex-grow">
                        <div className="mt-1 flex flex-col border p-2 flex-grow">
                            <SpanFieldName fieldName={fieldLabels.accountBookName} />
                            <ReactSelectCustomList
                                recordDetails={recordDetails}
                                setRecordDetails={setRecordDetails}
                                list={accountBooks}
                                setListKeyword={setAccountBookKeyword}
                                listFieldName="accountBookName"
                                recordFieldName="accountBookName"
                                listFieldCode="accountBookCode"
                                recordFieldCode="accountBookCode"
                                recordFieldId="accountBookId"
                                errors={errors.accountBookId && errors.accountBookId.length > 0}
                                placeholder="Chọn sổ thu chi"
                                createOrUpdate={true}
                            />
                            {(errors.accountBookId && errors.accountBookId.length > 0) ? (<SpanError errors={errors.accountBookId} />) : null}
                        </div>
                    </CardElement>
                </div>
                <div className="md:w-[50%] flex flex-grow flex-col">
                    {/* payForm */}
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <SpanFieldName fieldName={fieldLabels.payFormName} />
                            <ReactSelectCustomList
                                recordDetails={recordDetails}
                                setRecordDetails={setRecordDetails}
                                list={payForms}
                                setListKeyword={setPayFormKeyword}
                                listFieldName="payFormName"
                                recordFieldName="payFormName"
                                listFieldCode="payFormCode" // dùng để kiểm tra khi người dùng nhập tiền
                                recordFieldCode="payFormCode" // dùng để kiểm tra khi người dùng nhập tiền
                                recordFieldId="payFormId"
                                errors={errors.payFormId && errors.payFormId.length > 0}
                                placeholder="Chọn hình thức thanh toán"
                                createOrUpdate={true}
                            />
                            {(errors.payFormId && errors.payFormId.length > 0) ? (<SpanError errors={errors.payFormId} />) : null}
                        </div>
                    </CardElement>

                    {/* swipeAmount */}
                    <CardElement className={`flex flex-grow ${isPayForm06?"":"opacity-50"}`}>
                        <div className={`mt-1 flex flex-col border p-2 flex-grow ${isPayForm06?"":"cursor-not-allowed"}`}>
                            <InputWithSpan
                                inputName={fieldLabels.swipeAmount}
                                inputValue={Number(recordDetails.swipeAmount).toLocaleString()} // Định dạng số khi hiển thị
                                inputType='text' // Đặt type là text để định dạng
                                inputCss={`(errors.swipeAmount && errors.swipeAmount.length > 0) ? "border-red-500" : "" ${isPayForm06?"":"cursor-not-allowed pointer-events-none"}`}
                                onChange={(e) => setRecordDetails({ ...recordDetails, swipeAmount: parseNumberToLocalString(e.target.value) })} // Chuyển từ chuỗi định dạng về số khi set data
                            />
                            {(errors.swipeAmount && errors.swipeAmount.length > 0) ? (<SpanError errors={errors.swipeAmount} />) : null}
                        </div>
                    </CardElement>

                    {/* transferAmount */}
                    <CardElement className={`flex flex-grow ${isPayForm03?"":"opacity-50"}`}>
                        <div className={`mt-1 flex flex-col border p-2 flex-grow ${isPayForm03?"":"cursor-not-allowed"}`}>
                            <InputWithSpan
                                inputName={fieldLabels.transferAmount}
                                inputValue={Number(recordDetails.transferAmount).toLocaleString()} // Định dạng số khi hiển thị
                                inputType='text' // Đặt type là text để định dạng
                                inputCss={`(errors.transferAmount && errors.transferAmount.length > 0) ? "border-red-500" : "" ${isPayForm03?"":"cursor-not-allowed pointer-events-none"}`}
                                onChange={(e) => setRecordDetails({ ...recordDetails, transferAmount: parseNumberToLocalString(e.target.value) })} // Chuyển từ chuỗi định dạng về số khi set data
                            />
                            {(errors.transferAmount && errors.transferAmount.length > 0) ? (<SpanError errors={errors.transferAmount} />) : null}
                        </div>
                    </CardElement>
                </div>
            </div>

            {/* description */}
            <CardElement>
                <div className="mt-1 flex flex-col border p-2">
                    <TextAreaWithSpan
                        inputName={fieldLabels.description}
                        inputValue={recordDetails.description}
                        inputType='text'
                        inputCss={(errors.description && errors.description.length > 0) ? "border-red-500" : ""}
                        onChange={(e) => setRecordDetails({ ...recordDetails, description: e.target.value })}
                    />
                    {(errors.description && errors.description.length > 0) ? (<SpanError errors={errors.description} />) : null}
                </div>
            </CardElement>
            {/* treatmentId */}
            <div className="flex mt-1">
                {(errors.treatmentId && errors.treatmentId.length > 0) ? (<SpanError errors={errors.treatmentId} />) : null}
            </div>
            <div className="flex mt-1">
                <ButtonCreateOrUpdate
                    recordDetails={recordDetails}
                    errors={errors}
                />
            </div>

        </form>
    );
};

export default Component;
