import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMasterService from "../../services/master/useMasterService";
import Authenticating from "../common/Info/Authenticating";
import routes from "../../routes"; // Import danh sách route

const Middleware = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticating, setIsAuthenticating] = useState(true); // Mặc định là true, tức là đang xác thực
    // Lấy route hiện tại từ danh sách route
    const currentRoute = routes.find(route => route.path === location.pathname);

    useEffect(() => {
        // Nếu URL không hợp lệ, điều hướng về 404
        if (!currentRoute) {
            navigate("/info-404");
            return;
        }
        
        // Nếu là route không cần xác thực, bỏ qua xác thực
        if (currentRoute.public) {
            setIsAuthenticating(false);
            return;
        }

        // Nếu không có token và cần xác thực, điều hướng về 401
        if (!useMasterService.getAuthToken()) {
            navigate("/info-401");
            return;
        }

        // Nếu có token và cần xác thực, nhưng token không có quyền thì trả về 403
        {/*Thêm sau */}

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

    // Hiển thị nội dung children khi xác thực xong
    return <>{children}</>;
};

export default Middleware;
