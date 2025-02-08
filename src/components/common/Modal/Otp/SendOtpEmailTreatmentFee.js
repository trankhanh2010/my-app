import React from "react";
import { FaRegEnvelope } from 'react-icons/fa'; // Import icon gửi
import Loading from '../../Info/Loading';

const Component = ({
    selectedRecord,
    loadingSendOtpMailTreatmentFee,
    verifyOtpTreatmentFeeData,
    handleResendMailOtp,
    resendMailTimeout,
    disabledSendOtp,
    maskEmail,
}) => {
    if (!selectedRecord) return null
    if (!selectedRecord.patientEmail) return null
    if (loadingSendOtpMailTreatmentFee) return <Loading />
    if (verifyOtpTreatmentFeeData.success) return null
    return (
        <div>
            <button
                onClick={handleResendMailOtp}
                disabled={resendMailTimeout > 0 || disabledSendOtp()}
                className={`flex items-center justify-center text-left py-2.5 font-semibold text-lg ${resendMailTimeout > 0 || disabledSendOtp()
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                    }`}
            >
                <span>
                    <FaRegEnvelope className="mr-2 font-semibold inline" />
                    {`Gửi mã OTP tới email người bệnh `}
                    <span className="font-semibold text-black">
                        {selectedRecord.patientEmail ? maskEmail(selectedRecord.patientEmail) : ""}
                    </span>
                </span>
                {resendMailTimeout > 0 ? ` (Thử lại sau ${resendMailTimeout}s)` : ""}
            </button>
        </div>
    )
}

export default Component