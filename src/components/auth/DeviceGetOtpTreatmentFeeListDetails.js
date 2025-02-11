import React from "react";
import NoRecordInfo from "../common/Info/NoRecordInfo";

const BedDetails = ({ 
    selectedRecord,

 }) => {
    if (!selectedRecord || !selectedRecord.patientCodeList) return <NoRecordInfo />;

    return (
        <div className="">
            {Object.entries(selectedRecord.patientCodeList).map(([code, count]) => (
                <div key={code} className="grid grid-cols-1 border gap-2 p-2 text-lg bg-gray-50">
                    <div className="">
                        Mã bệnh nhân: <span className="text-blue-600 font-semibold">{code}</span>
                    </div>
                    <div className="">
                        Số lần gửi mã OTP thành công: <span className="text-blue-600 font-semibold">{count}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BedDetails;
