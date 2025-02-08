import React, { useState, useEffect, useRef } from 'react';
import FormVerifyOtp from "../Otp/FormVerifyOtp"
import MaxLimitRequestSendOtp from "../Otp/MaxLimitRequestSendOtp"
import { FaCheck, FaTimes } from "react-icons/fa";

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
    sendOtpPatientRelativeMobileTreatmentFeeData,
    sendOtpPatientRelativePhoneTreatmentFeeData,
    sendOtpMailTreatmentFeeData,
    sendOtpPhoneTreatmentFeeData,
    maxLimitRequestSendOtp,
    setMaxLimitRequestSendOtp,
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [resendPhoneTimeout, setResendPhoneTimeout] = useState(0); // Đếm ngược giây
    const [resendMailTimeout, setResendMailTimeout] = useState(0); // Đếm ngược giây
    const [resendPatientRelativePhoneTimeout, setResendPatientRelativePhoneTimeout] = useState(0); // Đếm ngược giây
    const [resendPatientRelativeMobileTimeout, setResendPatientRelativeMobileTimeout] = useState(0); // Đếm ngược giây

    const onCloseMaxLimitRequestSendOtp = () => {
        setMaxLimitRequestSendOtp(false);
    }
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
    // Dán mã OTP khi ctrl v
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text"); // Lấy nội dung clipboard
        const digits = pasteData.replace(/\D/g, "").slice(0, 6); // Lọc chỉ lấy số và giới hạn 6 số

        if (digits.length === 6) {
            setOtp(digits.split(""));
            digits.split("").forEach((digit, i) => {
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = digit;
                }
            });

            // Focus vào ô cuối cùng
            inputRefs.current[5]?.focus();
        }
    };

    // Mở modal thì gửi otp qua phone 
    useEffect(() => {
        if (isOpen && !authOtp) {
            if (selectedRecord && selectedRecord.patientCode && resendPhoneTimeout <= 0) {
                handleResendPhoneOtp()
            }
        }
    }, [isOpen, selectedRecord]);

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
            setResendPhoneTimeout(5); // Reset lại bộ đếm
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
            setResendMailTimeout(5); // Reset lại bộ đếm
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
            setResendPatientRelativePhoneTimeout(5); // Reset lại bộ đếm
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
            setResendPatientRelativeMobileTimeout(5); // Reset lại bộ đếm
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
        }
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen
            || verifyOtpTreatmentFeeData
            || sendOtpPatientRelativeMobileTreatmentFeeData
            || sendOtpPatientRelativePhoneTreatmentFeeData
            || sendOtpMailTreatmentFeeData
            || sendOtpPhoneTreatmentFeeData
        ) {
            setOtp(["", "", "", "", "", ""])
        }
    }, [isOpen,
        verifyOtpTreatmentFeeData,
        sendOtpPatientRelativeMobileTreatmentFeeData,
        sendOtpPatientRelativePhoneTreatmentFeeData,
        sendOtpMailTreatmentFeeData,
        sendOtpPhoneTreatmentFeeData,
    ]); // Gọi lại khi có thay đổi
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
                    {verifyOtpTreatmentFeeData && Object.keys(verifyOtpTreatmentFeeData).length > 0
                        ? (verifyOtpTreatmentFeeData.success
                            ? (<FaCheck className="mx-auto mb-4 text-green-600 w-12 h-12" />)
                            : (<FaTimes className="mx-auto mb-4 text-red-600 w-12 h-12" />))
                        : (<svg
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
                        </svg>)}

                    <h3 className="text-lg font-semibold text-gray-700">{`Nhập mã OTP được gửi đến bạn!`}</h3>
                    <p className="text-blue-600 text-lg italic mb-5">
                        {sendOtpPhoneTreatmentFeeData && sendOtpPhoneTreatmentFeeData.otpTTL && `(Mỗi mã OTP có hiệu lực ${sendOtpPhoneTreatmentFeeData.otpTTL} phút)`}
                    </p>
                    <FormVerifyOtp
                        onCancel={onCancel}
                        loadingVerifyOtpTreatmentFee={loadingVerifyOtpTreatmentFee}
                        onConfirmOtp={onConfirmOtp}
                        selectedRecord={selectedRecord}
                        verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                        setVerifyOtpTreatmentFeeData={setVerifyOtpTreatmentFeeData}
                        setApplyFilterCursor={setApplyFilterCursor}
                        setFilterTrigger={setFilterTrigger}
                        loadingSendOtpPhoneTreatmentFee={loadingSendOtpPhoneTreatmentFee}
                        loadingSendOtpMailTreatmentFee={loadingSendOtpMailTreatmentFee}
                        loadingSendOtpPatientRelativePhoneTreatmentFee={loadingSendOtpPatientRelativePhoneTreatmentFee}
                        loadingSendOtpPatientRelativeMobileTreatmentFee={loadingSendOtpPatientRelativeMobileTreatmentFee}
                        otp={otp}
                        handleChange={handleChange}
                        inputRefs={inputRefs}
                        handleKeyDown={handleKeyDown}
                        handleFocus={handleFocus}
                        handlePaste={handlePaste}
                        disabledSendOtp={disabledSendOtp}
                        handleResendPhoneOtp={handleResendPhoneOtp}
                        resendPhoneTimeout={resendPhoneTimeout}
                        handleResendMailOtp={handleResendMailOtp}
                        resendMailTimeout={resendMailTimeout}
                        maskEmail={maskEmail}
                        handleResendPatientRelativePhoneOtp={handleResendPatientRelativePhoneOtp}
                        resendPatientRelativePhoneTimeout={resendPatientRelativePhoneTimeout}
                        handleResendPatientRelativeMobileOtp={handleResendPatientRelativeMobileOtp}
                        resendPatientRelativeMobileTimeout={resendPatientRelativeMobileTimeout}
                    />
                </div>
                {maxLimitRequestSendOtp && <MaxLimitRequestSendOtp
                    openModal={maxLimitRequestSendOtp}
                    onClose={onCloseMaxLimitRequestSendOtp}
                    otpMaxRequestsPerDay={
                        sendOtpPhoneTreatmentFeeData?.otpMaxRequestsPerDay
                        ?? sendOtpMailTreatmentFeeData?.otpMaxRequestsPerDay
                        ?? sendOtpPatientRelativePhoneTreatmentFeeData?.otpMaxRequestsPerDay
                        ?? sendOtpPatientRelativeMobileTreatmentFeeData?.otpMaxRequestsPerDay
                    }
                />
                }
            </div>
        </div>
    );
};


export default Modal;
