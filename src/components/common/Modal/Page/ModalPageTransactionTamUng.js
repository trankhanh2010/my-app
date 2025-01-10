import React, {useEffect} from 'react';
import TransactionTamUng from "../../../../pages/transaction/TransactionTamUng";
const Modal = ({ isOpen, onClose, children, paramTreatmentCode }) => {
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 md:p-10">
            <div className="relative bg-white md:p-5 rounded-lg w-full md:w-[100%] md:h-auto h-full overflow-y-auto">
                {children}
                <TransactionTamUng
                    paramTreatmentCode={paramTreatmentCode}
                />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Modal;
