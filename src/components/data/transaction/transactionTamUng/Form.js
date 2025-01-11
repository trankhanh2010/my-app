import React, { useState } from "react";
import ButtonCreateOrUpdate from "../../../common/Button/ButtonCreateOrUpdate";
import NoRecordInfo from "../../../common/Info/NoRecordInfo";
import Loading from "../../../common/Info/Loading";
import SpanError from "../../../common/Data/UpdateRecord/SpanError";
import SpanFieldName from "../../../common/Data/InfoRecord/SpanFieldName";
import ReactSelectCustomList from "../../../common/Custom/ReactSelect/ReactSelectCustomList";
import CardElement from "../../../common/Master/CardElement";
import Card from "../../../common/Master/Card";
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
    loadingAccountBook,
    loadingPayForm,
    loadingCashierRoom,
}) => {
    if (isProcessing) return <Loading />;
    if (loadingRecord) return <Loading />;
    if (!recordDetails) return <NoRecordInfo />
    // Validate Form
    const errors = validateForm(recordDetails);
    const isPayForm03 = recordDetails['payFormCode'] == '03';
    const isPayForm06 = recordDetails['payFormCode'] == '06';
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex md:flex-row flex-col md:space-x-1 flex-grow">
                <div className="md:w-[1/3] flex flex-grow w-full flex-col">
                    {/* buyerName */}
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.buyerName}
                                inputValue={recordDetails.buyerName}
                                inputType='text'
                                inputCss={(errors.buyerName && errors.buyerName.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, buyerName: e.target.value })}
                            />
                            {(errors.buyerName && errors.buyerName.length > 0) ? (<SpanError errors={errors.buyerName} />) : null}
                        </div>
                    </CardElement>

                    {/* buyerTaxCode */}
                    <CardElement className="flex flex-grow">
                        <div className="mt-1 flex flex-col border p-2 flex-grow">
                            <InputWithSpan
                                inputName={fieldLabels.buyerTaxCode}
                                inputValue={recordDetails.buyerTaxCode}
                                inputType='text'
                                inputCss={(errors.buyerTaxCode && errors.buyerTaxCode.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, buyerTaxCode: e.target.value })}
                            />
                            {(errors.buyerTaxCode && errors.buyerTaxCode.length > 0) ? (<SpanError errors={errors.buyerTaxCode} />) : null}
                        </div>
                    </CardElement>
                </div>
                <div className="md:w-[1/3] flex flex-grow w-full flex-col">
                    {/* buyerAccountNumber */}
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.buyerAccountNumber}
                                inputValue={recordDetails.buyerAccountNumber}
                                inputType='text'
                                inputCss={(errors.buyerAccountNumber && errors.buyerAccountNumber.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, buyerAccountNumber: e.target.value })}
                            />
                            {(errors.buyerAccountNumber && errors.buyerAccountNumber.length > 0) ? (<SpanError errors={errors.buyerAccountNumber} />) : null}
                        </div>
                    </CardElement>

                    {/* buyerAddress */}
                    <CardElement className="flex flex-grow">
                        <div className="mt-1 flex flex-col border p-2 flex-grow">
                            <TextAreaWithSpan
                                inputName={fieldLabels.buyerAddress}
                                inputValue={recordDetails.buyerAddress}
                                inputType='text'
                                inputCss={(errors.buyerAddress && errors.buyerAddress.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, buyerAddress: e.target.value })}
                            />
                            {(errors.buyerAddress && errors.buyerAddress.length > 0) ? (<SpanError errors={errors.buyerAddress} />) : null}
                        </div>
                    </CardElement>
                </div>
                <div className="md:w-[1/3] flex flex-grow w-full flex-col">
                    {/* buyerPhone */}
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.buyerPhone}
                                inputValue={recordDetails.buyerPhone}
                                inputType='text'
                                inputCss={(errors.buyerPhone && errors.buyerPhone.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, buyerPhone: e.target.value })}
                            />
                            {(errors.buyerPhone && errors.buyerPhone.length > 0) ? (<SpanError errors={errors.buyerPhone} />) : null}
                        </div>
                    </CardElement>

                    {/* buyerOrganization */}
                    <CardElement className="flex flex-grow">
                        <div className="mt-1 flex flex-col border p-2 flex-grow">
                            <TextAreaWithSpan
                                inputName={fieldLabels.buyerOrganization}
                                inputValue={recordDetails.buyerOrganization}
                                inputType='text'
                                inputCss={(errors.buyerOrganization && errors.buyerOrganization.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, buyerOrganization: e.target.value })}
                            />
                            {(errors.buyerOrganization && errors.buyerOrganization.length > 0) ? (<SpanError errors={errors.buyerOrganization} />) : null}
                        </div>
                    </CardElement>
                </div>
            </div>

            <div className="flex md:flex-row flex-col md:space-x-1 flex-grow mt-4">
                <div className="md:w-[1/3] flex flex-grow w-full flex-col">
                    {/* amount */}
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.amount}
                                inputValue={Number(recordDetails.amount).toLocaleString()} // Định dạng số khi hiển thị
                                inputType='text' // Đặt type là text để định dạng
                                inputCss={(errors.amount && errors.amount.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, amount: parseNumberToLocalString(e.target.value) })} // Chuyển từ chuỗi định dạng về số khi set data
                            />
                            {(errors.amount && errors.amount.length > 0) ? (<SpanError errors={errors.amount} />) : null}
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
                                loading={loadingAccountBook}
                            />
                            {(errors.accountBookId && errors.accountBookId.length > 0) ? (<SpanError errors={errors.accountBookId} />) : null}
                        </div>
                    </CardElement>
                </div>
                <div className="md:w-[1/3] flex flex-grow w-full flex-col">
                    {/* transferAmount */}
                    <CardElement className={`${isPayForm03 ? "" : "opacity-50"}`}>
                        <div className={`mt-1 flex flex-col border p-2 flex-grow ${isPayForm03 ? "" : "cursor-not-allowed"}`}>
                            <InputWithSpan
                                inputName={fieldLabels.transferAmount}
                                inputValue={Number(recordDetails.transferAmount).toLocaleString()} // Định dạng số khi hiển thị
                                inputType='text' // Đặt type là text để định dạng
                                inputCss={`(errors.transferAmount && errors.transferAmount.length > 0) ? "border-red-500" : "" ${isPayForm03 ? "" : "cursor-not-allowed pointer-events-none"}`}
                                onChange={(e) => setRecordDetails({ ...recordDetails, transferAmount: parseNumberToLocalString(e.target.value) })} // Chuyển từ chuỗi định dạng về số khi set data
                            />
                            {(errors.transferAmount && errors.transferAmount.length > 0) ? (<SpanError errors={errors.transferAmount} />) : null}
                        </div>
                    </CardElement>

                    {/* swipeAmount */}
                    <CardElement className={`flex flex-grow ${isPayForm06 ? "" : "opacity-50"}`}>
                        <div className={`mt-1 flex flex-col border p-2 flex-grow ${isPayForm06 ? "" : "cursor-not-allowed"}`}>
                            <InputWithSpan
                                inputName={fieldLabels.swipeAmount}
                                inputValue={Number(recordDetails.swipeAmount).toLocaleString()} // Định dạng số khi hiển thị
                                inputType='text' // Đặt type là text để định dạng
                                inputCss={`(errors.swipeAmount && errors.swipeAmount.length > 0) ? "border-red-500" : "" ${isPayForm06 ? "" : "cursor-not-allowed pointer-events-none"}`}
                                onChange={(e) => setRecordDetails({ ...recordDetails, swipeAmount: parseNumberToLocalString(e.target.value) })} // Chuyển từ chuỗi định dạng về số khi set data
                            />
                            {(errors.swipeAmount && errors.swipeAmount.length > 0) ? (<SpanError errors={errors.swipeAmount} />) : null}
                        </div>
                    </CardElement>
                </div>
                <div className="md:w-[1/3] flex flex-grow w-full flex-col">
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
                                loading={loadingCashierRoom}
                            />
                            {(errors.cashierRoomId && errors.cashierRoomId.length > 0) ? (<SpanError errors={errors.cashierRoomId} />) : null}
                        </div>
                    </CardElement>

                    {/* payForm */}
                    <CardElement className="flex flex-grow">
                        <div className="mt-1 flex flex-col border p-2 flex-grow">
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
                                loading={loadingPayForm}
                            />
                            {(errors.payFormId && errors.payFormId.length > 0) ? (<SpanError errors={errors.payFormId} />) : null}
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
