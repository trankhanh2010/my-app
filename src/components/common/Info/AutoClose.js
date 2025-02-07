import React, { useState, useEffect } from "react";

const Loading = ({ initialTime = 3, onTimeout }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time <= 0) {
            onTimeout?.(); // Gọi hàm callback khi hết thời gian (nếu có)
            return;
        }

        const timer = setTimeout(() => setTime(time - 1), 1000);

        return () => clearTimeout(timer);
    }, [time, onTimeout]);

    return (
        <div className="centered-container flex flex-col">
            <div className="spinner"></div>
            <div className="block text-center text-lg font-semibold uppercase mt-1 mb-1 text-blue-700">
                Tự động đóng sau {time} giây ...
            </div>
        </div>
    );
};

export default Loading;
