import React, { useState, useEffect } from "react";
import ModalPageDepositReqListCardNoLogin from '../../common/Modal/Page/ModalPageDepositReqListCardNoLogin';
import PayIcon from "../../common/Icon/PayIcon";
import NoRecord from "../../common/Info/NoRecord";
import NoFee from "../../common/Info/NoFee";
import Fee from "../../common/Info/Fee";
import AuthOtp from "../../common/Info/AuthOtp";

const Component = ({
    selectedRecord,
    setReload,
    countFeeDepositReqList,
    numDepositReqList,
    isModalDepositReqFeeListOpen,
    setIsModalDepositReqFeeListOpen,
    authOtp = true,
    setPayNow,
    payNow,
}) => {
    let isLSGD = selectedRecord

    // const [isModalDepositReqFeeListOpen, setIsModalDepositReqFeeListOpen] = useState(false); // State để điều khiển modal lịch sử giao dịch

    const closeModalDepositReqFeeList = () => {
        setIsModalDepositReqFeeListOpen(false) // Đóng modal
        // setReload(true) // Tải lại trang
        setPayNow(false) // không mở lại
    }
    // Nếu có bản ghi và đã ấn thanh toán ngay và chắc chắn có yêu cầu tạm ứng thì mở
    useEffect(() => {
        if (selectedRecord && selectedRecord.id && payNow && (numDepositReqList>0)) {
            setIsModalDepositReqFeeListOpen(true); // Mở modal
            setPayNow(false); // Đánh dấu đã mở modal
        }
    }, [selectedRecord, payNow]); // Chạy khi `selectedRecord` hoặc `payNow` thay đổi
    if (!selectedRecord) return <NoRecord />
    if (selectedRecord.feeLockTime != null) return <Fee mess='Lần điều trị này đã bị khóa viện phí' />
    if (selectedRecord.treatmentEndTypeId != null) return <Fee mess='Đã kết thúc điều trị' />
    if (numDepositReqList <= 0) return <NoFee />
    if (!authOtp) return <AuthOtp />

    return (
        <>
            <Fee
                mess={`Bạn có ${numDepositReqList} yêu cầu tạm ứng chưa thanh toán với tổng tiền là ${Number(countFeeDepositReqList).toLocaleString()} VNĐ`}
            />
            <div className="mt-1 w-full flex flex-col">
                <button
                    onClick={() => {
                        if (!isLSGD) return;  // Nếu isLSGD là false, không làm gì cả
                        setIsModalDepositReqFeeListOpen(true);  // Nếu isLSGD là true, mở modal
                    }}
                    className={`${!isLSGD ? "opacity-50 cursor-not-allowed" : ""} relative px-4 py-2 pl-8 bg-pink-500 text-sm text-white rounded hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <PayIcon />
                    </span>
                    Thanh toán các yêu cầu tạm ứng
                    <span className="absolute top-[2px] right-[2px] transform translate-x-1/2 -translate-y-1/2 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                </button>
            </div>
            {/* Modal LSGD*/}
            <ModalPageDepositReqListCardNoLogin
                isOpen={isModalDepositReqFeeListOpen}
                onClose={closeModalDepositReqFeeList}
                paramTreatmentId={selectedRecord?.id ?? ""}
                paramIsDeposit={0}
                setReloadPageFeeList={setReload}
                setIsModalDepositReqFeeListOpen={setIsModalDepositReqFeeListOpen}
            />
        </>
    );
};

export default Component;
