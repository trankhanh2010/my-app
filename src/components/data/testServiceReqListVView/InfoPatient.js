import React from "react";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import GroupFieldSpanWithText from "../../common/Data/InfoRecord/GroupFieldSpanWithText";

const InfoPatient = ({
    fieldLabels,
    recordDetails,
    format,
    convertToDate,
}) => {
    if (!recordDetails) return  <NoRecordInfo/>
    return (
        <>
            {/* Phần bảng trên */}
            <GroupFieldSpanWithText 
                fields={[
                    {fieldName:fieldLabels.patientName, fieldValue:recordDetails.patientName, divCss:`md:w-[20%] md:border-r`},
                    {fieldName:fieldLabels.dateOfBirth, fieldValue:recordDetails.dateOfBirth, divCss:`md:w-[20%] md:border-r`},
                    {fieldName:fieldLabels.gender, fieldValue:recordDetails.gender, divCss:`md:w-[15%] md:border-r`},
                    {fieldName:fieldLabels.address, fieldValue:recordDetails.address, divCss:`md:w-[45%]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.heinCardNumber, fieldValue:recordDetails.heinCardNumber, divCss:`md:w-[20%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.heinCardFromTime, fieldValue:`${recordDetails.heinCardFromTime ? format(convertToDate(recordDetails.heinCardFromTime), "dd/MM/yyyy") : ""} - ${recordDetails.heinCardToTime ? format(convertToDate(recordDetails.heinCardToTime), "dd/MM/yyyy") : ""}`, divCss:`md:w-[25%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.heinMediOrgName, fieldValue:recordDetails.heinMediOrgName, divCss:`md:w-[30%] md:border-r`},
                    {fieldName:fieldLabels.rightRouteCode, fieldValue:recordDetails.rightRouteCode === 'DT' ? "Đúng tuyến" : recordDetails.rightRouteCode === 'TT' ? "Trái tuyến" : "", divCss:`md:w-[25%]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.inTime, fieldValue:recordDetails.inTime ? format(convertToDate(recordDetails.inTime), "dd/MM/yyyy hh:mm:ss") : "", divCss:`md:w-[30%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.clinicalInTime, fieldValue:recordDetails.clinicalInTime ? format(convertToDate(recordDetails.clinicalInTime), "dd/MM/yyyy hh:mm:ss") : "", divCss:`md:w-[30%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.outTime, fieldValue:recordDetails.outTime ? format(convertToDate(recordDetails.outTime), "dd/MM/yyyy hh:mm:ss") : "", divCss:`md:w-[30%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:'Số ngày', fieldValue:recordDetails.inTime && recordDetails.outTime ?
                        `${Math.ceil((new Date(recordDetails.outTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6")) -
                        new Date(recordDetails.inTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6"))) / (1000 * 60 * 60 * 24))} ngày` : "", 
                        divCss:`md:w-[10%] whitespace-pre-line break-words`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.icdName, fieldValue:recordDetails.icdCode && recordDetails.icdName ? `${recordDetails.icdCode} - ${recordDetails.icdName}` : "", divCss:`md:w-[50%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.icdText, fieldValue:recordDetails.icdSubCode && recordDetails.icdText ? `${recordDetails.icdSubCode} - ${recordDetails.icdText}` : "", divCss:`md:w-[50%] whitespace-pre-line break-words`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.requestRoomName, fieldValue:recordDetails.requestRoomName, divCss:`md:w-[40%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.treatmentEndTypeName, fieldValue:recordDetails.treatmentEndTypeName, divCss:`md:w-[25%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.treatmentResultName, fieldValue:recordDetails.treatmentResultName, divCss:`md:w-[35%] whitespace-pre-line break-words`},
                ]}
            />
        </>
    );
};

export default InfoPatient;
