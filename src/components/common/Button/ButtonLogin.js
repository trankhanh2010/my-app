import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useMasterService from "../../../services/master/useMasterService";

const Button = () => {
  const [authToken, setAuthToken] = useState(useMasterService.getAuthToken());
  const location = useLocation(); // Lấy thông tin URL hiện tại

  useEffect(() => {
    // Mỗi khi URL thay đổi, kiểm tra lại trạng thái đăng nhập
    setAuthToken(useMasterService.getAuthToken());
  }, [location]); // Chạy lại khi URL thay đổi

  if (authToken) {
    return null; // Không hiển thị nút nếu đã đăng nhập
  }

  return (
    <Link
      to="/login"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
    >
      Đăng nhập
    </Link>
  );
};

export default Button;
