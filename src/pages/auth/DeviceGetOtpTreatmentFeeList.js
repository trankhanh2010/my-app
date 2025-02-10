import React from "react";
import DeviceGetOtpTreatmentFeeListTable from "../../components/auth/DeviceGetOtpTreatmentFeeListTable";
import Card from "../../components/common/Master/Card";
import useDeviceGetOtpTreatmentFeeList from "../../hooks/auth/useDeviceGetOtpTreatmentFeeList";

const DeviceGetOtpTreatmentFeeList = () => {
    const {
        fieldLabels,
        data,
        loading,
        isProcessing,
        error,
        selectedRecord,
        recordDetails,
    } = useDeviceGetOtpTreatmentFeeList()
    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 w-full`}>
            <Card className="md:col-span-9 md:order-2">
                <div class="mt-1 relative overflow-auto h-[70vh] flex flex-row border">
                    <DeviceGetOtpTreatmentFeeListTable
                        fieldLabels={fieldLabels}
                        data={data}
                        selectedRecord={selectedRecord}
                        loading={loading}
                        error={error}
                        isProcessing={isProcessing}
                    />
                </div>
            </Card>

        </div>
    );
};

export default DeviceGetOtpTreatmentFeeList;
