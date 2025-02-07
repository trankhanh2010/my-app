import React from "react";
import Loading from '../../Info/Loading';

const Component = ({
    otp,
    handleChange,
    inputRefs,
    handleKeyDown,
    handleFocus,
    handlePaste,
    verifyOtpTreatmentFeeData,
}) => {
    if (verifyOtpTreatmentFeeData.success) return null

    return (
        <>
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
                        onPaste={index === 0 ? handlePaste : null} // Chỉ cần bắt sự kiện paste ở ô đầu tiên
                        className="w-10 h-10 md:w-12 md:h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>
            {otp.some(digit => digit === "") && (
                <span className="block text-red-500 text-lg">
                    Cần nhập đủ <span className='font-semibold'>6 số</span> của mã OTP để xác thực!
                </span>
            )}
        </>
    )
}

export default Component