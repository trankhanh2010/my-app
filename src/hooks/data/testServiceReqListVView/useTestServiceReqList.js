import { useState, useEffect, useRef } from "react";
import config from "../../../config";
import useMasterList from '../../master/useMasterList';
import testServiceReqListService from "../../../services/data/testServiceReqListService";
import testServiceTypeListService from "../../../services/data/testServiceTypeListService";
import serviceReqpaymentService from "../../../services/transaction/serviceReqPaymentService";
import pusher from '../../../websocket/pusher';
const useTestServiceReqList = () => {
    const isDB = config.apiService.testServiceReqListVView.typeGetApi === 'db';
    const testServiceTypeListVViewIsDB = config.apiService.testServiceTypeListVView.typeGetApi === 'db';
    const [opentShowAllPayment, setOpentShowAllPayment] = useState(false)
    const [openModalResultPayment, setOpenModalResultPayment] = useState(false)
    const [creatingPayment, setCreatingPayment] = useState(false)
    const [gettingResultPayment, setGettingResultPayment] = useState(false)
    const [openModalPaymentMoMoQRCode, setOpenModalPaymentMoMoQRCode] = useState(false)
    const [openModalPaymentMoMoTheQuocTe, setOpenModalPaymentMoMoTheQuocTe] = useState(false)
    const [openModalPaymentMoMoTheATMNoiDia, setOpenModalPaymentMoMoTheATMNoiDia] = useState(false)
    const [payment, setPayment] = useState({
        deeplink : null,
        payUrl : null,
        qcCodeUrl : null,
        orderId: null,
        amount: null,
        orderInfo: null,
        resultCode: null,
        message: null,
    });
    const [testServiceTypeList, setTestServiceTypeList] = useState([]);
    const [treatmentId, setTreatmentId] = useState();
    const [applyFilterCursor, setApplyFilterCursor] = useState(false);
    const [filterCursor, setFilterCursor] = useState({
        fromTime: null,
        toTime: null,
        patientCode: null,
        treatmentCode: null,
        executeDepartmentCode: null,
        isSpecimen: null,
        isNoExcute: null,
    });
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [treatmentCode, setTreatmentCode] = useState();
    const [patientCode, setPatientCode] = useState();

    const [scrollPosition, setScrollPosition] = useState(0); // Lưu trữ vị trí cuộn

    const validateDateRange = (from, to) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const range = (toDate - fromDate) / (1000 * 60 * 60 * 24)
        return range <= 60 && range >= 0;
    };
    const [tdlPatientId, setTdlPatientId] = useState(null);
    const [executeDepartmentCode, setExecuteDepartmentCode] = useState(null);
    const [isSpecimen, setIsSpecimen] = useState(null);
    const [isNoExcute, setIsNoExcute] = useState(null);

    // Chuyển đổi ngày sang định dạng YYYYMMDDHHMMSS
    const formatDate = (date, string) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}${month}${day}${string}`;
    };
    // State lưu giá trị từ khóa tìm kiếm trong bảng dưới
    const [searchTerm, setSearchTerm] = useState("");

    const [expandedGroups, setExpandedGroups] = useState({
        patientType: {},
        serviceType: {}
    });
    const [loadingFetchTestServiceTypeList, setLoadingFetchTestServiceTypeList] = useState(true);
    const [errorFetchTestServiceTypeList, setErrorFetchTestServiceTypeList] = useState(false);

    const fieldLabels = {
        id: "Id",
        createTime: "Ngày tạo",
        creator: "Người tạo",
        isActive: "Trạng thái",
        isDelete: "Đã xóa",
        serviceReqCode: "Mã y lệnh",
        intructionTime: "Thời gian vào",
        heinCardNumber: "Số thẻ BHYT",
        icdCode: "Mã chẩn đoán chính",
        icdName: "Chẩn đoán chính",
        heinMediOrgCode: "Mã nơi ĐKKCBBĐ",
        heinMediOrgName: "Nơi ĐKKCBBĐ",
        requestLoginname: "requestLoginname",
        requestUsername: "requestUsername",
        turnCode: "turnCode",
        nationalName: "Quốc gia",
        priority: "Ưu tiên",
        originalBarcode: "originalBarcode",
        serviceReqTypeId: "Id loại y lệnh",
        serviceReqSttId: "Trạng thái y lệnh",
        executeDepartmentId: "executeDepartmentId",
        treatmentTypeId: "treatmentTypeId",
        treatmentId: "treatmentId",
        icdSubCode: "Mã chẩn đoán phụ",
        icdText: "Chẩn đoán phụ",
        patientCode: "Mã bệnh nhân",
        patientName: "Tên bệnh nhân",
        address: "Địa chỉ",
        dateOfBirth: "Ngày sinh",
        gender: "Giới tính",
        treatmentCode: "Mã điều trị",
        heinCardFromTime: "Hạn thẻ BHYT từ",
        heinCardToTime: "Hạn thẻ BHYT đến",
        inTime: "Thời gian vào",
        outTime: "Thời gian ra",
        clinicalInTime: "Thời gian nhập viện",
        patientPhone: "Điện thoại",
        patientMilitaryRankName: "Quân hàm",
        patientCareerName: "Công việc",
        patientWorkPlaceName: "Nơi làm việc",
        feeLockLoginname: "Người khóa viện phí",
        feeLockTime: "Thời gian khóa viện phí",
        requestRoomCode: "Khoa/Phòng",
        requestRoomName: "Khoa/Phòng",
        patientTypeCode: "patientTypeCode",
        patientTypeName: "Đối tượng",
        treatmentTypeCode: "treatmentTypeCode",
        treatmentTypeName: "treatmentTypeName",
        executeRoomCode: "executeRoomCode",
        executeRoomName: "executeRoomName",
        executeDepartmentCode: "executeDepartmentCode",
        executeDepartmentName: "executeDepartmentName",
        requestDepartmentCode: "requestDepartmentCode",
        requestDepartmentName: "requestDepartmentName",
        treatmentResultName: "Kết quả điều trị",
        rightRouteCode: "Loại",
        treatmentEndTypeName: "Loại ra viện",
        testServiceTypeList: "Danh sách dịch vụ",
        testServiceTypeList: 
        {
            isSpecimen: "isSpecimen",
            isNoExecute: "isNoExecute",
            serviceTypeName: "Loại dịch vụ",
            amount: "SL",
            price: "Đơn giá",
            virTotalPrice: "Thành tiền",
            virTotalHeinPrice: "BH trả",
            virTotalPatientPrice: "BN trả",
            patientTypeName: "Đối tượng",
            vatRatio: "%VAT",
            discount: "Chiết khấu",
            isExpend: "Hao phí",
            tdlServiceReqCode: "Mã YC",
            tdlServiceCode: "Mã DV",
            tdlServiceName: "Tên DV"    
        },
    };
    // Thanh toán MoMo
    const getPaymentMoMoQRCode = async (treatmentCode) => {
        try {
            setCreatingPayment(true)
            const response = await serviceReqpaymentService.getPaymentMoMoQRCode(treatmentCode);
            const newPaymentMoMo = {}
            newPaymentMoMo.deeplink = response.data.deeplink
            newPaymentMoMo.payUrl = response.data.payUrl
            newPaymentMoMo.qrCodeUrl = response.data.qrCodeUrl
            newPaymentMoMo.orderId = response.data.orderId
            newPaymentMoMo.amount = response.data.amount
            newPaymentMoMo.orderInfo = response.data.orderInfo
            setPayment(newPaymentMoMo)
            setOpenModalPaymentMoMoQRCode(true)
        } catch (err) {
            console.error("Lỗi khi lấy Link thanh toán:", err);
        } finally{
            setCreatingPayment(false)
        }
    };
    const getPaymentMoMoTheQuocTe = async (treatmentCode) => {
        try {
            setCreatingPayment(true)
            const response = await serviceReqpaymentService.getPaymentMoMoTheQuocTe(treatmentCode);
            const newPaymentMoMo = {}
            newPaymentMoMo.payUrl = response.data.payUrl
            newPaymentMoMo.orderId = response.data.orderId
            newPaymentMoMo.amount = response.data.amount
            newPaymentMoMo.orderInfo = response.data.orderInfo
            setPayment(newPaymentMoMo)
            setOpenModalPaymentMoMoTheQuocTe(true)
        } catch (err) {
            console.error("Lỗi khi lấy Link thanh toán:", err);
        } finally{
            setCreatingPayment(false)
        }
    };
    const getPaymentMoMoTheATMNoiDia = async (treatmentCode) => {
        try {
            setCreatingPayment(true)
            const response = await serviceReqpaymentService.getPaymentMoMoTheATMNoiDia(treatmentCode);
            const newPaymentMoMo = {}
            newPaymentMoMo.payUrl = response.data.payUrl
            newPaymentMoMo.qrCodeUrl = response.data.qrCodeUrl
            newPaymentMoMo.orderId = response.data.orderId
            newPaymentMoMo.amount = response.data.amount
            newPaymentMoMo.orderInfo = response.data.orderInfo
            setPayment(newPaymentMoMo)
            setOpenModalPaymentMoMoTheATMNoiDia(true)
        } catch (err) {
            console.error("Lỗi khi lấy Link thanh toán:", err);
        } finally{
            setCreatingPayment(false)
        }
    };
    const fetchTestServiceTypeList = async () => {
        try {
            if(treatmentId){
                setLoadingFetchTestServiceTypeList(true)
                const testServiceTypeList = await testServiceTypeListService.getAllSelect(treatmentId);
                if (testServiceTypeListVViewIsDB) {
                    setTestServiceTypeList(testServiceTypeList.data);
                }
                setLoadingFetchTestServiceTypeList(false)
                setErrorFetchTestServiceTypeList(false)
            }
        } catch (err) {
            setErrorFetchTestServiceTypeList(true)
            console.error("Lỗi khi tải testServiceTypeList:", err);
        } finally{
            setLoadingFetchTestServiceTypeList(false)
        }
    };
    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setRecordDetails(record);
    };

    // Lấy từ hookMaster qua
    const {
        format,
        dataCursor,
        setDataCursor,
        loading,
        setLoading,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        lastId,
        setLastId,
        limitCursor,
        setLimitCursor,
        selectedRecord,
        filter,
        setFilter,
        setSelectedRecord,
        recordDetails,
        setRecordDetails,
        alerts,
        setAlerts,
        addAlert,
        removeAlert,
        fetchDataCursor,
        convertToDate,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger, 
        setFilterTrigger,
        handleRawChange,
        formatInputToDate,
        openAppMoMoPayment,
    } = useMasterList(
        [],
        [],
        handleRecordSelect,
        null,
        null,
        null,
        null,
        testServiceReqListService,
        isDB,
        null,
        null,
        filterCursor,
    );
    // ghi đè lên master
    const handleOpenMoMoPayment = () => {
        if(payment){
            const deeplink = payment.deeplink
            const fallbackURL = 'https://play.google.com/store/apps/details?id=com.mservice.momotransfer';
        
            // Gọi hàm openAppMoMoPayment từ masterhook
            openAppMoMoPayment(deeplink, fallbackURL);
        }
    };
    useEffect(() => {
        fetchDataCursor();
    }, [filterCursor]); // Gọi lại khi có thay đổi

    useEffect(() => {
        if(refreshTrigger){
            fetchDataCursor();
        }

        setRefreshTrigger(false)
    }, [refreshTrigger]); // Gọi lại khi có thay đổi

    useEffect(() => {
        if(filterTrigger){
            const newFilterCursor = {};
            if (treatmentCode) {
                newFilterCursor.treatmentCode = treatmentCode;
            }
            if (patientCode) {
                newFilterCursor.patientCode = patientCode;
            }
            // nếu ngày cách nhau không quá 7 ngày
            if (applyFilterCursor) {
                if (fromTime && toTime && validateDateRange(fromTime, toTime)) {
                    newFilterCursor.fromTime = formatDate(fromTime, '000000');
                    newFilterCursor.toTime = formatDate(toTime, '235959');
                }
            }
        
            if (Object.keys(newFilterCursor).length > 0) {
                setFilterCursor(newFilterCursor);
            }
            setScrollPosition(0)
            setLastId(0)
            setDataCursor([])
            setApplyFilterCursor(false)
        }
        
        setFilterTrigger(false)
    }, [filterTrigger]); 

    useEffect(() => { 
        const fetchData = async () => { 
            try { 
                await fetchTestServiceTypeList(); 
            } catch (error) { 
                console.error("Error fetching test service type list:", error); 
            } 
        }; 
            fetchData(); 
        }, [treatmentId]); // Gọi lại khi có thay đổi
    useEffect(() => {
        if(payment.orderId){
            const channel = pusher.subscribe('momo-status-payment-channel');
            channel.bind('momo-status-payment-event', function(data) {
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
    return {
        fieldLabels,
        format,
        dataCursor,
        loading,
        loadingFetchTestServiceTypeList,
        error,
        setError,
        isProcessing,
        errorFetchTestServiceTypeList,
        limitCursor,
        selectedRecord,
        recordDetails,
        lastId,
        setLastId,
        alerts,
        testServiceTypeList,
        treatmentId,
        setTreatmentId,
        searchTerm,
        setSearchTerm,
        expandedGroups,
        setExpandedGroups,
        setLimitCursor,
        filterCursor,
        setFilterCursor,
        fromTime, setFromTime,
        toTime, setToTime,
        tdlPatientId, setTdlPatientId,
        executeDepartmentCode, setExecuteDepartmentCode,
        isSpecimen, setIsSpecimen,
        isNoExcute, setIsNoExcute,
        setSelectedRecord,
        setRecordDetails,
        setAlerts,
        convertToDate,
        addAlert,
        removeAlert,
        handleRecordSelect,
        fetchDataCursor,
        setApplyFilterCursor,
        patientCode, setPatientCode,
        treatmentCode, setTreatmentCode,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger, 
        setFilterTrigger,
        scrollPosition, 
        setScrollPosition,
        handleRawChange,
        creatingPayment,
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
    };
};

export default useTestServiceReqList;