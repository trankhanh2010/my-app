import React, { useEffect } from "react";
import { FaExclamationCircle  } from "react-icons/fa"; // Import biểu tượng dấu X

const AlertError = ({ message, type = "error", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Alert sẽ tự động tắt sau 3 giây
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div role="alert" class="fixed top-8 right-4 flex sm:w-[80%] md:w-[50%] lg:w-[30%] p-3 text-sm text-white bg-red-600 rounded-md">
            <FaExclamationCircle  className="mr-2 w-5 h-5" />
            <span>{message}</span>
        </div>
    );
};

export default AlertError;
