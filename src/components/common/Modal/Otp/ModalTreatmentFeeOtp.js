import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../Info/Loading';
import Fail from '../../Info/Fail';
import { FaPaperPlane, FaRegEnvelope, FaShieldAlt, FaMobileAlt } from 'react-icons/fa'; // Import icon gửi

const Modal = ({
    authOtp,
    isOpen,
    onCancel,
    loadingVerifyOtpTreatmentFee,
    errorVerifyOtpTreatmentFee,
    onConfirmOtp,
    selectedRecord,
    verifyOtpTreatmentFeeData,
    setVerifyOtpTreatmentFeeData,
    setApplyFilterCursor,
    setFilterTrigger,
    loadingSendOtpPhoneTreatmentFee,
    errorSendOtpPhoneTreatmentFee,
    onSendPhoneOtp,
    loadingSendOtpMailTreatmentFee,
    errorSendOtpMailTreatmentFee,
    onSendMailOtp,
    loadingSendOtpPatientRelativePhoneTreatmentFee,
    errorSendOtpPatientRelativePhoneTreatmentFee,
    onSendPatientRelativePhoneOtp,
    loadingSendOtpPatientRelativeMobileTreatmentFee,
    errorSendOtpPatientRelativeMobileTreatmentFee,
    onSendPatientRelativeMobileOtp,
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [resendPhoneTimeout, setResendPhoneTimeout] = useState(15); // Đếm ngược giây
    const [resendMailTimeout, setResendMailTimeout] = useState(30); // Đếm ngược giây
    const [resendPatientRelativePhoneTimeout, setResendPatientRelativePhoneTimeout] = useState(15); // Đếm ngược giây
    const [resendPatientRelativeMobileTimeout, setResendPatientRelativeMobileTimeout] = useState(15); // Đếm ngược giây

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return; // Chỉ cho phép nhập số

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển sang ô tiếp theo nếu có giá trị
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    // Tự bôi đen khi chọn
    const handleFocus = (index) => {
        inputRefs.current[index].select();
    };

    // Tự động giảm thời gian mỗi giây
    // sms người bệnh
    useEffect(() => {
        let timer;
        if (resendPhoneTimeout > 0) {
            timer = setInterval(() => {
                setResendPhoneTimeout(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendPhoneTimeout]);

    const handleResendPhoneOtp = () => {
        if (resendPhoneTimeout === 0) {
            onSendPhoneOtp(selectedRecord.patientCode);
            setResendPhoneTimeout(15); // Reset lại bộ đếm
        }
    };
    // mail người bệnh
    useEffect(() => {
        let timer;
        if (resendMailTimeout > 0) {
            timer = setInterval(() => {
                setResendMailTimeout(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendMailTimeout]);

    const handleResendMailOtp = () => {
        if (resendMailTimeout === 0) {
            onSendMailOtp(selectedRecord.patientCode);
            setResendMailTimeout(30); // Reset lại bộ đếm
        }
    };
    // sms phone người thân
    useEffect(() => {
        let timer;
        if (resendPatientRelativePhoneTimeout > 0) {
            timer = setInterval(() => {
                setResendPatientRelativePhoneTimeout(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendPatientRelativePhoneTimeout]);

    const handleResendPatientRelativePhoneOtp = () => {
        if (resendPatientRelativePhoneTimeout === 0) {
            onSendPatientRelativePhoneOtp(selectedRecord.patientCode);
            setResendPatientRelativePhoneTimeout(15); // Reset lại bộ đếm
        }
    };
    // sms mobile người thân
    useEffect(() => {
        let timer;
        if (resendPatientRelativeMobileTimeout > 0) {
            timer = setInterval(() => {
                setResendPatientRelativeMobileTimeout(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendPatientRelativeMobileTimeout]);

    const handleResendPatientRelativeMobileOtp = () => {
        if (resendPatientRelativeMobileTimeout === 0) {
            onSendPatientRelativeMobileOtp(selectedRecord.patientCode);
            setResendPatientRelativeMobileTimeout(15); // Reset lại bộ đếm
        }
    };

    const disabledSendOtp = () => {
        if (loadingVerifyOtpTreatmentFee
            || loadingSendOtpPhoneTreatmentFee
            || loadingSendOtpMailTreatmentFee
            || loadingSendOtpPatientRelativePhoneTreatmentFee
            || loadingSendOtpPatientRelativeMobileTreatmentFee
        ) {
            return true
        } else {
            return false
        }
    }
    const maskEmail = (email) => {
        if (!email) return "";

        return email.replace(/(^\w{2})([\w.-]+)(\w{2})(@.+)/, (_, first, middle, last, domain) => {
            return first + "*".repeat(middle.length) + last + domain;
        });
    };

    useEffect(() => {
        if (!isOpen) {
            setOtp(["", "", "", "", "", ""]);
            setResendPhoneTimeout(15); // Reset thời gian khi đóng modal
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setOtp(["", "", "", "", "", ""])
        }
    }, [isOpen]); // Gọi lại khi có thay đổi

    if (!isOpen) return null;
    if (!selectedRecord) return null;
    if (!selectedRecord.patientPhone && !selectedRecord.patientEmail && !selectedRecord.patientRelativePhone && !selectedRecord.patientRelativeMobile) return null;
    if (authOtp) return null;
    if (errorVerifyOtpTreatmentFee) return null;
    if (errorSendOtpPhoneTreatmentFee) return null;
    if (errorSendOtpMailTreatmentFee) return null;
    if (errorSendOtpPatientRelativePhoneTreatmentFee) return null;
    if (errorSendOtpPatientRelativeMobileTreatmentFee) return null;
    // if (loadingVerifyOtpTreatmentFee) return <Loading/>;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full h-full md:w-auto md:h-auto md:min-w-[50%] max-w-screen max-h-screen overflow-auto p-4 relative">
                <div className="text-center">
                    <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <h3 className="text-lg mb-5 font-semibold text-gray-700">{`Nhập mã OTP được gửi đến bạn!`}</h3>
                    {loadingVerifyOtpTreatmentFee ? (
                        <Loading />
                    ) : (
                        <>
                            <p className="text-blue-600 text-lg mb-1">
                                (Bạn chỉ có thể nhận được <span className='font-semibold'>1</span> mã OTP <span className='font-semibold'>mỗi 2 phút!</span>)
                            </p>
                            <div className="flex justify-center gap-2 mb-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            (inputRefs.current[index] = el)
                                        }}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onFocus={() => handleFocus(index)}
                                        className="w-9 h-9 md:w-12 md:h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ))}
                            </div>
                            {otp.some(digit => digit === "") && (
                                <span className="block text-red-500 text-sm ">
                                    Cần nhập đủ <span className='font-semibold'>6 số</span> của mã OTP để xác thực!
                                </span>
                            )}
                            <>
                                {Object.keys(verifyOtpTreatmentFeeData).length > 0 && (
                                    verifyOtpTreatmentFeeData.success ? (
                                        <p className="text-green-600 font-medium text-lg">Xác thực thành công!</p>
                                    ) : (<>
                                        {verifyOtpTreatmentFeeData.limitRequest ? (
                                            <p className="text-red-600 font-medium text-lg">
                                                Đã đạt giới hạn số lần nhập sai mã OTP! Vui lòng <span className='font-semibold'>nhận 1 mã OTP khác</span> và thử lại!
                                            </p>
                                        )
                                            : (<>
                                                <p className="text-red-600 font-medium text-lg">
                                                    Xác thực không thành công! Mã OTP không đúng hoặc hết hạn!
                                                </p>
                                                <p className="text-red-600 font-medium text-lg">
                                                    {verifyOtpTreatmentFeeData.totalRetryVerify > 0
                                                        ? ((`Bạn còn ${verifyOtpTreatmentFeeData.totalRetryVerify} lần nhập sai!`))
                                                        : (`Vui lòng nhận 1 mã OTP khác và thử lại!`)}
                                                </p>
                                            </>)
                                        }
                                    </>)
                                )}
                            </>

                            {!verifyOtpTreatmentFeeData.success && (
                                <button
                                    disabled={disabledSendOtp()}
                                    onClick={() => onConfirmOtp(otp.join(""))}
                                    className={`mt-1 mb-1 text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 mr-2 
                                        ${(otp.some(digit => digit === "") || disabledSendOtp()) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"}
                                    `}                                >
                                    <FaShieldAlt className="mr-2 font-semibold inline" />
                                    Xác thực
                                </button>
                            )}
                            {selectedRecord.patientPhone ? (
                                <>
                                    {loadingSendOtpPhoneTreatmentFee ? (<Loading />)
                                        : (
                                            <>
                                                {!verifyOtpTreatmentFeeData.success && (
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
                                                                {`Gửi lại OTP tới điện thoại người bệnh `}
                                                                <span className="font-semibold text-black">
                                                                    {selectedRecord.patientPhone ? selectedRecord.patientPhone.replace(/\d(?=\d{4})/g, "x") : ""}
                                                                </span>
                                                            </span>
                                                            {resendPhoneTimeout > 0 ? ` (Thử lại sau ${resendPhoneTimeout}s)` : ""}

                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )
                                : (<> </>)
                            }
                            {selectedRecord.patientEmail ? (
                                <>
                                    {loadingSendOtpMailTreatmentFee ? (<Loading />)
                                        : (
                                            <>
                                                {!verifyOtpTreatmentFeeData.success && (
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
                                                                {`Gửi lại OTP tới email người bệnh `}
                                                                <span className="font-semibold text-black">
                                                                    {selectedRecord.patientEmail ? maskEmail(selectedRecord.patientEmail) : ""}
                                                                </span>
                                                            </span>
                                                            {resendMailTimeout > 0 ? ` (Thử lại sau ${resendMailTimeout}s)` : ""}
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )
                                : (<> </>)
                            }
                            {selectedRecord.patientRelativePhone ? (
                                <>
                                    {loadingSendOtpPatientRelativePhoneTreatmentFee ? (<Loading />)
                                        : (
                                            <>
                                                {!verifyOtpTreatmentFeeData.success && (
                                                    <>
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
                                                    </>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )
                                : (<> </>)
                            }
                            {selectedRecord.patientRelativeMobile ? (
                                <>
                                    {loadingSendOtpPatientRelativeMobileTreatmentFee ? (<Loading />)
                                        : (
                                            <>
                                                {!verifyOtpTreatmentFeeData.success && (
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
                                                                {`Gửi lại OTP tới di động người thân `}
                                                                <span className="font-semibold text-black">
                                                                    {selectedRecord.patientRelativeMobile ? selectedRecord.patientRelativeMobile.replace(/\d(?=\d{4})/g, "x") : ""}
                                                                </span>
                                                            </span>
                                                            {resendPatientRelativeMobileTimeout > 0 ? ` (Thử lại sau ${resendPatientRelativeMobileTimeout}s)` : ""}

                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )
                                : (<> </>)
                            }
                            <button
                                onClick={() => {
                                    onCancel()
                                    setVerifyOtpTreatmentFeeData([])
                                    if (verifyOtpTreatmentFeeData.success) {
                                        // Reload lại trang
                                        setApplyFilterCursor(true);
                                        setFilterTrigger(true);
                                    }
                                }}
                                className="absolute top-1 right-1  hover:text-red-600 hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Modal;
