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
    validateForm,
    isProcessing,
    loadingRecord,
    handleFormSubmit,
}) => {
    if (isProcessing) return <Loading />;
    if (loadingRecord) return <Loading />;
    if (!recordDetails) return <NoRecordInfo />
    // Validate Form
    const errors = validateForm(recordDetails);

    return (
        <form onSubmit={handleFormSubmit}>
            {/* amount */}
            <div className="flex md:flex-row flex-col md:space-x-1 flex-grow">
                <div className="md:w-[50%] flex flex-grow flex-col">
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.amount}
                                inputValue={recordDetails.amount}
                                inputType='number'
                                inputCss={(errors.amount && errors.amount.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, amount: e.target.value })}
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
                    <CardElement>
                        <div className="mt-1 flex flex-col border p-2">
                            <InputWithSpan
                                inputName={fieldLabels.swipeAmount}
                                inputValue={recordDetails.swipeAmount}
                                inputType='number'
                                inputCss={(errors.swipeAmount && errors.swipeAmount.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, swipeAmount: e.target.value })}
                            />
                            {(errors.swipeAmount && errors.swipeAmount.length > 0) ? (<SpanError errors={errors.swipeAmount} />) : null}
                        </div>
                    </CardElement>

                    {/* transferAmount */}
                    <CardElement className="flex flex-grow">
                        <div className="mt-1 flex flex-col border p-2 flex-grow">
                            <InputWithSpan
                                inputName={fieldLabels.transferAmount}
                                inputValue={recordDetails.transferAmount}
                                inputType='number'
                                inputCss={(errors.transferAmount && errors.transferAmount.length > 0) ? "border-red-500" : ""}
                                onChange={(e) => setRecordDetails({ ...recordDetails, transferAmount: e.target.value })}
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
