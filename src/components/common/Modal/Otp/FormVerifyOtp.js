import React from "react";
import Loading from '../../Info/Loading';
import Fail from '../../Info/Fail';
import SendOtpPhoneTreatmentFee from "../Otp/SendOtpPhoneTreatmentFee"
import SendOtpEmailTreatmentFee from "../Otp/SendOtpEmailTreatmentFee"
import SendOtpPatientRelativePhone from "../Otp/SendOtpPatientRelativePhone"
import SendOtpPatientRelativeMobile from "../Otp/SendOtpPatientRelativeMobile"
import InputOtp from "../Otp/InputOtp"
import StatusVerifyOtp from "../Otp/StatusVerifyOtp"
import ButtonVerifyOtp from "../Otp/ButtonVerifyOtp"
import ButtonCloseForm from "../Otp/ButtonCloseForm"

const Component = ({
    onCancel,
    loadingVerifyOtpTreatmentFee,
    onConfirmOtp,
    selectedRecord,
    verifyOtpTreatmentFeeData,
    setVerifyOtpTreatmentFeeData,
    setApplyFilterCursor,
    setFilterTrigger,
    loadingSendOtpPhoneTreatmentFee,
    loadingSendOtpMailTreatmentFee,
    loadingSendOtpPatientRelativePhoneTreatmentFee,
    loadingSendOtpPatientRelativeMobileTreatmentFee,
    otp,
    handleChange,
    inputRefs,
    handleKeyDown,
    handleFocus,
    handlePaste,
    disabledSendOtp,
    handleResendPhoneOtp,
    resendPhoneTimeout,
    handleResendMailOtp,
    resendMailTimeout,
    maskEmail,
    handleResendPatientRelativePhoneOtp,
    resendPatientRelativePhoneTimeout,
    handleResendPatientRelativeMobileOtp,
    resendPatientRelativeMobileTimeout,
}) => {
    if (loadingVerifyOtpTreatmentFee) return <Loading />

    return ((
        <>
            <StatusVerifyOtp
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                setApplyFilterCursor={setApplyFilterCursor}
                setFilterTrigger={setFilterTrigger}
                setVerifyOtpTreatmentFeeData={setVerifyOtpTreatmentFeeData}
            />

            <InputOtp
                otp={otp}
                handleChange={handleChange}
                inputRefs={inputRefs}
                handleKeyDown={handleKeyDown}
                handleFocus={handleFocus}
                handlePaste={handlePaste}
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
            />

            <ButtonVerifyOtp
                otp={otp}
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                disabledSendOtp={disabledSendOtp}
                onConfirmOtp={onConfirmOtp}
            />

            <SendOtpPhoneTreatmentFee
                selectedRecord={selectedRecord}
                loadingSendOtpPhoneTreatmentFee={loadingSendOtpPhoneTreatmentFee}
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                handleResendPhoneOtp={handleResendPhoneOtp}
                resendPhoneTimeout={resendPhoneTimeout}
                disabledSendOtp={disabledSendOtp}
            />

            <SendOtpEmailTreatmentFee
                selectedRecord={selectedRecord}
                loadingSendOtpMailTreatmentFee={loadingSendOtpMailTreatmentFee}
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                handleResendMailOtp={handleResendMailOtp}
                resendMailTimeout={resendMailTimeout}
                disabledSendOtp={disabledSendOtp}
                maskEmail={maskEmail}
            />

            <SendOtpPatientRelativePhone
                selectedRecord={selectedRecord}
                loadingSendOtpPatientRelativePhoneTreatmentFee={loadingSendOtpPatientRelativePhoneTreatmentFee}
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                handleResendPatientRelativePhoneOtp={handleResendPatientRelativePhoneOtp}
                resendPatientRelativePhoneTimeout={resendPatientRelativePhoneTimeout}
                disabledSendOtp={disabledSendOtp}
            />

            <SendOtpPatientRelativeMobile
                selectedRecord={selectedRecord}
                loadingSendOtpPatientRelativeMobileTreatmentFee={loadingSendOtpPatientRelativeMobileTreatmentFee}
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                handleResendPatientRelativeMobileOtp={handleResendPatientRelativeMobileOtp}
                resendPatientRelativeMobileTimeout={resendPatientRelativeMobileTimeout}
                disabledSendOtp={disabledSendOtp}
            />

            <ButtonCloseForm
                verifyOtpTreatmentFeeData={verifyOtpTreatmentFeeData}
                onCancel={onCancel}
                setVerifyOtpTreatmentFeeData={setVerifyOtpTreatmentFeeData}
                setApplyFilterCursor={setApplyFilterCursor}
                setFilterTrigger={setFilterTrigger}
            />
        </>
    )
    )
}

export default Component