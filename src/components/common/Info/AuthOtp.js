import React from "react";

const ErrorInfo = ({selectedRecord}) => {
    if(!selectedRecord) return null
    if(!selectedRecord.patientPhone && !selectedRecord.patientEmail && !selectedRecord.patientRelativePhone && !selectedRecord.patientRelativeMobile) {
        return (
            <div className="text-blue-600 font-semibold p-5 text-center text-lg">
                <p>Bạn chưa cung cấp số điện thoại và Email! Không thể xác thực OTP để xem.</p>
            </div>
        );
    }

    return (
        <div className="text-blue-600 font-semibold p-5 text-center text-lg">
            <p>Xác thực OTP để xem.</p>
        </div>
    );
};

export default ErrorInfo;
