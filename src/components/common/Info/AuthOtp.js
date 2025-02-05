import React from "react";

const ErrorInfo = ({phone='' }) => {
    if(!phone) {
        return (
            <div className="error">
                <p>Bạn chưa cung cấp số điện thoại! Không thể xác thực OTP để xem.</p>
            </div>
        );
    }

    return (
        <div className="error">
            <p>Xác thực OTP để xem.</p>
        </div>
    );
};

export default ErrorInfo;
