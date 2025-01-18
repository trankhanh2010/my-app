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
    if (!recordDetails) return <NoRecordInfo />
    if (loadingFetchTreatmentFeeDetail) return <Loading />
    if (errorFetchTreatmentFeeDetail) return <ErrorInfo />

    return (
        <>
            <GroupFieldSpanWithText
                fields={[
                    { fieldName: 'Tổng chi phí', fieldValue: Number(treatmentFeeDetail.totalPrice).toLocaleString(), divCss: `md:w-[50%] md:border-r`, pCss:`text-red-500 font-semibold` },
                    { fieldName: 'BHYT thanh toán', fieldValue: Number(treatmentFeeDetail.totalHeinPrice).toLocaleString(), divCss: `md:w-[50%] md:border-r`, pCss:`text-blue-500 font-semibold` },
                    { fieldName: 'BN phải thanh toán', fieldValue: Number(treatmentFeeDetail.totalPatientPrice).toLocaleString(), divCss: `md:w-[50%]`, pCss:`text-red-500 font-semibold` },

                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Chi phí khác', fieldValue: Number(treatmentFeeDetail.totalBillOtherAmount).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Nguồn khác thanh toán', fieldValue: Number(treatmentFeeDetail.totalOtherSourcePrice).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Công ty thanh toán', fieldValue: Number(treatmentFeeDetail.totalOtherCopaidPrice).toLocaleString(), divCss: `md:w-[50%]` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Công nợ', fieldValue: Number(treatmentFeeDetail.totalDebtAmount).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Kết chuyển', fieldValue: Number(treatmentFeeDetail.totalBillTransferAmount).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Hoàn ứng', fieldValue: Number(treatmentFeeDetail.totalRepayAmount).toLocaleString(), divCss: `md:w-[50%]` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Miễn giảm', fieldValue: Number(treatmentFeeDetail.totalDiscount).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Thu quỹ', fieldValue: Number(treatmentFeeDetail.totalBillFund).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Hao phí', fieldValue: Number(treatmentFeeDetail.totalPriceExpend).toLocaleString(), divCss: `md:w-[50%]` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Đã thu', fieldValue: Number(treatmentFeeDetail.daThu).toLocaleString(), divCss: `md:w-[50%] md:border-r`, pCss:`text-blue-500 font-semibold` },
                    { fieldName: 'Tạm thu DV', fieldValue: Number(treatmentFeeDetail.totalServiceDepositAmount).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'Tạm ứng', fieldValue: Number(treatmentFeeDetail.tamUng).toLocaleString(), divCss: `md:w-[50%]` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Thanh toán', fieldValue: Number(treatmentFeeDetail.totalBillAmount).toLocaleString(), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: 'BN cần nộp thêm', fieldValue: Number(treatmentFeeDetail.fee).toLocaleString(), divCss: `md:w-[50%]`, pCss:`text-red-500 font-semibold`},
                ]}
            />
        </>
    );
};

export default InfoTransaction;
