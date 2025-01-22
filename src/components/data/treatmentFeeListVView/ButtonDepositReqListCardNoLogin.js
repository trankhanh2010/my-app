import React, { useState } from "react";
import ModalPageDepositReqListCardNoLogin from '../../common/Modal/Page/ModalPageDepositReqListCardNoLogin';
import PayIcon from "../../common/Icon/PayIcon";
import NoRecord from "../../common/Info/NoRecord";
import NoFee from "../../common/Info/NoFee";
import Fee from "../../common/Info/Fee";
const Component = ({
    selectedRecord,
    setReload,
    countFeeDepositReqList,
    numDepositReqList,
}) => {
    let isLSGD = selectedRecord

    const [isModalLSGDOpen, setIsModalLSGDOpen] = useState(false); // State để điều khiển modal lịch sử giao dịch

    const closeModalLSGD = () => {
        setIsModalLSGDOpen(false) // Đóng modal
        setReload(true) // Tải lại trang
    }
    if (!selectedRecord) return <NoRecord />
    if (numDepositReqList <= 0) return <NoFee />
    return (
        <>
            <Fee
                mess={`Bạn có ${numDepositReqList} yêu cầu tạm ứng chưa thanh toán với tổng tiền là ${Number(countFeeDepositReqList).toLocaleString()} VNĐ`}
            />
            <div className="mt-1 w-full flex flex-col">
                <button
                    onClick={() => {
                        if (!isLSGD) return;  // Nếu isLSGD là false, không làm gì cả
                        setIsModalLSGDOpen(true);  // Nếu isLSGD là true, mở modal
                    }}
                    className={`${!isLSGD ? "opacity-50 cursor-not-allowed" : ""} relative px-4 py-2 pl-8 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <PayIcon />
                    </span>
                    Thanh toán các yêu cầu tạm ứng
                </button>
            </div>
            {/* Modal LSGD*/}
            <ModalPageDepositReqListCardNoLogin
                isOpen={isModalLSGDOpen}
                onClose={closeModalLSGD}
                paramTreatmentId={selectedRecord?.id ?? ""}
                paramIsDeposit={0}
            />
        </>
    );
};

export default Component;
