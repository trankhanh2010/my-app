import React from "react";
import { useNavigate } from "react-router-dom";
import useMasterService from "../../../services/master/useMasterService"; // Nếu bạn có service để xử lý token
import { FaPowerOff  } from 'react-icons/fa'; // Import icon từ Font Awesome

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token trong localStorage
    useMasterService.removeAuthToken(); 

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };
  if(!useMasterService.getAuthToken){
    return null;
  }
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
       <FaPowerOff  />
    </button>
  );
};

export default LogoutButton;
