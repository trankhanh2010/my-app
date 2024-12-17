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
    // Tổng các tiền
    const totalVirPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPrice) || 0), 0);
    const totalHeinPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalHeinPrice) || 0), 0);
    const totalOtherSourcePrice = testServiceTypeList.reduce((total, record) => total + (Number(record.otherSourcePrice) || 0), 0);
    const totalPatientPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPatientPrice) || 0), 0);
    const totalDiscount = testServiceTypeList.reduce((total, record) => total + (Number(record.discount) || 0), 0);

    return (
        <div className="text-xs">
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Tổng chi phí', fieldValue:totalVirPrice.toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'BHYT thanh toán', fieldValue:totalHeinPrice.toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Nguồn khác thanh toán', fieldValue:totalOtherSourcePrice.toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Công ty thanh toán', fieldValue:null, divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'BN phải thanh toán', fieldValue:totalPatientPrice.toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Miễn giảm', fieldValue:totalDiscount.toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'BN cần nộp thêm', fieldValue:(totalPatientPrice - selectedRecord.totalTreatmentBillAmount).toLocaleString(), divCss:`md:w-[100%]`, spanCss:`text-red-600`, pCss:`text-red-600 font-semibold`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Đã thu', fieldValue:Number(selectedRecord.totalTreatmentBillAmount).toLocaleString(), divCss:`md:w-[1/3] md:border-r`, spanCss:`text-blue-600`, pCss:`text-blue-600 font-semibold`},
                    {fieldName:'Tạm ứng', fieldValue:Number(selectedRecord.totalTreatmentTu).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Thanh toán', fieldValue:Number(selectedRecord.totalTreatmentTt).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:'Công nợ', fieldValue:Number(selectedRecord.totalTreatmentNo).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Hoàn ứng', fieldValue:Number(selectedRecord.totalTreatmentHu).toLocaleString(), divCss:`md:w-[1/3] md:border-r`},
                    {fieldName:'Kết chuyển', fieldValue:Number(selectedRecord.totalTreatmentKcAmount).toLocaleString(), divCss:`md:w-[1/3]`},
                ]}
            />
        </div>
    );
};

export default InfoTransaction;
