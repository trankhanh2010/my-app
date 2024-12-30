import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useMasterList from "../../hooks/master/useMasterList";
import ManegetAlert from "../../components/common/Alert/ManegerAlert";
import useMasterService from "../../services/master/useMasterService";
import config from "../../config";

const Login = () => {
    const tokenAppApiUrl = config.tokenAppApiUrl;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State để theo dõi trạng thái loading
    const [isRedirecting, setIsRedirecting] = useState(false); // Trạng thái đang chuyển hướng

    const navigate = useNavigate(); // Tạo hàm navigate để điều hướng
    useEffect(() => {
        // Kiểm tra nếu đã có token trong localStorage
        const token = useMasterService.getAuthToken();
        if (token) {
            // Nếu có token, điều hướng tới trang Home
            navigate('/home');
        }
    }, [navigate]);
    const {
        alerts,
        addAlert,
        removeAlert,
    }
        = useMasterList()

    const handleLogin = async (e) => {
        e.preventDefault();
        const authHeader = `Basic ${btoa(`HIS:${username}:${password}`)}`; // Encode Basic Auth
        try {
            setIsLoading(true); // Bắt đầu loading khi đăng nhập 
            const response = await axios.get(`${tokenAppApiUrl}/api/Token/Login`, {
                headers: {
                    Authorization: authHeader,
                },
            });
            if (response.data.Success) {
                const token = response.data.Data.TokenCode;
                localStorage.setItem("authToken", token); // Lưu token vào LocalStorage
                addAlert("Đăng nhập thành công!", "success");
                setIsRedirecting(true);
                setTimeout(() => {
                    navigate('/home'); // Điều hướng tới trang home sau khi alert đã hiển thị
                    window.location.reload(); // Reload trang sau khi điều hướng
                }, 2500); // Thời gian trì hoãn 2 giây
            } else {
                addAlert("Đăng nhập thất bại!", "error");
            }
        } catch (err) {
            setError("Có lỗi khi gọi api đăng nhập!");
        }
        finally {
            setIsLoading(false); // Kết thúc loading khi xong
        }
    };

    return (
        <div className="min-h-screen w-[100%] drop-shadow-md">
            {/* Lớp phủ để khóa màn hình khi đang hiển thị alert và chuyển hướng */}
            {(isLoading || isRedirecting) && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-lg">Đang chuyển hướng...</div>
                </div>
            )}
            <div className="relative flex flex-col sm:flex-row item-center justify-center pt-10 pb-5 ">
                {/*thông tin*/}
                <div className="bg-blue-50 p-8  drop-shadow-md w-full md:w-[70%] max-w-sm min-h-[70vh]">

                </div>
                {/*form đăng nhập*/}
                <div className="bg-white p-8  drop-shadow-2xl w-full max-w-sm md:w-[30%] min-h-[70vh]">
                    <div className="text-2xl font-semibold text-center mb-6 uppercase">Đăng nhập hệ thống</div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="drop-shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="drop-shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
            {/* Component hiển thị thông báo */}
            <ManegetAlert
                alerts={alerts}
                removeAlert={removeAlert}
            />
        </div>
    );
};

export default Login;
