import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMasterService from "../../services/master/useMasterService";
import Authenticating from "../common/Info/Authenticating";
import Login from "../../pages/auth/login";

const Middleware = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticating, setIsAuthenticating] = useState(
        !!useMasterService.getAuthToken()
    ); // true nếu có token, false nếu không
    
    const noAuthRoutes = ["/login", "/test-service-req-list-no-login"]; // Các route không cần xác thực
    useEffect(() => {
        const currentPath = location.pathname;
        // Nếu là route không cần xác thực, bỏ qua xác thực
        if (noAuthRoutes.includes(currentPath)) {
            setIsAuthenticating(false);
            return;
        }

        // Đặt trạng thái đang xác thực và kiểm tra token
        setIsAuthenticating(true);
        const validateToken = async () => {
            try {
                const isValid = await useMasterService.checkToken();
                if (!isValid) {
                    navigate("/login");
                }
            } catch (error) {
                navigate("/login");
            } finally {
                setIsAuthenticating(false); // Hoàn thành xác thực
            }
        };

        validateToken();
    }, [location.pathname, navigate]);

    // Hiển thị trạng thái đang xác thực
    if (isAuthenticating) {
        return <Authenticating />;
    }
    // Nếu không có token và url cần xác thực thì điều hướng về trang login
    if (!noAuthRoutes.includes(location.pathname) && !useMasterService.getAuthToken()) {
        return <Login />;
    }
    // Hiển thị nội dung children khi xác thực xong
    return <>{children}</>;
};

export default Middleware;
