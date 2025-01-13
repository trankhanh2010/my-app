import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Alert = ({ message, type = "success", onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Hiện alert khi component mount
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false); // Ẩn alert trước khi đóng
            setTimeout(() => onClose(), 500); // Đợi animation kết thúc rồi đóng
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icon =
        type === "success" ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />;

    const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

    return (
        <div className={`flex items-center p-3 text-white ${bgColor} rounded shadow-md 
                transition-transform duration-500 ease-in-out
                ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                `}>
            {icon}
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white focus:outline-none">
             ✕
            </button>
        </div>
    );
};

export default Alert;
