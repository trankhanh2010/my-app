import React from "react";
import NoRecordInfo from "../../common/Info/NoRecordInfo";

const InfoPatient = ({
    fieldLabels,
    recordDetails,
    format,
    convertToDate,
}) => {
    if (!recordDetails) return  <NoRecordInfo/>
    return (
        <div className="text-xs">
            {/* Phần bảng trên */}
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[20%] md:border-r">
                    <span className="font-semibold uppercase">{fieldLabels.patientName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.patientName}</p>
                </div>
                <div className="w-full flex flex-col  md:w-[20%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.dateOfBirth}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.dateOfBirth ? format(convertToDate(recordDetails.dateOfBirth), "dd/MM/yyyy") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[15%] md:border-r">
                    <span className="font-semibold uppercase">{fieldLabels.gender}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.gender}</p>
                </div>
                <div className="w-full flex flex-col md:w-[45%]">
                    <span className="font-semibold uppercase">{fieldLabels.address}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.address}</p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[20%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.heinCardNumber}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.heinCardNumber}</p>
                </div>
                <div className="w-full flex flex-col md:w-[15%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.heinCardFromTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.heinCardFromTime ? format(convertToDate(recordDetails.heinCardFromTime), "dd/MM/yyyy") : ""} -
                    </p>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.heinCardToTime ? format(convertToDate(recordDetails.heinCardToTime), "dd/MM/yyyy") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[40%] md:border-r">
                    <span className="font-semibold uppercase">{fieldLabels.heinMediOrgName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.heinMediOrgCode} - {recordDetails.heinMediOrgName}</p>
                </div>
                <div className="w-full flex flex-col md:w-[25%]">
                    <span className="font-semibold uppercase">{fieldLabels.rightRouteCode}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.rightRouteCode === 'DT' ? "Đúng tuyến" : recordDetails.rightRouteCode === 'TT' ? "Trái tuyến" : ""}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.inTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.inTime ? format(convertToDate(recordDetails.inTime), "dd/MM/yyyy hh:mm:ss") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.clinicalInTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.clinicalInTime ? format(convertToDate(recordDetails.clinicalInTime), "dd/MM/yyyy hh:mm:ss") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.outTime}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">
                        {recordDetails.outTime ? format(convertToDate(recordDetails.outTime), "dd/MM/yyyy hh:mm:ss") : ""}
                    </p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">Số ngày: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">

                        {recordDetails.inTime && recordDetails.outTime ?
                            `${Math.ceil((new Date(recordDetails.outTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6")) -
                                new Date(recordDetails.inTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6"))) / (1000 * 60 * 60 * 24))} ngày` : ""}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[50%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.icdName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.icdCode && recordDetails.icdName ? `${recordDetails.icdCode} - ${recordDetails.icdName}` : ""}</p>
                </div>
                <div className="w-full flex flex-col md:w-[50%] whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.icdText}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.icdSubCode && recordDetails.icdText ? `${recordDetails.icdSubCode} - ${recordDetails.icdText}` : ""}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 mt-1">
                <div className="w-full flex flex-col md:w-[50%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.requestRoomName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.requestRoomName}</p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] md:border-r whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.treatmentEndTypeName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.treatmentEndTypeName}</p>
                </div>
                <div className="w-full flex flex-col md:w-[25%] whitespace-pre-line break-words">
                    <span className="font-semibold uppercase">{fieldLabels.treatmentResultName}: </span>
                    <p className="p-1 mr-2 bg-gray-100 flex-grow">{recordDetails.treatmentResultName}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoPatient;
