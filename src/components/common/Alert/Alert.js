import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Alert = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Tự động tắt sau 3 giây
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon =
        type === "success" ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />;

    const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

    return (
        <div className={`flex items-center p-3 text-white ${bgColor} rounded shadow-md`}>
            {icon}
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white focus:outline-none">
             ✕
            </button>
        </div>
    );
};

export default Alert;
