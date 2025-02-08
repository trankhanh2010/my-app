import React from "react";
import { FaShieldAlt } from 'react-icons/fa'; // Import icon gửi
import MaxLimitRequestVerifyOtp from '../Otp/MaxLimitRequestVerifyOtp'
const Component = ({
    otp,
    verifyOtpTreatmentFeeData,
    disabledSendOtp,
    onConfirmOtp,
}) => {
    if (verifyOtpTreatmentFeeData.success) return null
    return (
        <>
            <button
                disabled={otp.some(digit => digit === "") || disabledSendOtp() || verifyOtpTreatmentFeeData.totalRetryVerify <= 0}
                onClick={() => onConfirmOtp(otp.join(""))}
                className={`mt-1 mb-1 text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 mr-2 
                    ${(otp.some(digit => digit === "") || disabledSendOtp() || verifyOtpTreatmentFeeData.totalRetryVerify <= 0) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"}
                `}                                >
                <FaShieldAlt className="mr-2 font-semibold inline" />
                Xác thực
            </button>
            {verifyOtpTreatmentFeeData.totalRetryVerify !== undefined
                ? (<>
                    {verifyOtpTreatmentFeeData.totalRetryVerify > 0
                        ? (
                            <p className="text-red-600 font-semibold text-lg">
                                (Bạn còn {verifyOtpTreatmentFeeData.totalRetryVerify} lần thử xác thực!)
                            </p>
                        )
                        : (
                            <>
                                <p className="font-semibold text-red-600 text-lg">
                                    (Vui lòng nhận 1 mã OTP khác và thử lại!)
                                </p>
                                <MaxLimitRequestVerifyOtp />
                            </>
                        )
                    }
                </>)
                : (<></>)
            }
        </>
    )
}

export default Component