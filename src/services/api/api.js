import axios from 'axios';
import config from "../../config"; // Import cấu hình
import CryptoJS from "crypto-js";
import useMasterService from '../master/useMasterService';

// Tạo instance của Axios
const api = axios.create({
    baseURL: config.laravelAppApiUrl, // URL API gốc
    timeout: 100000, // Thời gian timeout
});

// Interceptor cho request
api.interceptors.request.use((config) => {
    const token = useMasterService.getAuthToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Xử lý lỗi request
});

// Interceptor cho response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi 401
        if (error.response?.status === 401) {
            console.error("Unauthorized! Token có thể đã hết hạn.");
            useMasterService.removeAuthToken();
            window.location.href = "/info-401"; // Điều hướng 
        }
        return Promise.reject(error);
    }
);

export const encodeParams = (params) => {
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(JSON.stringify(params))
    );
};

export default api;
