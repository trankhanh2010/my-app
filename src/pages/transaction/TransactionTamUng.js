import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTransactionTamUng from "../../hooks/data/transaction/useTransactionTamUng";
import Card from "../../components/common/Master/Card";
import Filter from "../../components/data/transaction/transactionTamUng/Filter";
import InfoPatient from "../../components/data/transaction/transactionTamUng/InfoPatient";
import Form from "../../components/data/transaction/transactionTamUng/Form";
import ModalConfirmCreate from "../../components/common/Modal/Normal/ModalConfirmCreate";
import ManegerAlert from "../../components/common/Alert/ManegerAlert";

const Page = ({
    paramTreatmentCode,
    isFullScreen = true,
}) => {
    const {
        reload,
        setReload,
        loadingRecord,
        setLoadingRecord,
        loading,
        setLoading,
        loadingTreatment,
        setLoadingTreatment,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        treatmentCode,
        setTreatmentCode,
        filterTrigger,
        setFilterTrigger,
        fieldLabels,
        recordDetails,
        setRecordDetails,
        format,
        convertToDate,
        selectedRecord,
        setSelectedRecord,
        validateForm,
        accountBooks,
        setAccountBookKeyword,
        payForms,
        setPayFormKeyword,
        cashierRooms,
        setCashierRoomKeyword,
        handleFormSubmit,
        closeModalConfirmCreate,
        confirmCreate,
        isModalConfirmCreateOpen,
        calculateNewData,
        removeAlert,
        alerts,
        parseNumberToLocalString,
        loadingAccountBook,
        loadingPayForm,
        loadingCashierRoom,
    }
        = useTransactionTamUng();
    // Nếu có param từ trang khác truyền vào thì xử lý
    useEffect(() => {
        if (paramTreatmentCode) {
            setTreatmentCode(paramTreatmentCode);
            setFilterTrigger(true);
        }
    }, [paramTreatmentCode]);
    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Phần điều khiển và lọc */}
            <Card className="md:col-span-3">
                <div className="flex flex-col">
                    <Filter
                        setFilterTrigger={setFilterTrigger}
                        treatmentCode={treatmentCode}
                        setTreatmentCode={setTreatmentCode}
                    />
                </div>
            </Card>

            {/*dữ liệu điều trị*/}
            <Card className="md:col-span-9">
                <div className="relative mb-2 flex flex-col">
                    <InfoPatient
                        fieldLabels={fieldLabels}
                        recordDetails={selectedRecord}
                        format={format}
                        convertToDate={convertToDate}
                        loadingRecord={loadingTreatment}
                    />
                </div>
            </Card>
            {/* Form nhập dữ liệu */}
            {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
            <Card className={` md:col-span-12`}>
                <div className="relative mb-2 flex flex-col ">
                    <Form
                        format={format}
                        convertToDate={convertToDate}
                        recordDetails={recordDetails}
                        fieldLabels={fieldLabels}
                        setRecordDetails={setRecordDetails}
                        accountBooks={accountBooks}
                        setAccountBookKeyword={setAccountBookKeyword}
                        payForms={payForms}
                        setPayFormKeyword={setPayFormKeyword}
                        cashierRooms={cashierRooms}
                        setCashierRoomKeyword={setCashierRoomKeyword}
                        validateForm={validateForm}
                        isProcessing={isProcessing}
                        loadingRecord={loadingRecord}
                        handleFormSubmit={handleFormSubmit}
                        parseNumberToLocalString={parseNumberToLocalString}
                        loadingAccountBook={loadingAccountBook}
                        loadingPayForm={loadingPayForm}
                        loadingCashierRoom={loadingCashierRoom}
                    />
                </div>
            </Card>
            {/* Thông báo */}
            <ManegerAlert
                alerts={alerts}
                removeAlert={removeAlert}
            />
            {/* Modal xác nhận tạo mới */}
            <ModalConfirmCreate
                fields={calculateNewData(recordDetails)}
                isOpen={isModalConfirmCreateOpen}
                onConfirm={confirmCreate}  // Gọi confirmCreate nếu xác nhận
                onCancel={closeModalConfirmCreate}  // Đóng modal nếu không xác nhận
            />
        </div>
    );
};

export default Page;
