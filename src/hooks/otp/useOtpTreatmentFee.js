import { useState, useEffect } from "react";
import otpService from "../../services/otp/otpService";
const useHook = () => {
    const [verifyOtpTreatmentFeeData, setVerifyOtpTreatmentFeeData] = useState([]);
    const [loadingVerifyOtpTreatmentFee, setLoadingVerifyOtpTreatmentFee] = useState(false);
    const [errorVerifyOtpTreatmentFee, setErrorVerifyOtpTreatmentFee] = useState(false);

    const [sendOtpTreatmentFeeData, setSendOtpTreatmentFeeData] = useState([]);
    const [loadingSendOtpTreatmentFee, setLoadingSendOtpTreatmentFee] = useState(false);
    const [errorSendOtpTreatmentFee, setErrorSendOtpTreatmentFee] = useState(false);

    const checkOtpTreatmentFee = async (phone, otp, patientCode) => {
        try {
            if (otp) {
                setLoadingVerifyOtpTreatmentFee(true)
                const response = await otpService.checkOtpTreatmentFee(phone, otp, patientCode);
                setVerifyOtpTreatmentFeeData(response.data)
                setLoadingVerifyOtpTreatmentFee(false)
            }
        } catch (err) {
            setErrorVerifyOtpTreatmentFee(true)
            setLoadingVerifyOtpTreatmentFee(false)
            console.error("Lỗi khi gọi api xác thực otp:", err);
        }
    };

    const sendOtpTreatmentFee = async (patientCode) => {
        try {
            if (patientCode) {
                setLoadingSendOtpTreatmentFee(true)
                const response = await otpService.sendOtpTreatmentFee(patientCode);
                setSendOtpTreatmentFeeData(response.data)
                setLoadingSendOtpTreatmentFee(false)
            }
        } catch (err) {
            setErrorSendOtpTreatmentFee(true)
            setLoadingSendOtpTreatmentFee(false)
            console.error("Lỗi khi gọi api gửi otp:", err);
        }
    };
    return {
        verifyOtpTreatmentFeeData,
        setVerifyOtpTreatmentFeeData,
        loadingVerifyOtpTreatmentFee,
        errorVerifyOtpTreatmentFee,
        checkOtpTreatmentFee,
        sendOtpTreatmentFeeData,
        setSendOtpTreatmentFeeData,
        loadingSendOtpTreatmentFee,
        errorSendOtpTreatmentFee,
        sendOtpTreatmentFee,
    };
};

export default useHook;
