import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMasterService from "../../services/master/useMasterService";
import Authenticating from "../common/Info/Authenticating";
import Info401 from "../../pages/error/Info401";
import Info403 from "../../pages/error/Info403";
import Info500 from "../../pages/error/Info500";

const Middleware = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticating, setIsAuthenticating] = useState(true); // Mặc định là true, tức là đang xác thực
    const noAuthRoutes = [
        "/home",
        "/login", 
        "/info-401",
        "/info-403",
        "/info-500",
        "/result-payment-thanh-toan",
        "/result-payment-tam-ung",
        "/treatment-fee-list-no-login",
        "/transaction-list-no-login"
    ]; // Các route không cần xác thực

    useEffect(() => {
        const currentPath = location.pathname;

        // Nếu là route không cần xác thực, bỏ qua xác thực
        if (noAuthRoutes.includes(currentPath)) {
            setIsAuthenticating(false);
            return;
        }

        // Nếu không có token và URL cần xác thực thì điều hướng về trang 401
        if (!noAuthRoutes.includes(location.pathname) && !useMasterService.getAuthToken()) {
            navigate("/info-401")
            return; 
        }

        // Kiểm tra token và xác thực
        const validateToken = async () => {
            setIsAuthenticating(true); // Đặt trạng thái đang xác thực
            try {
                const isValid = await useMasterService.checkToken();
                if (!isValid) {
                    navigate("/info-403"); // Nếu token không hợp lệ, điều hướng đến trang 403
                }
            } catch (error) {
                navigate("/info-500"); // Nếu có lỗi trong quá trình xác thực, điều hướng đến trang lỗi 500
            } finally {
                setIsAuthenticating(false); // Hoàn thành xác thực
            }
        };

        if (useMasterService.getAuthToken()) {
            validateToken(); // Kiểm tra token nếu có
        } else {
            setIsAuthenticating(false); // Nếu không có token, không cần xác thực nữa
        }
    }, [location.pathname, navigate]);

    // Hiển thị trạng thái đang xác thực
    if (isAuthenticating) {
        return <Authenticating />;
    }

    // // Nếu không có token và URL cần xác thực thì điều hướng về trang 401
    // if (!noAuthRoutes.includes(location.pathname) && !useMasterService.getAuthToken()) {
    //     return <Info401 />;
    // }

    // Hiển thị nội dung children khi xác thực xong
    return <>{children}</>;
};

export default Middleware;
