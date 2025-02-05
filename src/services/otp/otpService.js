import apiNoAuth, { encodeParams } from '../api/api';
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
export default {
    checkOtpTreatmentFee,
    sendOtpPhoneTreatmentFee,
    sendOtpMailTreatmentFee,
};
