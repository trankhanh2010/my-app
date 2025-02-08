import React from "react";
import { FaMobileAlt } from 'react-icons/fa'; // Import icon gửi
import Loading from '../../Info/Loading';

const Component = ({
    selectedRecord,
    loadingSendOtpPatientRelativeMobileTreatmentFee,
    verifyOtpTreatmentFeeData,
    handleResendPatientRelativeMobileOtp,
    resendPatientRelativeMobileTimeout,
    disabledSendOtp,
}) => {
    if (!selectedRecord) return null
    if (!selectedRecord.patientRelativeMobile) return null
    if (loadingSendOtpPatientRelativeMobileTreatmentFee) return <Loading />
    if (verifyOtpTreatmentFeeData.success) return null

    return (
        <>
            <button
                onClick={handleResendPatientRelativeMobileOtp}
                disabled={resendPatientRelativeMobileTimeout > 0 || disabledSendOtp()}
                className={`flex items-center justify-center text-left py-2.5 font-semibold text-lg ${resendPatientRelativeMobileTimeout > 0 || disabledSendOtp()
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                    }`}
            >
                <span>
                    <FaMobileAlt className="mr-2 font-semibold inline" />
                    {`Gửi mã OTP tới di động người thân `}
                    <span className="font-semibold text-black">
                        {selectedRecord.patientRelativeMobile ? selectedRecord.patientRelativeMobile.replace(/\d(?=\d{4})/g, "x") : ""}
                    </span>
                </span>
                {resendPatientRelativeMobileTimeout > 0 ? ` (Thử lại sau ${resendPatientRelativeMobileTimeout}s)` : ""}

            </button>
        </>
    )
}

export default Component