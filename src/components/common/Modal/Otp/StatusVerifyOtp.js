import React, { useEffect } from "react";
import AutoClose from '../../Info/AutoClose';

const Component = ({
    verifyOtpTreatmentFeeData,
    setApplyFilterCursor,
    setFilterTrigger,
    setVerifyOtpTreatmentFeeData,
}) => {
    // Nếu xác thực thành công thì tự đóng sau 3 giây
    useEffect(() => {
        if (verifyOtpTreatmentFeeData.success) {
            const timeout = setTimeout(() => {
                setApplyFilterCursor(true);
                setFilterTrigger(true);
                setVerifyOtpTreatmentFeeData({});
            }, 3000);

            return () => clearTimeout(timeout); // Cleanup để tránh lỗi khi component unmount
        }
    }, [verifyOtpTreatmentFeeData]);


    if (Object.keys(verifyOtpTreatmentFeeData).length <= 0) return null

    if (verifyOtpTreatmentFeeData.success)
        return (
            <>
                <p className="text-green-600 font-semibold text-2xl mb-2 mt-2 uppercase">Xác thực thành công!</p>
                <AutoClose
                    initialTime={3}
                />
            </>
        )

    if (verifyOtpTreatmentFeeData.limitRequest)
        return (
            <p className="text-red-600 font-medium text-lg">
                Đã đạt giới hạn số lần nhập sai mã OTP! Vui lòng <span className='font-semibold'>nhận 1 mã OTP khác</span> và thử lại!
            </p>
        )

    if (!verifyOtpTreatmentFeeData.success)
        return (
            <>
                <p className="text-red-600 text-2xl font-semibold mb-2 mt-2 uppercase">
                    Xác thực không thành công!
                </p>
                <p className="text-red-600 font-medium text-lg">
                    (Mã OTP không đúng hoặc hết hạn!)
                </p>
            </>
        )
}

export default Component