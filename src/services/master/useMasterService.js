const getAuthToken = () => localStorage.getItem("authToken"); // Hàm lấy token từ localStorage
const removeAuthToken = () => localStorage.removeItem("authToken"); // Xóa token
export default {
    getAuthToken,
    removeAuthToken
};