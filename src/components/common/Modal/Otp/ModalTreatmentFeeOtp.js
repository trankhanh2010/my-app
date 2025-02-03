import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../Info/Loading';

const Modal = ({
    authOtp,
    isOpen,
    onCancel,
    loadingOtpTreatmentFee,
    errorOtpTreatmentFee,
    onConfirmOtp,
    selectedRecord,
    otpTreatmentFeeData,
    setOtpTreatmentFeeData,
    setApplyFilterCursor,
    setFilterTrigger,
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
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

    useEffect(() => {
        if (!isOpen) {
            setOtp(["", "", "", "", "", ""])
        }
    }, [isOpen]); // Gọi lại khi có thay đổi

    if (!isOpen) return null;
    if (!selectedRecord) return null;
    if (authOtp) return null;
    if (errorOtpTreatmentFee) return null;
    // if (loadingOtpTreatmentFee) return <Loading/>;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full h-full md:w-auto md:h-auto md:min-w-[50%] max-w-screen max-h-screen p-4 overflow-auto">
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
                    <h3 className="mb-5 text-lg font-normal text-gray-700">{`Nhập mã OTP được gửi đến số điện thoại mà bạn đã cung cấp!`}</h3>
                    {loadingOtpTreatmentFee ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="flex justify-center gap-2 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
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
                            {Object.keys(otpTreatmentFeeData).length > 0 && (
                                otpTreatmentFeeData.success ? (
                                    <p className="text-green-600 font-medium text-lg">Xác thực thành công!</p>
                                ) : (
                                    <p className="text-red-600 font-medium text-lg">
                                        Xác thực không thành công! Mã OTP không đúng hoặc hết hạn!
                                    </p>
                                )
                            )}

                            {!otpTreatmentFeeData.success && (
                                <button
                                    onClick={() => onConfirmOtp(otp.join(""))}
                                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 mr-2"
                                >
                                    Xác thực
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    onCancel()
                                    setOtpTreatmentFeeData([])
                                    if (otpTreatmentFeeData.success) {
                                        // Reload lại trang
                                        setApplyFilterCursor(true);
                                        setFilterTrigger(true);
                                    }
                                }}
                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Đóng
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};


export default Modal;
