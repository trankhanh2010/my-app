import React, { useState, useEffect } from 'react';
import DepositReqDetailNoLogin from "../../../../pages/data/depositReqListVView/DepositReqDetailNoLogin";
import ButtonModal from "../../../common/Button/ButtonModal";

const Modal = ({ isOpen, onClose, children, paramDepositReqId }) => {
    const [zoom, setZoom] = useState(false);
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75`}>
            <div className={`relative bg-white w-full md:w-[100%] h-full overflow-auto max-h-screen ${zoom ? '' : 'md:w-[75%] md:h-auto'}`}>
                <ButtonModal
                    onClose={onClose}
                    zoom={zoom}
                    setZoom={setZoom}
                    title='Chi tiết yêu cầu tạm ứng'
                />
                {children}
                <DepositReqDetailNoLogin
                    paramDepositReqId={paramDepositReqId}
                    isFullScreen={zoom}
                />
            </div>
        </div>
    );
};

export default Modal;
