import React from "react";
import { FaPaperPlane } from 'react-icons/fa'; // Import icon gửi
import Loading from '../../Info/Loading';

const Component = ({
    selectedRecord,
    loadingSendOtpPatientRelativePhoneTreatmentFee,
    verifyOtpTreatmentFeeData,
    handleResendPatientRelativePhoneOtp,
    resendPatientRelativePhoneTimeout,
    disabledSendOtp,
}) => {
    if (!selectedRecord) return null
    if (!selectedRecord.patientRelativePhone) return null
    if (loadingSendOtpPatientRelativePhoneTreatmentFee) return <Loading />
    if (verifyOtpTreatmentFeeData.success) return null

    return (
        <button
            onClick={handleResendPatientRelativePhoneOtp}
            disabled={resendPatientRelativePhoneTimeout > 0 || disabledSendOtp()}
            className={`flex items-center justify-center text-left py-2.5 font-semibold text-lg ${resendPatientRelativePhoneTimeout > 0 || disabledSendOtp()
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
                }`}
        >
            <span>
                <FaPaperPlane className="mr-2 font-semibold inline" />
                {`Gửi lại OTP tới điện thoại người thân `}
                <span className="font-semibold text-black">
                    {selectedRecord.patientRelativePhone ? selectedRecord.patientRelativePhone.replace(/\d(?=\d{4})/g, "x") : ""}
                </span>
            </span>
            {resendPatientRelativePhoneTimeout > 0 ? ` (Thử lại sau ${resendPatientRelativePhoneTimeout}s)` : ""}
        </button>
    )
}

export default Component