import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useDepositReqListNoLogin from "../../../hooks/data/depositReqListVView/useDepositReqListNoLogin";
import DepositReqListTableNoLogin from "../../../components/data/depositReqListVView/DepositReqListTableNoLogin";
import NoRecordInfo from "../../../components/common/Info/NoRecordInfo";
import NoRecord from "../../../components/common/Info/NoRecord";
import Card from "../../../components/common/Master/Card";

const Page = ({
    paramTreatmentId,
    paramIsDeposit,
    isFullScreen = false,
}) => {
    const {
        fieldLabels,
        format,
        data,
        loading,
        error,
        setError,
        isProcessing,
        limit,
        selectedRecord,
        recordDetails,
        lastId,
        setLastId,
        alerts,
        setLimit,
        filter,
        setFilter,
        setSelectedRecord,
        setRecordDetails,
        convertToDate,
        handleRecordSelect,
        fetchDataAll,
        setApplyFilter,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        handleRawChange,
        setReload,
        loadingRecord,
        treatmentId, 
        setTreatmentId,
        isDeposit, 
        setIsDeposit,
    }
        = useDepositReqListNoLogin();
    // Nếu có param từ trang khác truyền vào thì xử lý
    useEffect(() => {
        if (paramTreatmentId) {
            setTreatmentId(paramTreatmentId);
        }
        if (paramIsDeposit) {
            setIsDeposit(paramIsDeposit);
        }

        setFilterTrigger(true);
    }, [paramTreatmentId, paramIsDeposit]);

    if (!paramTreatmentId) return  <NoRecordInfo/>
    // if (data.length == 0) return  <NoRecord/>
    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Danh sách dữ liệu */}
            <Card className="md:col-span-12">
                <div
                    className={`relative overflow-x-auto overflow-y-auto min-h-[80vh] ${isFullScreen!=null ? (isFullScreen ? 'md:h-[90vh]' : 'md:h-[75vh]') : ''} mb-2 flex flex-col border`}
                >
                    <DepositReqListTableNoLogin
                        fieldLabels={fieldLabels}
                        format={format}
                        data={data}
                        convertToDate={convertToDate}
                        handleRecordSelect={handleRecordSelect}
                        selectedRecord={selectedRecord}
                        loading={loading}
                        setReload={setReload}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Page;
