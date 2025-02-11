import React from "react";
import DeviceGetOtpTreatmentFeeListTable from "../../components/auth/DeviceGetOtpTreatmentFeeListTable";
import DeviceGetOtpTreatmentFeeListDetails from "../../components/auth/DeviceGetOtpTreatmentFeeListDetails";
import Filter from "../../components/auth/Filter";
import Card from "../../components/common/Master/Card";
import useDeviceGetOtpTreatmentFeeList from "../../hooks/auth/useDeviceGetOtpTreatmentFeeList";
import SectionHeader from "../../components/common/Data/InfoRecord/SectionHeader";
import ModalConfirmUnlockDeviceGetOtpTreatmentFee from "../../components/common/Modal/Normal/ModalConfirmUnlockDeviceGetOtpTreatmentFee";
import ManegerAlert from "../../components/common/Alert/ManegerAlert";

const DeviceGetOtpTreatmentFeeList = () => {
    const {
        fieldLabels,
        data,
        loading,
        isProcessing,
        error,
        selectedRecord,
        recordDetails,
        handleRecordSelect,
        filterTrigger,
        setFilterTrigger,
        openUnlockModal,
        handleUnlock,
        isModalConfirmUnlockOpen,
        confirmUnlock,
        closeModalConfirmUnlock,
        recordToUnlock,
        removeAlert,
        alerts,
    } = useDeviceGetOtpTreatmentFeeList()
    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 w-full`}>
            <Card className={`md:col-span-3 md:row-span-1 h-auto`}>
                <SectionHeader title="Bộ lọc" />
                <div class="relative overflow-x-auto flex flex-col">
                    <Filter
                        loading={loading}
                        setFilterTrigger={setFilterTrigger}
                    />
                </div>
            </Card>
            <Card className={`md:col-span-3 md:row-span-11  md:order-2`}>
                <SectionHeader title="Thông tin chi tiết" />
                <div class="flex-grow relative overflow-x-auto max-h-[100vh] flex flex-col">
                    <DeviceGetOtpTreatmentFeeListDetails
                        selectedRecord={selectedRecord}
                    />
                </div>
            </Card>
            <Card className="md:col-span-9 md:row-span-12">
                <SectionHeader title="Danh sách các thiết bị đang bị chặn nhận mã OTP trong 24h gần nhất" />
                <div class="relative overflow-auto h-[80vh] flex flex-row border">
                    <DeviceGetOtpTreatmentFeeListTable
                        fieldLabels={fieldLabels}
                        data={data}
                        selectedRecord={selectedRecord}
                        loading={loading}
                        error={error}
                        isProcessing={isProcessing}
                        handleRecordSelect={handleRecordSelect}
                        handleUnlock={handleUnlock}
                        openUnlockModal={openUnlockModal}
                    />
                </div>
            </Card>
            {/* Thông báo */}
            <ManegerAlert
                alerts={alerts}
                removeAlert={removeAlert}
                className="top-4"
            />
            {/* Modal xác nhận mở khóa */}
            <ModalConfirmUnlockDeviceGetOtpTreatmentFee
                isOpen={isModalConfirmUnlockOpen}
                onConfirm={confirmUnlock}  // Gọi confirmUnlock nếu xác nhận
                onCancel={closeModalConfirmUnlock}  // Đóng modal nếu không xác nhận
                message={`${recordToUnlock?.device} - ${recordToUnlock?.ip}`} // Truyền tên vào modal
            />
        </div>
    );
};

export default DeviceGetOtpTreatmentFeeList;
