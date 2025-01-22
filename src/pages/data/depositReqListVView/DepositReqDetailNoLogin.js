import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useDepositReqDetailNoLogin from "../../../hooks/data/depositReqListVView/useDepositReqDetailNoLogin";
import DepositReqDetailNoLogin from "../../../components/data/depositReqListVView/DepositReqDetailNoLogin";
import NoRecordInfo from "../../../components/common/Info/NoRecordInfo";
import NoRecord from "../../../components/common/Info/NoRecord";
import ShowAllPayment from "../../../components/common/Modal/Payment/ShowAllPayment";
import ResultPaymentModal from "../../../components/common/Modal/Payment/ResultPaymentModal";
import Card from "../../../components/common/Master/Card";
import NoFeeModal from "../../../components/common/Modal/Payment/NoFeeModal";

const Page = ({
    paramDepositReqId,
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
        depositReqId,
        setDepositReqId,
        getPaymentMoMoQRCode,
        getPaymentMoMoTheQuocTe,
        getPaymentMoMoTheATMNoiDia,
        payment,
        openModalPaymentMoMoQRCode,
        setOpenModalPaymentMoMoQRCode,
        openModalPaymentMoMoTheQuocTe,
        setOpenModalPaymentMoMoTheQuocTe,
        openModalPaymentMoMoTheATMNoiDia,
        setOpenModalPaymentMoMoTheATMNoiDia,
        opentShowAllPayment,
        setOpentShowAllPayment,
        openModalResultPayment,
        setOpenModalResultPayment,
        gettingResultPayment,
        handleOpenMoMoPayment,
        openModalNoFee,
        setOpenModalNoFee,
        creatingPayment,
        openModalOtherLinkPayment,
        setOpenModalOtherLinkPayment,
        loaiThanhToan
    }
        = useDepositReqDetailNoLogin();
    // Nếu có param từ trang khác truyền vào thì xử lý
    useEffect(() => {
        if (paramDepositReqId) {
            setDepositReqId(paramDepositReqId);
        }
        setFilterTrigger(true);
    }, [paramDepositReqId]);

    // if (!paramDepositReqId) return  <NoRecordInfo/>
    // if (data.length == 0) return  <NoRecord/>
    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Danh sách dữ liệu */}
            <Card className="md:col-span-12">
                <div
                    className={`relative overflow-x-auto overflow-y-auto ${isFullScreen != null ? (isFullScreen ? 'md:h-[90vh]' : 'md:h-auto') : ''} mb-2 flex flex-col `}
                >
                    <DepositReqDetailNoLogin
                        fieldLabels={fieldLabels}
                        format={format}
                        data={data}
                        convertToDate={convertToDate}
                        handleRecordSelect={handleRecordSelect}
                        selectedRecord={selectedRecord}
                        loading={loadingRecord}
                        setReload={setReload}
                        setOpentShowAllPayment={setOpentShowAllPayment}
                    />
                </div>
            </Card>

            <ShowAllPayment
                creatingPayment={creatingPayment}
                selectedRecord={data}
                opentShowAllPayment={opentShowAllPayment}
                setOpentShowAllPayment={setOpentShowAllPayment}
                openModalPaymentMoMoQRCode={openModalPaymentMoMoQRCode}
                setOpenModalPaymentMoMoQRCode={setOpenModalPaymentMoMoQRCode}
                openModalPaymentMoMoTheQuocTe={openModalPaymentMoMoTheQuocTe}
                setOpenModalPaymentMoMoTheQuocTe={setOpenModalPaymentMoMoTheQuocTe}
                openModalPaymentMoMoTheATMNoiDia={openModalPaymentMoMoTheATMNoiDia}
                setOpenModalPaymentMoMoTheATMNoiDia={setOpenModalPaymentMoMoTheATMNoiDia}
                openModalOtherLinkPayment={openModalOtherLinkPayment}
                setOpenModalOtherLinkPayment={setOpenModalOtherLinkPayment}
                getPaymentMoMoQRCode={getPaymentMoMoQRCode}
                getPaymentMoMoTheQuocTe={getPaymentMoMoTheQuocTe}
                getPaymentMoMoTheATMNoiDia={getPaymentMoMoTheATMNoiDia}
                payment={payment}
                handleOpenMoMoPayment={handleOpenMoMoPayment}
                loaiThanhToan={loaiThanhToan}
            />
            <ResultPaymentModal
                openModalResultPayment={openModalResultPayment}
                setOpenModalResultPayment={setOpenModalResultPayment}
                payment={payment}
                gettingResultPayment={gettingResultPayment}
            />
            <NoFeeModal
                openModalNoFee={openModalNoFee}
                setOpenModalNoFee={setOpenModalNoFee}
            />
        </div>
    );
};

export default Page;
