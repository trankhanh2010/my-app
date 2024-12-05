import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import biểu tượng cho thành công

const AlertSucces = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Alert sẽ tự động tắt sau 3 giây
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div role="alert" class="fixed top-8 right-4 flex sm:w-[80%] md:w-[50%] lg:w-[30%] p-3 text-sm text-white bg-green-600 rounded-md">
            <FaCheckCircle  className="mr-2 w-5 h-5" />
            <span>{message}</span>
        </div>
    );
};

export default AlertSucces;
