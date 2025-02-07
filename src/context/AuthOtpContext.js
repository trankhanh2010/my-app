import React, { createContext, useContext, useState } from "react";

const AuthOtpContext = createContext();

export const AuthOtpProvider = ({ children }) => {
  const [authOtpTreatmentFee, setAuthOtpTreatmentFee] = useState();

  return (
    <AuthOtpContext.Provider value={{
      authOtpTreatmentFee,
      setAuthOtpTreatmentFee,
    }}>
      {children}
    </AuthOtpContext.Provider>
  );
};

export const useAuthOtpContext = () => useContext(AuthOtpContext);
