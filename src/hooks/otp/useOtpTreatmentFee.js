import { useState, useEffect } from "react";
import otpService from "../../services/otp/otpService";
const useHook = () => {
    const [verifyOtpTreatmentFeeData, setVerifyOtpTreatmentFeeData] = useState([]);
    const [loadingVerifyOtpTreatmentFee, setLoadingVerifyOtpTreatmentFee] = useState(false);
    const [errorVerifyOtpTreatmentFee, setErrorVerifyOtpTreatmentFee] = useState(false);

    const [sendOtpPhoneTreatmentFeeData, setSendOtpPhoneTreatmentFeeData] = useState([]);
    const [loadingSendOtpPhoneTreatmentFee, setLoadingSendOtpPhoneTreatmentFee] = useState(false);
    const [errorSendOtpPhoneTreatmentFee, setErrorSendOtpPhoneTreatmentFee] = useState(false);

    const [sendOtpMailTreatmentFeeData, setSendOtpMailTreatmentFeeData] = useState([]);
    const [loadingSendOtpMailTreatmentFee, setLoadingSendOtpMailTreatmentFee] = useState(false);
    const [errorSendOtpMailTreatmentFee, setErrorSendOtpMailTreatmentFee] = useState(false);

    const checkOtpTreatmentFee = async (phone, otp, patientCode) => {
        try {
            if (otp) {
                setLoadingVerifyOtpTreatmentFee(true)
                const response = await otpService.checkOtpTreatmentFee(otp, patientCode);
                setVerifyOtpTreatmentFeeData(response.data)
                setLoadingVerifyOtpTreatmentFee(false)
            }
        } catch (err) {
            setErrorVerifyOtpTreatmentFee(true)
            setLoadingVerifyOtpTreatmentFee(false)
            console.error("Lỗi khi gọi api xác thực otp:", err);
        }
    };

    const sendOtpPhoneTreatmentFee = async (patientCode) => {
        try {
            if (patientCode) {
                setLoadingSendOtpPhoneTreatmentFee(true)
                const response = await otpService.sendOtpPhoneTreatmentFee(patientCode);
                setSendOtpPhoneTreatmentFeeData(response.data)
                setLoadingSendOtpPhoneTreatmentFee(false)
            }
        } catch (err) {
            setErrorSendOtpPhoneTreatmentFee(true)
            setLoadingSendOtpPhoneTreatmentFee(false)
            console.error("Lỗi khi gọi api gửi otp qua sms:", err);
        }
    };

    const sendOtpMailTreatmentFee = async (patientCode) => {
        try {
            if (patientCode) {
                setLoadingSendOtpMailTreatmentFee(true)
                const response = await otpService.sendOtpMailTreatmentFee(patientCode);
                setSendOtpMailTreatmentFeeData(response.data)
                setLoadingSendOtpMailTreatmentFee(false)
            }
        } catch (err) {
            setErrorSendOtpMailTreatmentFee(true)
            setLoadingSendOtpMailTreatmentFee(false)
            console.error("Lỗi khi gọi api gửi otp qua mail:", err);
        }
    };
    return {
        verifyOtpTreatmentFeeData,
        setVerifyOtpTreatmentFeeData,
        loadingVerifyOtpTreatmentFee,
        errorVerifyOtpTreatmentFee,
        checkOtpTreatmentFee,
        sendOtpPhoneTreatmentFeeData,
        setSendOtpPhoneTreatmentFeeData,
        loadingSendOtpPhoneTreatmentFee,
        errorSendOtpPhoneTreatmentFee,
        sendOtpPhoneTreatmentFee,
        sendOtpMailTreatmentFeeData,
        setSendOtpMailTreatmentFeeData,
        loadingSendOtpMailTreatmentFee,
        errorSendOtpMailTreatmentFee,
        sendOtpMailTreatmentFee,
    };
};

export default useHook;
