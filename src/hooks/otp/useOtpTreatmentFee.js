import { useState, useEffect } from "react";
import otpService from "../../services/otp/otpService";
const useHook = () => {
    const [otpTreatmentFeeData, setOtpTreatmentFeeData] = useState([]);
    const [loadingOtpTreatmentFee, setLoadingOtpTreatmentFee] = useState(false);
    const [errorOtpTreatmentFee, setErrorOtpTreatmentFee] = useState(false);

    const checkOtpTreatmentFee = async (phone, otp, patientCode) => {
        try {
            if (otp) {
                setLoadingOtpTreatmentFee(true)
                const response = await otpService.checkOtpTreatmentFee(phone, otp, patientCode);
                setOtpTreatmentFeeData(response.data)
                setLoadingOtpTreatmentFee(false)
            }
        } catch (err) {
            setErrorOtpTreatmentFee(true)
            setLoadingOtpTreatmentFee(false)
            console.error("Lỗi khi gọi api xác thực token:", err);
        }
    };
    return {
        otpTreatmentFeeData,
        setOtpTreatmentFeeData,
        loadingOtpTreatmentFee,
        errorOtpTreatmentFee,
        checkOtpTreatmentFee,
    };
};

export default useHook;
