import React, { useState, useEffect } from 'react';
import DepositReqListCardNoLogin from "../../../../pages/data/depositReqListVView/DepositReqListCardNoLogin";
import ButtonModal from "../../../common/Button/ButtonModal";

const Modal = ({ isOpen, onClose, children, paramTreatmentId, paramIsDeposit }) => {
    const [zoom, setZoom] = useState(false);
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75`}>
            <div className={`relative bg-white w-full md:w-[100%] h-full overflow-auto max-h-screen ${zoom ? '' : 'md:w-[75%] md:h-auto'}`}>
                <ButtonModal
                    onClose={onClose}
                    zoom={zoom}
                    setZoom={setZoom}
                    title='Danh sách các yêu cầu tạm ứng chưa được thanh toán'
                />
                {children}
                <DepositReqListCardNoLogin
                    paramTreatmentId={paramTreatmentId}
                    paramIsDeposit={paramIsDeposit}
                    isFullScreen={zoom}
                />
            </div>
        </div>
    );
};

export default Modal;
