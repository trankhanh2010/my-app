import React from "react";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import Loading from "../../common/Info/Loading";
import ErrorInfo from "../../common/Info/ErrorInfo";
import GroupFieldSpanWithText from "../../common/Data/InfoRecord/GroupFieldSpanWithText";

const InfoTransaction = ({
    recordDetails,
    testServiceTypeList,
    selectedRecord,
    loadingFetchTestServiceTypeList,
    errorFetchTestServiceTypeList,
}) => {
    if (!recordDetails) return <NoRecordInfo/>
    if (loadingFetchTestServiceTypeList) return <Loading/>
    if (errorFetchTestServiceTypeList) return <ErrorInfo/>
    // // Tổng các tiền
    // const totalVirPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPrice) || 0), 0);
    // const totalHeinPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalHeinPrice) || 0), 0);
    // const totalOtherSourcePrice = testServiceTypeList.reduce((total, record) => total + (Number(record.otherSourcePrice) || 0), 0);
    // const totalPatientPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPatientPrice) || 0), 0);
    // const totalDiscount = testServiceTypeList.reduce((total, record) => total + (Number(record.discount) || 0), 0);

    return (
        <>
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Tổng chi phí', fieldValue:Number(selectedRecord.totalPrice).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'BHYT thanh toán', fieldValue:Number(selectedRecord.totalHeinPrice).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Nguồn khác thanh toán', fieldValue:Number(selectedRecord.totalOtherSourcePrice).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Công ty thanh toán', fieldValue:Number(selectedRecord.totalOtherCopaidPrice).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'BN phải thanh toán', fieldValue:Number(selectedRecord.totalPatientPrice).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Miễn giảm', fieldValue:Number(selectedRecord.totalDiscount).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'BN cần nộp thêm', fieldValue:Number(selectedRecord.fee).toLocaleString(), divCss:`md:w-[100%]`, spanCss:`text-red-600`, pCss:`text-red-600 font-semibold`},
                    {fieldName:'Hao phí', fieldValue:Number(selectedRecord.totalPriceExpend).toLocaleString(), divCss:`md:w-[1/3]`},
                    {fieldName:'Đã thu', fieldValue:Number(selectedRecord.daThu).toLocaleString(), divCss:`md:w-[1/3]`, spanCss:`text-blue-600`, pCss:`text-blue-600 font-semibold`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Tạm ứng', fieldValue:Number(selectedRecord.tamUng).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Tạm ứng DV', fieldValue:Number(selectedRecord.totalServiceDepositAmount).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Thanh toán', fieldValue:Number(selectedRecord.totalBillAmount).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Công nợ', fieldValue:Number(selectedRecord.totalDebtAmount).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Hoàn ứng', fieldValue:Number(selectedRecord.totalRepayAmount).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Kết chuyển', fieldValue:Number(selectedRecord.totalBillTransferAmount).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Thu quỹ', fieldValue:Number(selectedRecord.totalBillFund).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Chi phí khác', fieldValue:Number(selectedRecord.totalBillOtherAmount).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
        </>
    );
};

export default InfoTransaction;
