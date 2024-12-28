import api from "../api/api";
const checkToken = async () => {
    try {
        const response = await api.get(`/api/v1/check-token`);
        return response.data.success;  // Trả về dữ liệu nhận được từ API
      } catch (error) {
        return false;
      }
}
const getAuthToken = () => localStorage.getItem("authToken"); // Hàm lấy token từ localStorage
const removeAuthToken = () => localStorage.removeItem("authToken"); // Xóa token
export default {
    getAuthToken,
    removeAuthToken,
    checkToken,
};