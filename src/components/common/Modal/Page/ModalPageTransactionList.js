import React, {useState, useEffect} from 'react';
import TransactionList from "../../../../pages/data/transactionListVView/TransactionList";
import ButtonModal from "../../../common/Button/ButtonModal";

const Modal = ({ isOpen, onClose, children, paramTreatmentCode }) => {
    const [zoom, setZoom] = useState(false);
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 md:${zoom ? 'p-0' : 'p-10'}`}>
            <div className="relative bg-white md:p-5 w-full md:w-[100%] h-full overflow-auto">
                {children}
                <TransactionList
                    paramTreatmentCode={paramTreatmentCode}
                />
                <ButtonModal 
                onClose={onClose} 
                zoom={zoom} 
                setZoom={setZoom} 
                />
            </div>
        </div>
    );
};

export default Modal;
