import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useMasterService from '../services/master/useMasterService';

// Tạo context
const AuthContext = createContext();

// Tạo provider
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(useMasterService.getAuthToken());
  const location = useLocation(); // Lắng nghe sự thay đổi của URL

  useEffect(() => {
    // Cập nhật trạng thái authToken mỗi khi URL thay đổi
    setAuthToken(useMasterService.getAuthToken());
  }, [location]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng context
export const useAuth = () => useContext(AuthContext);
