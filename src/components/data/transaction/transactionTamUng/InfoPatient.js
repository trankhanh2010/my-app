import React from "react";
import Loading from "../../../common/Info/Loading";
import NoRecordInfo from "../../../common/Info/NoRecordInfo";
import GroupFieldSpanWithText from "../../../common/Data/InfoRecord/GroupFieldSpanWithText";

const InfoPatient = ({
    fieldLabels,
    recordDetails,
    format,
    convertToDate,
    loadingRecord,
}) => {
    if (loadingRecord) return <Loading/>
    if (!recordDetails) return  <NoRecordInfo/>

    return (
        <>
            {/* Phần bảng trên */}
            <GroupFieldSpanWithText 
                fields={[
                    {fieldName:fieldLabels.patientCode, fieldValue:recordDetails.patientCode, 
                        // divCss:`md:w-[30%] md:border-r`
                    },
                    {fieldName:fieldLabels.patientName, fieldValue:recordDetails.patientName, 
                        // divCss:`md:w-[40%] md:border-r`
                    },
                    {fieldName:fieldLabels.dateOfBirth, fieldValue:recordDetails.dateOfBirth ? format(convertToDate(recordDetails.dateOfBirth), "dd/MM/yyyy") : "", 
                        // divCss:`md:w-[30%] md:border-r`
                    },
                ]}
                css={'md:flex-col md:space-x-0'}
            />
            <GroupFieldSpanWithText 
                css='mt-1 md:flex-col md:space-x-0'
                fields={[
                    {fieldName:fieldLabels.gender, fieldValue:recordDetails.gender, 
                        // divCss:`md:w-[20%] md:border-r`
                    },
                    {fieldName:fieldLabels.address, fieldValue:recordDetails.address, 
                        // divCss:`md:w-[80%]`
                    },
                ]}
            />
        </>
    );
};

export default InfoPatient;
