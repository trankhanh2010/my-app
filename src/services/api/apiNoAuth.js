import axios from "axios";
import config from "../../config"; // Import cấu hình

// Tạo instance không có interceptor Authorization
const apiNoAuth = axios.create({
    baseURL: config.laravelAppApiUrl, // URL API gốc
    timeout: 100000, // Thời gian timeout
});

// Không cần thêm Authorization vào header
export default apiNoAuth;
