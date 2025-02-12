import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButtons = () => {
    const [showScrollUp, setShowScrollUp] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    let hideTimeout;

    useEffect(() => {
        const handleScroll = () => {
            // Hiện nút khi cuộn xuống 200px
            setShowScrollUp(window.scrollY > 200);

            // Hiện nút khi có bất kỳ hoạt động cuộn nào
            setShowButtons(true);

            // Nếu đã có timer, xóa để đặt lại
            if (hideTimeout) clearTimeout(hideTimeout);

            // Ẩn nút sau 3 giây không có cuộn
            hideTimeout = setTimeout(() => {
                setShowButtons(false);
            }, 3000);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return (
        <>
            {showButtons && (
                <>
                    <div className="fixed top-[60px] right-[5px] flex flex-col space-y-2 z-20">
                        {/* Nút lên đầu (chỉ hiện khi cuộn xuống 200px) */}
                        {showScrollUp && (
                            <button
                                onClick={scrollToTop}
                                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                            >
                                <FaArrowUp size={20} />
                            </button>
                        )}
                    </div>
                    <div className="fixed bottom-[60px] right-[5px] flex flex-col space-y-2 z-20">
                        {/* Nút xuống cuối trang */}
                        <button
                            onClick={scrollToBottom}
                            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                        >
                            <FaArrowDown size={20} />
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default ScrollButtons;
