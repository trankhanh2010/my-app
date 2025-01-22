import { useState, useEffect, useRef } from "react";
import depositReqListService from "../../../services/data/depositReqListService";
import usePaymentMomo from '../../transaction/usePaymentMomo';
import pusher from '../../../websocket/pusher';

import config from "../../../config";
import { format } from "date-fns";

const useHook = () => {

    const [loadingRecord, setLoadingRecord] = useState(false);
    const [error, setError] = useState(null);

    const loaiThanhToan = 'ThanhToanTamUngDepositReq'
    // Data bảng phụ
    const [depositReqId, setDepositReqId] = useState();

    const [data, setData] = useState([]);

    const [filterTrigger, setFilterTrigger] = useState(false);

    const fieldLabels = {
        id: "id",
        createTime: "Thời gian tạo",
        creator: "Người tạo",
        modifyTime: "Thời gian sửa",
        modifier: "Người sửa",
        appCreator: "Phần mềm tạo",
        appModifier: "Phần mềm sửa",
        isActive: "Trạng thái",
        isDelete: "Trạng thái",
        groupCode: "",
        depositReqCode: "Mã YCTU",
        treatmentId: "",
        amount: "Số tiền YCTU",
        requestRoomId: "",
        requestDepartmentId: "",
        requestLoginname: "Người yêu cầu",
        requestUsername: "Người yêu cầu",
        description: "Mô tả",
        depositId: "",
        transReqId: "",
        treatmentCode: "Mã điều trị",
        patientId: "",
        tdlPatientCode: "Mã bệnh nhân",
        tdlPatientFirstName: "",
        tdlPatientLastName: "",
        tdlPatientDob: "Ngày sinh bệnh nhân",
        tdlPatientGenderName: "Giới tính",
        tdlPatientName: "Tên bệnh nhân",
        tdlPatientAddress: "Địa chỉ",
        tdlHeinCardNumber: "Mã BHYT",
        tdlPatientTypeId: "",
        tdlHeinMediOrgCode: "",
        tdlTreatmentTypeId: "",
        tdlHeinMediOrgName: "",
        roomCode: "Mã phòng",
        roomName: "Tên phòng",
        room:"Phòng yêu cầu",
        roomTypeCode: "Mã loại phòng",
        roomTypeName: "Tên loại phòng",
        department: "Khoa yêu cầu",
        departmentCode: "Mã khoa",
        departmentName: "Tên khoa",
        bankTransactionCode: "",
        bankTransactionTime: "",
        transactionTime: "Thời gian giao dịch",
        transactionAmount: "Số tiền giao dịch",
        transactionNumOrder: "",
        transactionIsCancel: "",
        accountBookName: "",
        symbolCode: "",
        templateCode: "",

    };
        // Hàm chuyển đổi chuỗi thời gian "YYYYMMDDHHMMSS" thành đối tượng Date
        const convertToDate = (dateString) => {
            if (!dateString) return null;
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);
            const hour = dateString.substring(8, 10);
            const minute = dateString.substring(10, 12);
            const second = dateString.substring(12, 14);
    
            return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
        };
    const fetchData = async () => {
        try {
            setLoadingRecord(true);
            const response = await depositReqListService.getNoLoginById(depositReqId);
            if(response && response.data){
                setData(response.data);
            }else{
                setData()
            }
            setLoadingRecord(false);

        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoadingRecord(false);
        }
    };
    // Lấy từ hookPaymentMomo qua
    const {
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
    } = usePaymentMomo(
        loaiThanhToan
    );
        // Nhận dữ liệu từ websocket để hiện thông báo khi trạng thái giao dịch thay đổi
        useEffect(() => {
            if (payment.orderId) {
                const channel = pusher.subscribe('momo-status-payment-tam-ung-channel');
                channel.bind('momo-status-payment-tam-ung-event', function (data) {
                    // Nếu khớp orderId
                    if (data.data.orderId == payment.orderId) {
                        setGettingResultPayment(true)
                        setOpenModalResultPayment(true);
                        setPayment((prevState) => ({
                            ...prevState, // Giữ lại các giá trị hiện có
                            resultCode: data.data.resultCode, // Ghi đè giá trị mới
                            message: data.data.message, // Ghi đè giá trị mới
                        }));
                        setOpentShowAllPayment(false)
                        setOpenModalPaymentMoMoTheATMNoiDia(false)
                        setOpenModalPaymentMoMoTheQuocTe(false)
                        setOpenModalPaymentMoMoQRCode(false)
                        setGettingResultPayment(false)
                    }
                });
            }
        }, [payment.orderId]);
    useEffect(() => {
        if (filterTrigger) {
            if(depositReqId){
                fetchData()
            }
        }
        setFilterTrigger(false)
    }, [filterTrigger]);
    
    // tải lại dữ liệu khi thanh toán xong
    useEffect(() => {
        if (!openModalResultPayment && data) {
            // Cập nhật lại thông tin yêu cầu tạm ứng
            fetchData()
        }
    }, [openModalResultPayment]); // Gọi lại khi có thay đổi

    // Đóng bảng chọn phương thức thanh toán thì đóng bảng thông báo
    useEffect(() => {
        if (!opentShowAllPayment) {
            setOpenModalOtherLinkPayment(false)
        }
    }, [opentShowAllPayment]); // Gọi lại khi có thay đổi
    return {
        data,
        depositReqId, 
        setDepositReqId,
        loadingRecord,
        error,
        setFilterTrigger,
        fieldLabels,
        convertToDate,
        format,
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
        loaiThanhToan,
    };
};

export default useHook;