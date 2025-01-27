import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useDepositReqListNoLogin from "../../../hooks/data/depositReqListVView/useDepositReqListNoLogin";
import DepositReqListCardNoLogin from "../../../components/data/depositReqListVView/DepositReqListCardNoLogin";
import NoRecordInfo from "../../../components/common/Info/NoRecordInfo";
import NoRecord from "../../../components/common/Info/NoRecord";
import Card from "../../../components/common/Master/Card";

const Page = ({
    paramTreatmentId,
    paramIsDeposit,
    setReloadPageFeeList = ()=>{},
    setIsModalDepositReqFeeListOpen = ()=>{},
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
        firstLoadPage, 
        setFirstLoadPage,
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
                    className={`relative overflow-x-auto overflow-y-auto mb-2 flex flex-col border`}
                >
                    <DepositReqListCardNoLogin
                        fieldLabels={fieldLabels}
                        format={format}
                        data={data}
                        convertToDate={convertToDate}
                        handleRecordSelect={handleRecordSelect}
                        selectedRecord={selectedRecord}
                        loading={loading}
                        setReload={setReload}
                        firstLoadPage={firstLoadPage}
                        setFirstLoadPage={setFirstLoadPage}
                        setReloadPageFeeList={setReloadPageFeeList}
                        setIsModalDepositReqFeeListOpen={setIsModalDepositReqFeeListOpen}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Page;
