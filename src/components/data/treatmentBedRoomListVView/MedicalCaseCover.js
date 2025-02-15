import React from "react";
import Loading from "../../common/Info/Loading";
import Fail from "../../common/Info/Fail";
import NoRecordInfo from "../../common/Info/NoRecordInfo";
import GroupFieldSpanWithText from "../../common/Data/InfoRecord/GroupFieldSpanWithText";
import AuthOtp from "../../common/Info/AuthOtp";

const MedicalCaseCover = ({
    fieldLabels,
    recordDetails,
    loading,
    error,
}) => {
    if (!recordDetails) return <NoRecordInfo />
    if (loading) return <Loading />
    if (error) return <Fail />

    return (
        <>
 
        </>
    );
};

export default MedicalCaseCover;
