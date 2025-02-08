import React, { useState } from "react";
import { FaExclamationTriangle  } from 'react-icons/fa'; 

const Modal = ({}) => {
    const [openModal, setOpenModal] = useState(true);

    const onCloseModal = () => {
        setOpenModal(false);
    };
    if (!openModal) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-auto w-full md:w-[40%]">
                <div className="text-center">
                <FaExclamationTriangle className="mx-auto mb-4 text-yellow-500 w-12 h-12" />
                </div>
                <p className="text-lg font-semibold text-black uppercase mb-2">Bạn đã nhập sai mã OTP quá số lần được cho phép!</p>
                <p className="text-lg text-blue-500 mb-4">Vui lòng chọn <span className="font-semibold">gửi lại mã OTP</span> để nhận 1 mã OTP khác và xác thực lại!</p>
                <button
                    onClick={onCloseModal}
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-blue-600 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Modal;
