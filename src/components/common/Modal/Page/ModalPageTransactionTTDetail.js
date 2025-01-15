import React, { useState, useEffect } from 'react';
import TransactionTTDetail from "../../../../pages/data/transactionTTDetail/TransactionTTDetail";
import ButtonModal from "../../Button/ButtonModal";

const Modal = ({ isOpen, onClose, children, paramBillCode }) => {
    const [zoom, setZoom] = useState(false);
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75  overflow-auto`}>
            <div className={`relative bg-white w-full md:w-[100%] h-full overflow-auto max-h-screen ${zoom ? '' : 'md:w-[65%] md:h-auto'}`}>
                <ButtonModal
                    onClose={onClose}
                    zoom={zoom}
                    setZoom={setZoom}
                    title='Chi tiết thanh toán'
                />
                {children}
                <TransactionTTDetail
                    paramBillCode={paramBillCode}
                    isFullScreen={zoom}
                />
            </div>
        </div>
    );
};

export default Modal;
