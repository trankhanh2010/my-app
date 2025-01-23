import React from "react";
import NoFee from "../../common/Info/NoFee";
import Fee from "../../common/Info/Fee";

const Modal = ({
    isOpen,
    onCancel,
    numDepositReqList,
    countFeeDepositReqList,
    fee,
    selectedRecord,
    loadingFetchTreatmentFeeDetail,
    loading,
}) => {
    if (!isOpen) return null;
    if(!selectedRecord) return
    if(loadingFetchTreatmentFeeDetail || loading) return 
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full h-auto md:w-auto md:min-w-[50%] max-w-screen max-h-screen p-4 overflow-auto">
                <div className="text-center">
                    {numDepositReqList <= 0 && countFeeDepositReqList<=0 && fee <= 0 && (
                        <NoFee />
                    )}
                    {(numDepositReqList > 0 || fee > 0) &&(
                        <div className="text-sm">
                            <p>Bệnh nhân: <span className="text-blue-500">{selectedRecord.patientName}</span></p>
                            <p>Mã bệnh nhân: <span className="text-blue-500">{selectedRecord.patientCode}</span></p>
                            <p>Mã điều trị đang chọn: <span className="text-blue-500">{selectedRecord.id}</span></p>
                        </div>
                    )}
                    {numDepositReqList > 0 && (
                        <Fee
                            mess={`Bạn có ${numDepositReqList} yêu cầu tạm ứng chưa thanh toán với tổng tiền là ${Number(countFeeDepositReqList).toLocaleString()} VNĐ`}
                        />
                    )}
                    {fee > 0 && (
                        <Fee
                            mess={`Viện phí còn thiếu: ${Number(fee).toLocaleString()} VNĐ`}
                        />
                    )}                
                    <button
                        onClick={onCancel}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
