import React, { useState } from "react";
import CardElement from "../../common/Master/CardElement";
import ModalPageTransactionListNoLogin from '../../common/Modal/Page/ModalPageTransactionListNoLogin';
import ListIcon from "../../common/Icon/ListIcon";
const Component = ({
    selectedRecord,
}) => {
    let isLSGD = selectedRecord

    const [isModalLSGDOpen, setIsModalLSGDOpen] = useState(false); // State để điều khiển modal lịch sử giao dịch

    const closeModalLSGD = () => {
        setIsModalLSGDOpen(false) // Đóng modal
    }
    if(!selectedRecord) return
    return (
        <>
            <div className="mt-1 w-full flex flex-col">
                <button
                    onClick={() => {
                        if (!isLSGD) return;  // Nếu isLSGD là false, không làm gì cả
                        setIsModalLSGDOpen(true);  // Nếu isLSGD là true, mở modal
                    }}
                    className={`${!isLSGD ? "opacity-50 cursor-not-allowed" : ""} relative px-4 py-2 pl-8 bg-blue-500 text-sm text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <ListIcon />
                    </span>
                    Xem lịch sử thanh toán
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
