import React from "react";
import { FaPaperPlane } from 'react-icons/fa'; // Import icon gửi
import Loading from '../../Info/Loading';

const Component = ({
    selectedRecord,
    loadingSendOtpPhoneTreatmentFee,
    verifyOtpTreatmentFeeData,
    handleResendPhoneOtp,
    resendPhoneTimeout,
    disabledSendOtp,
}) => {
    if (!selectedRecord) return null
    if (!selectedRecord.patientPhone) return null
    if (loadingSendOtpPhoneTreatmentFee) return <Loading />
    if (verifyOtpTreatmentFeeData.success) return null

    return (
        <>
            <button
                onClick={handleResendPhoneOtp}
                disabled={resendPhoneTimeout > 0 || disabledSendOtp()}
                className={`flex items-center justify-center text-left py-2.5 font-semibold text-lg ${resendPhoneTimeout > 0 || disabledSendOtp()
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                    }`}
            >
                <span>
                    <FaPaperPlane className="mr-2 font-semibold inline" />
                    {`Gửi mã OTP tới điện thoại người bệnh `}
                    <span className="font-semibold text-black">
                        {selectedRecord.patientPhone ? selectedRecord.patientPhone.replace(/\d(?=\d{4})/g, "x") : ""}
                    </span>
                </span>
                {resendPhoneTimeout > 0 ? ` (Thử lại sau ${resendPhoneTimeout}s)` : ""}

            </button>
        </>
    )
}

export default Component