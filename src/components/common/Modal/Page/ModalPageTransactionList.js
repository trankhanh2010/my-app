import React, { useState, useEffect } from 'react';
import TransactionList from "../../../../pages/data/transactionListVView/TransactionList";
import ButtonModal from "../../../common/Button/ButtonModal";

const Modal = ({ isOpen, onClose, children, paramTreatmentCode }) => {
    const [zoom, setZoom] = useState(false);
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 md:${zoom ? 'p-0' : 'p-10'}`}>
            <div className="relative bg-white w-full md:w-[100%] h-full overflow-auto">
                <ButtonModal
                    onClose={onClose}
                    zoom={zoom}
                    setZoom={setZoom}
                    title='Danh sách giao dịch'
                />
                {children}
                <TransactionList
                    paramTreatmentCode={paramTreatmentCode}
                />
            </div>
        </div>
    );
};

export default Modal;
