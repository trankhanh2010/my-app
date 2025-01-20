import React, { useState } from "react";
import CardElement from "../../common/Master/CardElement";
import ModalPageTransactionListNoLogin from '../../common/Modal/Page/ModalPageTransactionListNoLogin';

const Component = ({
    selectedRecord,
}) => {
    let isLSGD = selectedRecord

    const [isModalLSGDOpen, setIsModalLSGDOpen] = useState(false); // State để điều khiển modal lịch sử giao dịch

    const closeModalLSGD = () => {
        setIsModalLSGDOpen(false) // Đóng modal
    }
    return (
        <>
            <div className="mt-1 w-full flex flex-col">
                <button
                    onClick={() => {
                        if (!isLSGD) return;  // Nếu isLSGD là false, không làm gì cả
                        setIsModalLSGDOpen(true);  // Nếu isLSGD là true, mở modal
                    }}
                    className={`${!isLSGD ? "opacity-50 cursor-not-allowed" : ""} px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate`}
                >
                    Nhấn vào đây để xem lịch sử giao dịch
                </button>
            </div>
            {/* Modal LSGD*/}
            <ModalPageTransactionListNoLogin
                isOpen={isModalLSGDOpen}
                onClose={closeModalLSGD}
                paramTreatmentCode={selectedRecord?.treatmentCode ?? ""}
            />
        </>
    );
};

export default Component;
