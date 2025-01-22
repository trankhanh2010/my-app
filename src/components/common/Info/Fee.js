import React from "react";

const NoRecordInfo = ({mess='Bạn có khoản phí cần thanh toán'}) => {
    return (
        <div className="fee">
            <p>{mess}</p>
        </div>
    );
};

export default NoRecordInfo;
