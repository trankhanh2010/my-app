import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButtons = () => {
    const [showScrollUp, setShowScrollUp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollUp(window.scrollY > 200); // Hiện nút lên đầu khi cuộn xuống 200px
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
            <div className="fixed bottom-10 right-5 flex flex-col space-y-2 z-50">
                {/* Nút xuống cuối trang */}
                <button
                    onClick={scrollToBottom}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                >
                    <FaArrowDown size={20} />
                </button>
            </div>
            <div className="fixed top-10 right-5 flex flex-col space-y-2 z-50">
                {/* Nút lên đầu (chỉ hiện khi cuộn xuống) */}
                {showScrollUp && (
                    <button
                        onClick={scrollToTop}
                        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                    >
                        <FaArrowUp size={20} />
                    </button>
                )}
            </div>
        </>
    );
};

export default ScrollButtons;
