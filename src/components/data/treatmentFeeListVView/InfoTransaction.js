import React from "react";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import Loading from "../../common/Info/Loading";
import ErrorInfo from "../../common/Info/ErrorInfo";
import GroupFieldSpanWithText from "../../common/Data/InfoRecord/GroupFieldSpanWithText";

const InfoTransaction = ({
    recordDetails,
    treatmentFeeDetail,
    selectedRecord,
    loadingFetchTreatmentFeeDetail,
    errorFetchTreatmentFeeDetail,
}) => {
    if (!recordDetails) return <NoRecordInfo/>
    if (loadingFetchTreatmentFeeDetail) return <Loading/>
    if (errorFetchTreatmentFeeDetail) return <ErrorInfo/>

    return (
        <div className="md:grid md:grid-cols-12 md:shadow-md md:mb-1">
            <GroupFieldSpanWithText 
                css='md:col-span-6 md:flex-col mt-1 md:space-x-0 md:shadow-none md:border-r-0'
                fields={[
                    {fieldName:'Tổng chi phí', fieldValue:Number(treatmentFeeDetail.totalPrice).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'BHYT thanh toán', fieldValue:Number(treatmentFeeDetail.totalHeinPrice).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Nguồn khác thanh toán', fieldValue:Number(treatmentFeeDetail.totalOtherSourcePrice).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Công ty thanh toán', fieldValue:Number(treatmentFeeDetail.totalOtherCopaidPrice).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Công nợ', fieldValue:Number(treatmentFeeDetail.totalDebtAmount).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Hoàn ứng', fieldValue:Number(treatmentFeeDetail.totalRepayAmount).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Kết chuyển', fieldValue:Number(treatmentFeeDetail.totalBillTransferAmount).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Thu quỹ', fieldValue:Number(treatmentFeeDetail.totalBillFund).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                    {fieldName:'Chi phí khác', fieldValue:Number(treatmentFeeDetail.totalBillOtherAmount).toLocaleString(), divCss:`md:border-r md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-2`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='md:col-span-6 md:flex-col mt-1 md:space-x-0 md:shadow-none md:border-l-0' 
                fields={[
                    {fieldName:'BN phải thanh toán', fieldValue:Number(treatmentFeeDetail.totalPatientPrice).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'Miễn giảm', fieldValue:Number(treatmentFeeDetail.totalDiscount).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'Hao phí', fieldValue:Number(treatmentFeeDetail.totalPriceExpend).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'Đã thu', fieldValue:Number(treatmentFeeDetail.daThu).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, spanCss:`text-blue-600`, pCss:`text-blue-600 font-semibold md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'BN cần nộp thêm', fieldValue:Number(treatmentFeeDetail.fee).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, spanCss:`text-red-600`, pCss:`text-red-600 font-semibold md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'Tạm ứng', fieldValue:Number(treatmentFeeDetail.tamUng).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'Tạm thu DV', fieldValue:Number(treatmentFeeDetail.totalServiceDepositAmount).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-1`},
                    {fieldName:'Thanh toán', fieldValue:Number(treatmentFeeDetail.totalBillAmount).toLocaleString(), divCss:`md:w-[1/4] md:flex-row`, pCss:`md:text-right md:ml-1 md:mb-1 md:mr-1`},
                ]}
            />
        </div>
    );
};

export default InfoTransaction;
