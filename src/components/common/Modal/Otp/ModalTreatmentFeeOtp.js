import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../Info/Loading';
import Fail from '../../Info/Fail';
import { FaPaperPlane, FaRegEnvelope } from 'react-icons/fa'; // Import icon gửi

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
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [resendTimeout, setResendTimeout] = useState(15); // Đếm ngược giây
    const [resendMailTimeout, setResendMailTimeout] = useState(30); // Đếm ngược giây

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
    useEffect(() => {
        let timer;
        if (resendTimeout > 0) {
            timer = setInterval(() => {
                setResendTimeout(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendTimeout]);

    const handleResendOtp = () => {
        if (resendTimeout === 0) {
            onSendPhoneOtp(selectedRecord.patientCode);
            setResendTimeout(15); // Reset lại bộ đếm
        }
    };
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

    const maskEmail = (email) => {
        if (!email) return "";

        return email.replace(/(^\w{2})([\w.-]+)(\w{2})(@.+)/, (_, first, middle, last, domain) => {
            return first + "*".repeat(middle.length) + last + domain;
        });
    };

    useEffect(() => {
        if (!isOpen) {
            setOtp(["", "", "", "", "", ""]);
            setResendTimeout(15); // Reset thời gian khi đóng modal
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setOtp(["", "", "", "", "", ""])
        }
    }, [isOpen]); // Gọi lại khi có thay đổi

    if (!isOpen) return null;
    if (!selectedRecord) return null;
    if (!selectedRecord.patientPhone && !selectedRecord.patientEmail) return null;
    if (authOtp) return null;
    if (errorVerifyOtpTreatmentFee) return null;
    if (errorSendOtpPhoneTreatmentFee) return null;
    if (errorSendOtpMailTreatmentFee) return null;
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
                                            if (index === 0 && otp.every(d => d === "")) {
                                                setTimeout(() => el?.focus(), 0);
                                            }
                                        }}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onFocus={() => handleFocus(index)}
                                        className="w-6 h-6 md:w-12 md:h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ))}
                            </div>
                            {otp.some(digit => digit === "") && (
                                <span className="block text-red-500 text-sm ">
                                    Cần nhập đủ <span className='underline font-semibold'>6 số</span> của mã OTP để xác thực!
                                </span>
                            )}
                            <>
                                {Object.keys(verifyOtpTreatmentFeeData).length > 0 && (
                                    verifyOtpTreatmentFeeData.success ? (
                                        <p className="text-green-600 font-medium text-lg">Xác thực thành công!</p>
                                    ) : (
                                        <p className="text-red-600 font-medium text-lg">
                                            Xác thực không thành công! Mã OTP không đúng hoặc hết hạn!
                                        </p>
                                    )
                                )}
                            </>

                            {!verifyOtpTreatmentFeeData.success && (
                                <button
                                    onClick={() => onConfirmOtp(otp.join(""))}
                                    className={`mt-1 text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 mr-2 
                                        ${otp.some(digit => digit === "") ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"}
                                    `}                                >
                                    Xác thực
                                </button>
                            )}
                            {loadingSendOtpPhoneTreatmentFee ? (<Loading />)
                                : (
                                    <>
                                        {!verifyOtpTreatmentFeeData.success && (
                                            <>
                                                <button
                                                    onClick={handleResendOtp}
                                                    disabled={resendTimeout > 0}
                                                    className={`flex items-center justify-center text-left py-2.5 font-semibold text-lg ${resendTimeout > 0
                                                        ? "text-gray-400 cursor-not-allowed"
                                                        : "text-blue-600 hover:text-blue-800"
                                                        }`}
                                                >
                                                    <span>
                                                        <FaPaperPlane className="mr-2 font-semibold inline" />
                                                        {`Gửi lại OTP tới điện thoại `}
                                                        <span className="font-semibold text-black">
                                                            {selectedRecord.patientPhone ? selectedRecord.patientPhone.replace(/\d(?=\d{2})/g, "x") : ""}
                                                        </span>
                                                    </span>
                                                    {resendTimeout > 0 ? ` (Thử lại sau ${resendTimeout}s)` : ""}

                                                </button>
                                            </>
                                        )}
                                    </>
                                )
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
                                                            disabled={resendMailTimeout > 0}
                                                            className={`flex items-center justify-center text-left py-2.5 font-semibold text-lg ${resendMailTimeout > 0
                                                                ? "text-gray-400 cursor-not-allowed"
                                                                : "text-blue-600 hover:text-blue-800"
                                                                }`}
                                                        >
                                                            <span>
                                                                <FaRegEnvelope className="mr-2 font-semibold inline" />
                                                                {`Gửi lại OTP tới email `}
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
