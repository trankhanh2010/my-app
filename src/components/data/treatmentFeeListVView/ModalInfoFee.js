import React from "react";
import NoFee from "../../common/Info/NoFee";
import Fee from "../../common/Info/Fee";
import PayIcon from "../../common/Icon/PayIcon";

const Modal = ({
    isOpen,
    onCancel,
    onOk,
    numDepositReqList,
    countFeeDepositReqList,
    fee,
    selectedRecord,
    loadingFetchTreatmentFeeDetail,
    loading,
    authOtp = true,
    payNow, 
    setPayNow,

}) => {
    if (!isOpen) return null;
    if (!selectedRecord) return
    if (loadingFetchTreatmentFeeDetail || loading) return
    if (selectedRecord.feeLockTime != null || selectedRecord.treatmentEndTypeId != null) return 
    if (numDepositReqList <= 0 && countFeeDepositReqList <= 0 && fee <= 0) return
    if (!authOtp) return 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full h-auto md:w-auto md:min-w-[50%] max-w-screen max-h-screen p-4 overflow-auto">
                <div className="text-center">
                    <div className="text-sm">
                        <p>Bệnh nhân: <span className="text-blue-500">{selectedRecord.patientName}</span></p>
                        <p>Mã bệnh nhân: <span className="text-blue-500">{selectedRecord.patientCode}</span></p>
                        <p>Mã điều trị đang chọn: <span className="text-blue-500">{selectedRecord.treatmentCode}</span></p>
                    </div>
                    {numDepositReqList <= 0 && countFeeDepositReqList <= 0 && fee <= 0 && (
                        <NoFee />
                    )}
                    {numDepositReqList > 0 && (
                        <Fee
                            mess={`Bạn có ${numDepositReqList} yêu cầu tạm ứng chưa thanh toán với tổng tiền là ${Number(countFeeDepositReqList).toLocaleString()} VNĐ`}
                        />
                    )}
                    {(numDepositReqList == 0 && countFeeDepositReqList == 0 && fee > 0) && (
                        <Fee
                            mess={`Viện phí còn thiếu: ${Number(fee).toLocaleString()} VNĐ`}
                        />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 item-center">
                        <button
                            onClick={() => {
                                onCancel()
                                setPayNow(false)
                            }}
                            className="relative md:order-1 md:col-span-6 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4"
                        >
                            Đóng
                        </button>
                        <button
                            onClick={() => {
                                onOk()
                                // Đã kiểm tra và setPayNow trong onOk()
                            }}
                            className="relative md:order-1 md:col-span-6 py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-gray-200 hover:bg-blue-600 hover:text-white focus:z-10 focus:ring-4"
                        >
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                <PayIcon />
                            </span>
                            Thanh toán ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
