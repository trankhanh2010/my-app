import React, { useState } from "react";
import PayIcon from "../../common/Icon/PayIcon";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import NoRecord from "../../common/Info/NoRecord";
import NoFee from "../../common/Info/NoFee";
import Fee from "../../common/Info/Fee";
import Info from "../../common/Info/Info";

const Component = ({
    treatmentFeeDetail,
    recordDetails,
    setOpentShowAllPayment,
    countFeeDepositReqList,
    numDepositReqList,
}) => {
    if (!recordDetails) return <NoRecord />
    if (!treatmentFeeDetail) return <NoRecordInfo />
    if (countFeeDepositReqList>0 || numDepositReqList>0) return <Info mess ='Bạn cần thanh toán các yêu cầu tạm ứng trước!' />
    if (treatmentFeeDetail.fee <= 0) return <NoFee />
    return (
        <>
            <Fee
                mess={`Viện phí còn thiếu: ${Number(treatmentFeeDetail.fee).toLocaleString()} VNĐ`}
            />
            <button
                className="relative px-4 py-2 pl-8 rounded bg-pink-500 hover:bg-pink-600 mt-1 text-sm text-white w-full"
                onClick={() => setOpentShowAllPayment(true)}>
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <PayIcon />
                </span>
                Thanh toán viện phí còn thiếu
                <span className="absolute top-[2px] right-[2px] transform translate-x-1/2 -translate-y-1/2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
            </button>

        </>
    );
};

export default Component;
