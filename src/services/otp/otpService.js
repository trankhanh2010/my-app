import apiNoAuth, { encodeParams } from '../api/apiNoAuth';
import api from '../api/api'
import config from "../../config";

const checkOtpTreatmentFee = async (otp, patientCode) => {

    if(!otp || !patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/check-otp-treatment-fee?otp=${otp}&patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi xác thực otp:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
const sendOtpPhoneTreatmentFee = async (patientCode) => {

    if(!patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/send-otp-phone-treatment-fee?patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gửi mã xác thực otp qua sms:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
const sendOtpMailTreatmentFee = async (patientCode) => {

    if(!patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/send-otp-mail-treatment-fee?patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gửi mã xác thực otp qua mail:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
const sendOtpPatientRelativePhoneTreatmentFee = async (patientCode) => {

    if(!patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/send-otp-patient-relative-phone-treatment-fee?patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gửi mã xác thực otp qua sms:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
const sendOtpPatientRelativeMobileTreatmentFee = async (patientCode) => {

    if(!patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/send-otp-patient-relative-mobile-treatment-fee?patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gửi mã xác thực otp qua sms:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};

const getDeviceGetOtpTreatmentFeeList = async () => {

    try {
        const response = await api.get(`/api/v1/device-get-otp-treatment-fee-list`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi lấy ds thiết bị nhận otp:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
const unlockDeviceLimitTotalRequestSendOtp = async (selectedRecord) => {
    if(!selectedRecord || !selectedRecord.ip || !selectedRecord.device) return 
    try {
        const response = await api.get(`/api/v1/unlock-device-get-otp-treatment-fee-list?deviceInfo=${selectedRecord.device}&ipAddress=${selectedRecord.ip}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi mở chặn thiết bị nhận otp:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
export default {
    checkOtpTreatmentFee,
    sendOtpPhoneTreatmentFee,
    sendOtpMailTreatmentFee,
    sendOtpPatientRelativePhoneTreatmentFee,
    sendOtpPatientRelativeMobileTreatmentFee,
    getDeviceGetOtpTreatmentFeeList,
    unlockDeviceLimitTotalRequestSendOtp,
};
