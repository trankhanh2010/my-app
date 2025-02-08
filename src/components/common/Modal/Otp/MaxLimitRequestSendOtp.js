import React, { useState } from "react";
import { FaExclamationTriangle  } from 'react-icons/fa'; 

const Modal = ({openModal, onClose}) => {

    if (!openModal) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-auto w-full md:w-[40%]">
                <div className="text-center">
                <FaExclamationTriangle className="mx-auto mb-4 text-red-600 w-12 h-12" />
                </div>
                <p className="text-lg font-semibold text-black uppercase mb-2">Thiết bị của bạn đã gửi quá nhiều yêu cầu nhận mã OTP!</p>
                <p className="text-lg text-red-500 mb-4">Vui lòng thử lại sau!</p>
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-gray-600 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Modal;
