import React, { useState } from 'react';
import TransactionTamUng from "../../../../pages/transaction/TransactionTamUng";
import ButtonModal from "../../../common/Button/ButtonModal";

const Modal = ({ isOpen, onClose, children, paramTreatmentCode }) => {
    const [zoom, setZoom] = useState(true);
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75`}>
            <div className={`relative bg-white w-full md:w-[100%] h-full overflow-auto max-h-screen ${zoom ? '' : 'md:w-[70%] md:h-auto'}`}>
                <ButtonModal
                    onClose={onClose}
                    zoom={zoom}
                    setZoom={setZoom}
                    title='Tạm ứng'
                />
                {children}
                <TransactionTamUng
                    paramTreatmentCode={paramTreatmentCode}
                    isFullScreen={zoom}
                />
            </div>
        </div>
    );
};

export default Modal;
