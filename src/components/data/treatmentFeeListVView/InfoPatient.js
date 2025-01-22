import React from "react";
import Loading from "../../common/Info/Loading";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import GroupFieldSpanWithText from "../../common/Data/InfoRecord/GroupFieldSpanWithText";

const InfoPatient = ({
    fieldLabels,
    recordDetails,
    format,
    convertToDate,
    loadingRecord,
}) => {
    if (!recordDetails) return  <NoRecordInfo/>
    if (loadingRecord) return <Loading/>

    return (
        <>
            {/* Phần bảng trên */}
            <GroupFieldSpanWithText 
                fields={[
                    {fieldName:fieldLabels.patientName, fieldValue:recordDetails.patientName, divCss:`md:w-[60%] md:border-r`},
                    {fieldName:fieldLabels.dateOfBirth, fieldValue:recordDetails.dateOfBirth ? format(convertToDate(recordDetails.dateOfBirth), "dd/MM/yyyy") : "", divCss:`md:w-[40%]`},
                ]}
            />
                       <GroupFieldSpanWithText 
                                       css='mt-1'
                fields={[
                    {fieldName:fieldLabels.gender, fieldValue:recordDetails.gender, divCss:`md:w-[20%] md:border-r`},
                    {fieldName:fieldLabels.address, fieldValue:recordDetails.address, divCss:`md:w-[80%]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.heinCardNumber, fieldValue:recordDetails.heinCardNumber, divCss:`md:w-[70%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.rightRouteCode, fieldValue:recordDetails.rightRouteCode === 'DT' ? "Đúng tuyến" : recordDetails.rightRouteCode === 'TT' ? "Trái tuyến" : "", divCss:`md:w-[30%]`},
                ]}
            />
                        <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.heinCardFromTime, fieldValue:`${recordDetails.heinCardFromTime ? format(convertToDate(recordDetails.heinCardFromTime), "dd/MM/yyyy") : ""} - ${recordDetails.heinCardToTime ? format(convertToDate(recordDetails.heinCardToTime), "dd/MM/yyyy") : ""}`, divCss:`md:w-[60%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.heinMediOrgName, fieldValue:recordDetails.heinMediOrgName, divCss:`md:w-[40%]`},
                ]}
            />
            <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.inTime, fieldValue:recordDetails.inTime ? format(convertToDate(recordDetails.inTime), "dd/MM/yyyy hh:mm:ss") : "", divCss:`md:w-[50%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.clinicalInTime, fieldValue:recordDetails.clinicalInTime ? format(convertToDate(recordDetails.clinicalInTime), "dd/MM/yyyy hh:mm:ss") : "", divCss:`md:w-[50%]  whitespace-pre-line break-words`},
                ]}
            />
                        <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    
                    {fieldName:fieldLabels.outTime, fieldValue:recordDetails.outTime ? format(convertToDate(recordDetails.outTime), "dd/MM/yyyy hh:mm:ss") : "", divCss:`md:w-[50%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:'Số ngày', fieldValue:recordDetails.inTime && recordDetails.outTime ?
                        `${Math.ceil((new Date(recordDetails.outTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6")) -
                        new Date(recordDetails.inTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3T$4:$5:$6"))) / (1000 * 60 * 60 * 24))} ngày` : "", 
                        divCss:`md:w-[50%] whitespace-pre-line break-words`},
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
                    {fieldName:fieldLabels.startRoom, fieldValue:(recordDetails.startRoomCode&&recordDetails.startRoomName)?recordDetails.startRoomCode +' - '+ recordDetails.startRoomName:"", divCss:`md:w-[50%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.endRoom, fieldValue:(recordDetails.endRoomCode&&recordDetails.endRoomName)?recordDetails.endRoomCode +' - '+ recordDetails.endRoomName:"", divCss:`md:w-[50%] whitespace-pre-line break-words`},
                ]}
            />
                        <GroupFieldSpanWithText 
                css='mt-1'
                fields={[
                    {fieldName:fieldLabels.treatmentEndTypeName, fieldValue:recordDetails.treatmentEndTypeName, divCss:`md:w-[50%] md:border-r whitespace-pre-line break-words`},
                    {fieldName:fieldLabels.treatmentResultName, fieldValue:recordDetails.treatmentResultName, divCss:`md:w-[50%] whitespace-pre-line break-words`},
                ]}
            />
        </>
    );
};

export default InfoPatient;
