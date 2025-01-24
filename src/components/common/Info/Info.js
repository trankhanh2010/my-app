import React from "react";

const NoRecordInfo = ({mess='Đang cập nhật lại thông tin'}) => {
    return (
        <div className="info">
            <p>{mess}</p>
        </div>
    );
};

export default NoRecordInfo;
