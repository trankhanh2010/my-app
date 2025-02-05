import React from "react";

const ErrorInfo = ({selectedRecord}) => {
    if(!selectedRecord) return null
    if(!selectedRecord.patientPhone && !selectedRecord.patientEmail) {
        return (
            <div className="error">
                <p>Bạn chưa cung cấp số điện thoại và Email! Không thể xác thực OTP để xem.</p>
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
