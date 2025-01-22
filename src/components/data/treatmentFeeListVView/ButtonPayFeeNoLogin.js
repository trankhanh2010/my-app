import React, { useState } from "react";
import PayIcon from "../../common/Icon/PayIcon";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import NoRecord from "../../common/Info/NoRecord";
import NoFee from "../../common/Info/NoFee";
import Fee from "../../common/Info/Fee";

const Component = ({
    treatmentFeeDetail,
    recordDetails,
    setOpentShowAllPayment,
}) => {
    if (!recordDetails) return <NoRecord />
    if (!treatmentFeeDetail) return <NoRecordInfo />
    if (treatmentFeeDetail.fee <= 0) return <NoFee />
    return (
        <>
            <Fee
                mess={`Viện phí còn thiếu: ${Number(treatmentFeeDetail.fee).toLocaleString()} VNĐ`}
            />
            <button
                className="relative px-4 py-2 pl-8 rounded bg-pink-500 hover:bg-pink-600 mt-1 text-white w-full"
                onClick={() => setOpentShowAllPayment(true)}>
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <PayIcon />
                </span>
                Thanh toán viện phí còn thiếu
            </button>

        </>
    );
};

export default Component;
