import apiNoAuth, { encodeParams } from '../api/api';
import config from "../../config";

const checkOtpTreatmentFee = async (phone, otp, patientCode) => {

    const name = 'OTP_treatment_fee'
    if(!name || !phone || !otp || !patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/check-otp-treatment-fee?name=${name}&phone=${phone}&otp=${otp}&patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi xác thực otp:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
const sendOtpTreatmentFee = async (patientCode) => {

    if(!patientCode) return { success : false}
    try {
        const response = await apiNoAuth.get(`/api/v1/send-otp-treatment-fee?patientCode=${patientCode}`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gửi mã xác thực otp:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn
    }
};
export default {
    checkOtpTreatmentFee,
    sendOtpTreatmentFee,
};
