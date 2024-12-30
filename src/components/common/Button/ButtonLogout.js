import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMasterService from "../../../services/master/useMasterService";
import { FaPowerOff } from "react-icons/fa"; // Import icon từ Font Awesome

const LogoutButton = () => {
  const [authToken, setAuthToken] = useState(useMasterService.getAuthToken());
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin URL hiện tại

  const handleLogout = () => {
    // Xóa token trong localStorage
    useMasterService.removeAuthToken();

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  useEffect(() => {
    // Cập nhật trạng thái đăng nhập mỗi khi URL thay đổi
    setAuthToken(useMasterService.getAuthToken());
  }, [location]); // Lắng nghe sự thay đổi của URL

  if (!authToken) {
    return null; // Không hiển thị nút nếu chưa đăng nhập
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      <FaPowerOff />
    </button>
  );
};

export default LogoutButton;
