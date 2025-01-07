import React, { useState } from "react";
import CardElement from "../../common/Master/CardElement";
import ModalPageTransactionList from '../../common/Modal/Page/ModalPageTransactionList';  // Import modal

const Component = ({
    selectedRecord,
}) => {
    let isLSGD = selectedRecord
    const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển modal

    return (
        <>
            <CardElement>
                <div className="mt-1 flex flex-col sm:flex-row sm:space-x-1 border p-2">
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Tạm ứng
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Hoàn ứng
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Thanh toán
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Tạm khóa
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Khóa
                        </button>
                    </div>
                </div>
            </CardElement>
            <CardElement>
                <div className="mt-1 flex flex-col sm:flex-row sm:space-x-1 border p-2">
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Tạm thu DV
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Hoàn ứng
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {

                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Bảng kê
                        </button>
                    </div>
                    <div className="mt-1 w-full flex flex-col">
                        <button
                            onClick={() => {
                                if (!isLSGD) return;  // Nếu isLSGD là false, không làm gì cả
                                setIsModalOpen(true);  // Nếu isLSGD là true, mở modal
                            }}
                            className={`${!isLSGD ? "opacity-50 cursor-not-allowed" : ""} px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate`}
                        >
                            Lịch sử giao dịch
                        </button>
                    </div>
                </div>
            </CardElement>
            {/* Modal */}
            <ModalPageTransactionList 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                paramTreatmentCode={selectedRecord?.treatmentCode??""}
            />
        </>
    );
};

export default Component;
