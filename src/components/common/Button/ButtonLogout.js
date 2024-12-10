import React from "react";
import { useNavigate } from "react-router-dom";
import useMasterService from "../../../services/master/useMasterService"; // Nếu bạn có service để xử lý token

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token trong localStorage
    useMasterService.removeAuthToken(); 

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
