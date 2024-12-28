import React from "react";
import { Link } from 'react-router-dom';
import useMasterService from "../../../services/master/useMasterService"; 

const Button = () => {
  if(useMasterService.getAuthToken()){
    return null;
  }
  return (
    <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Đăng nhập</Link>
  );
};

export default Button;
