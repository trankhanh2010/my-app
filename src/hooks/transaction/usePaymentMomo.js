import { useState, useEffect } from "react";
import treatmentFeePaymentService from "../../services/transaction/treatmentFeePaymentService";

const useHook = (
    loaiThanhToan
) => {

    const [opentShowAllPayment, setOpentShowAllPayment] = useState(false)
    const [openModalResultPayment, setOpenModalResultPayment] = useState(false)

    const [creatingPayment, setCreatingPayment] = useState(false)
    const [gettingResultPayment, setGettingResultPayment] = useState(false)
    const [openModalNoFee, setOpenModalNoFee] = useState(false)
    const [openModalPaymentMoMoQRCode, setOpenModalPaymentMoMoQRCode] = useState(false)
    const [openModalPaymentMoMoTheQuocTe, setOpenModalPaymentMoMoTheQuocTe] = useState(false)
    const [openModalPaymentMoMoTheATMNoiDia, setOpenModalPaymentMoMoTheATMNoiDia] = useState(false)
    const [openModalOtherLinkPayment, setOpenModalOtherLinkPayment] = useState(false)
    const [payment, setPayment] = useState({
        checkOtherLink: null,
        deeplink: null,
        payUrl: null,
        qcCodeUrl: null,
        orderId: null,
        amount: null,
        orderInfo: null,
        resultCode: null,
        message: null,
        transactionTypeCode: null,
    });

    // Thanh toán MoMo
    const getPaymentMoMoQRCode = async (code) => {
        try {
            setCreatingPayment(true)
            let response = null
            if(loaiThanhToan == 'ThanhToanTamUngVienPhiConThieu'){
                response = await treatmentFeePaymentService.getPaymentMoMoTamUngQRCode(code);
            }
            if(loaiThanhToan == 'ThanhToanTamUngDepositReq'){
                response = await treatmentFeePaymentService.getPaymentMoMoTamUngDepositReqQRCode(code);
            }
            // Nếu có phí cần thanh toán
            const newPaymentMoMo = {}
            if (response.data.success) {
                newPaymentMoMo.checkOtherLink = response.data.checkOtherLink
                newPaymentMoMo.deeplink = response.data.deeplink
                newPaymentMoMo.payUrl = response.data.payUrl
                newPaymentMoMo.qrCodeUrl = response.data.qrCodeUrl
                newPaymentMoMo.orderId = response.data.orderId
                newPaymentMoMo.amount = response.data.amount
                newPaymentMoMo.orderInfo = response.data.orderInfo
                newPaymentMoMo.transactionTypeCode = response.data.transactionTypeCode
            }
            setPayment(newPaymentMoMo)
            // Nếu có link khác thì hiện thông báo
            if (newPaymentMoMo.checkOtherLink) {
                setOpenModalOtherLinkPayment(true)
                return
            }
            if (response.data.success) {
                setOpenModalPaymentMoMoQRCode(true)
            }
            // Nếu k thể tạo payment hiện ra thông báo
            if (!response.data.success) {
                setOpenModalNoFee(true)
            }
        } catch (err) {
            console.error("Lỗi khi lấy Link thanh toán:", err);
        } finally {
            setCreatingPayment(false)
        }
    };
    const getPaymentMoMoTheQuocTe = async (code) => {
        try {
            setCreatingPayment(true)
            let response = null
            if(loaiThanhToan == 'ThanhToanTamUngVienPhiConThieu'){
                response = await treatmentFeePaymentService.getPaymentMoMoTamUngTheQuocTe(code);
            }
            if(loaiThanhToan == 'ThanhToanTamUngDepositReq'){
                response = await treatmentFeePaymentService.getPaymentMoMoTamUngDepositReqTheQuocTe(code);
            }
            const newPaymentMoMo = {}
            if (response.data.success) {
                newPaymentMoMo.checkOtherLink = response.data.checkOtherLink
                newPaymentMoMo.payUrl = response.data.payUrl
                newPaymentMoMo.orderId = response.data.orderId
                newPaymentMoMo.amount = response.data.amount
                newPaymentMoMo.orderInfo = response.data.orderInfo
                newPaymentMoMo.transactionTypeCode = response.data.transactionTypeCode
            }
            setPayment(newPaymentMoMo)
            // Nếu có link khác thì hiện thông báo
            if (newPaymentMoMo.checkOtherLink) {
                setOpenModalOtherLinkPayment(true)
                return
            }
            if (response.data.success) {
                setOpenModalPaymentMoMoTheQuocTe(true)
            }
            // Nếu k thể tạo payment hiện ra thông báo
            if (!response.data.success) {
                setOpenModalNoFee(true)
            }
        } catch (err) {
            console.error("Lỗi khi lấy Link thanh toán:", err);
        } finally {
            setCreatingPayment(false)
        }
    };
    const getPaymentMoMoTheATMNoiDia = async (code) => {
        try {
            setCreatingPayment(true)
            let response = null
            if(loaiThanhToan == 'ThanhToanTamUngVienPhiConThieu'){
                response = await treatmentFeePaymentService.getPaymentMoMoTamUngTheATMNoiDia(code);
            }
            if(loaiThanhToan == 'ThanhToanTamUngDepositReq'){
                response = await treatmentFeePaymentService.getPaymentMoMoTamUngDepositReqTheATMNoiDia(code);
            }
            const newPaymentMoMo = {}
            if (response.data.success) {
                newPaymentMoMo.checkOtherLink = response.data.checkOtherLink
                newPaymentMoMo.payUrl = response.data.payUrl
                newPaymentMoMo.qrCodeUrl = response.data.qrCodeUrl
                newPaymentMoMo.orderId = response.data.orderId
                newPaymentMoMo.amount = response.data.amount
                newPaymentMoMo.orderInfo = response.data.orderInfo
                newPaymentMoMo.transactionTypeCode = response.data.transactionTypeCode
            }
            setPayment(newPaymentMoMo)
            // Nếu có link khác thì hiện thông báo
            if (newPaymentMoMo.checkOtherLink) {
                setOpenModalOtherLinkPayment(true)
                return
            }
            if (response.data.success) {
                setOpenModalPaymentMoMoTheATMNoiDia(true)
            }
            // Nếu k thể tạo payment hiện ra thông báo
            if (!response.data.success) {
                setOpenModalNoFee(true)
            }
        } catch (err) {
            console.error("Lỗi khi lấy Link thanh toán:", err);
        } finally {
            setCreatingPayment(false)
        }
    };
    return {
        opentShowAllPayment, 
        setOpentShowAllPayment,
        openModalResultPayment, 
        setOpenModalResultPayment,
        creatingPayment, 
        setCreatingPayment,
        gettingResultPayment, 
        setGettingResultPayment,
        openModalNoFee, 
        setOpenModalNoFee,
        openModalPaymentMoMoQRCode, 
        setOpenModalPaymentMoMoQRCode,
        openModalPaymentMoMoTheQuocTe, 
        setOpenModalPaymentMoMoTheQuocTe,
        openModalPaymentMoMoTheATMNoiDia, 
        setOpenModalPaymentMoMoTheATMNoiDia,
        openModalOtherLinkPayment, 
        setOpenModalOtherLinkPayment,
        payment, 
        setPayment,
        getPaymentMoMoQRCode,
        getPaymentMoMoTheQuocTe,
        getPaymentMoMoTheATMNoiDia,
    };
};

export default useHook;
