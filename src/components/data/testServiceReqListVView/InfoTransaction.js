import React from "react";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import Loading from "../../common/Info/Loading";
import ErrorInfo from "../../common/Info/ErrorInfo";

const InfoTransaction = ({
    recordDetails,
    testServiceTypeList,
    selectedRecord,
    loadingFetchTestServiceTypeList,
    errorFetchTestServiceTypeList,
}) => {
    if (!recordDetails) return <NoRecordInfo/>
    if (loadingFetchTestServiceTypeList) return <Loading/>
    if (errorFetchTestServiceTypeList) return <ErrorInfo/>
    // Tổng các tiền
    const totalVirPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPrice) || 0), 0);
    const totalHeinPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalHeinPrice) || 0), 0);
    const totalOtherSourcePrice = testServiceTypeList.reduce((total, record) => total + (Number(record.otherSourcePrice) || 0), 0);
    const totalPatientPrice = testServiceTypeList.reduce((total, record) => total + (Number(record.virTotalPatientPrice) || 0), 0);
    return (
        <div className="text-xs">
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[50%] md:border-r">
                <span className="font-semibold uppercase">Tổng chi phí: </span>
                <p className="p-1 mr-2 bg-gray-100 flex-grow">{totalVirPrice.toLocaleString()}</p>
                </div>
                <div className="w-full flex flex-col md:w-[50%]">
                <span className="font-semibold uppercase">BHYT thanh toán: </span>
                <p className="p-1 mr-2 bg-gray-100 flex-grow">{totalHeinPrice.toLocaleString()}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[50%] md:border-r">
                <span className="font-semibold uppercase">Nguồn khác thanh toán: </span>
                <p className="p-1 mr-2 bg-gray-100 flex-grow">{totalOtherSourcePrice.toLocaleString()}</p>
                </div>
                <div className="w-full flex flex-col md:w-[50%]">
                <span className="font-semibold uppercase">Công ty thanh toán: </span>
                <p className="p-1 mr-2 bg-gray-100 flex-grow">null</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[50%] md:border-r">
                <span className="font-semibold uppercase">BN phải thanh toán: </span>
                <p className="p-1 mr-2 bg-gray-100 flex-grow">{totalPatientPrice.toLocaleString()}</p>
                </div>
                <div className="w-full flex flex-col md:w-[50%]">
                <span className="font-semibold uppercase">Miễn giảm: </span>
                <p className="p-1 mr-2 bg-gray-100 flex-grow">null</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[100%]">
                <span className="font-semibold text-red-600 uppercase">BN cần nộp thêm: </span>
                            <p className="p-1 flex-grow text-red-600 font-semibold  bg-gray-100 mr-2">
                                {(totalPatientPrice - selectedRecord.totalTreatmentBillAmount).toLocaleString()}
                            </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[50%] md:border-r">
                <span className="font-semibold text-blue-600 uppercase">Đã thu: </span>
                            <p className="p-1 flex-grow text-blue-600 font-semibold  bg-gray-100 mr-2">
                                {Number(selectedRecord.totalTreatmentBillAmount).toLocaleString()}
                            </p>
                </div>
                <div className="w-full flex flex-col md:w-[50%]">
                <span className="font-semibold uppercase">Tạm ứng: </span>
                            <p className="p-1 mr-2 bg-gray-100 flex-grow">
                                {Number(selectedRecord.totalTreatmentTu).toLocaleString()}
                            </p>
                </div>
            </div>
        </div>
    );
};

export default InfoTransaction;
