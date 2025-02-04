import { useState, useEffect, useRef } from "react";
import config from "../../../config";
import useMasterList from '../../master/useMasterList';
import usePaymentMomo from '../../transaction/usePaymentMomo';
import useOtpTreatmentFee from '../../otp/useOtpTreatmentFee';
import depositReqListService from "../../../services/data/depositReqListService";
import treatmentFeeListService from "../../../services/data/treatmentFeeListService";
import testServiceTypeListService from "../../../services/data/testServiceTypeListService";
import treatmentFeeDetailService from "../../../services/data/treatmentFeeDetailService";
import pusher from '../../../websocket/pusher';
const useTreatmentFeeList = () => {
    const isDB = config.apiService.testServiceReqListVView.typeGetApi === 'db';
    const testServiceTypeListVViewIsDB = config.apiService.testServiceTypeListVView.typeGetApi === 'db';
    const treatmentFeeDetailVViewIsDB = config.apiService.treatmentFeeDetailVView.typeGetApi === 'db';

    const [isApiNoAuth, setIsApiNoAuth] = useState(false)

    const loaiThanhToan = 'ThanhToanTamUngVienPhiConThieu'

    const [isModalDepositReqFeeListOpen, setIsModalDepositReqFeeListOpen] = useState(false); // State để điều khiển modal lịch sử giao dịch

    // Phần hướng dẫn người dùng
    const [isHelpInputFiler, setIsHelpInputFiler] = useState(true)
    const [isHelpButtonSearch, setIsHelpButtonSearch] = useState(true)

    /// Xử lý khi scroll và lấy thêm dữ liệu mới vẫn giữ vị trí scroll cũ
    const scrollContainerRef = useRef(null); // Dùng ref để tham chiếu đến thẻ div
    /// Xử lý chuyển người dùng đến phần thanh toán khi nhấn Thanh toán ngay
    const [payNow, setPayNow] = useState(false);
    const sectionPayInfoRef = useRef(null);
    const handleScrollPayInfo = () => {
        if (sectionPayInfoRef.current) {
            sectionPayInfoRef.current.scrollIntoView({
            behavior: "smooth", // Cuộn mượt mà
            block: "start", // Cuộn đến phần đầu của phần tử
          });
        }
      };
    
    // Data bảng phụ
    const [depositReqList, setDepositReqList] = useState([]);
    const [numDepositReqList, setNumDepositReqList] = useState();
    const [countFeeDepositReqList, setCountFeeDepositReqList] = useState();
    const [fee, setFee] = useState();

    const [testServiceTypeList, setTestServiceTypeList] = useState([]);
    const [treatmentFeeDetail, setTreatmentFeeDetail] = useState([]);
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
    const [loadingFetchDepositReqList, setLoadingFetchDepositReqList] = useState(false);
    const [errorFetchDepositReqList, setErrorFetchDepositReqList] = useState(false);
    const [loadingFetchTestServiceTypeList, setLoadingFetchTestServiceTypeList] = useState(false);
    const [errorFetchTestServiceTypeList, setErrorFetchTestServiceTypeList] = useState(false);
    const [loadingFetchTreatmentFeeDetail, setLoadingFetchTreatmentFeeDetail] = useState(true);
    const [errorFetchTreatmentFeeDetail, setErrorFetchTreatmentFeeDetail] = useState(false);

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
        treatmentResultName: "Kết quả điều trị",
        rightRouteCode: "Loại",
        treatmentEndTypeName: "Loại ra viện",
        endRoomCode: "Mã phòng ra viện",
        endRoomName: "Tên phòng ra viện",
        endRoom: "Phòng kết thúc điều trị",
        startRoom: "Phòng bắt đầu khám",
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
            tdlServiceName: "Tên DV",
            serviceReqStt: "Trạng thái",
        },
    };

    const fetchDepositReqList = async () => {
        try {
            if (treatmentId) {
                setLoadingFetchDepositReqList(true)
                const depositReqList = await depositReqListService.getNoLoginAll({
                    treatmentId: treatmentId,
                    isDeposit: 0,
                });
                const totalAmount = depositReqList.data.reduce((sum, item) => {
                    return sum + (Number(item.amount) || 0); // Nếu amount null/undefined, thêm 0
                }, 0);
                setNumDepositReqList(depositReqList.param.Count)
                setCountFeeDepositReqList(totalAmount)
                setDepositReqList(depositReqList.data);
                setLoadingFetchDepositReqList(false)
                setErrorFetchDepositReqList(false)
            }
        } catch (err) {
            setErrorFetchDepositReqList(true)
            console.error("Lỗi khi tải DepositReqList:", err);
        } finally {
            setLoadingFetchDepositReqList(false)
        }
    };
    const fetchTestServiceTypeList = async () => {
        try {
            if (treatmentId) {
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
        } finally {
            setLoadingFetchTestServiceTypeList(false)
        }
    };
    const fetchTreatmentFeeDetail = async () => {
        try {
            if (treatmentId) {
                setLoadingFetchTreatmentFeeDetail(true)
                const treatmentFeeDetail = await treatmentFeeDetailService.getAllSelect(treatmentId);
                if (treatmentFeeDetailVViewIsDB) {
                    setTreatmentFeeDetail(treatmentFeeDetail.data);
                    setFee(treatmentFeeDetail.data.fee)
                }
                setLoadingFetchTreatmentFeeDetail(false)
                setErrorFetchTreatmentFeeDetail(false)
            }
        } catch (err) {
            setErrorFetchTreatmentFeeDetail(true)
            console.error("Lỗi khi tải treatmentFeeDetail:", err);
        } finally {
            setLoadingFetchTreatmentFeeDetail(false)
        }
    };
    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setRecordDetails(record);
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

    // Lấy từ hookMaster qua
    const {
        format,
        dataCursor,
        setDataCursor,
        reload,
        setReload,
        loadingRecord,
        setLoadingRecord,
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
        firstLoadPage, 
        setFirstLoadPage,
        authOtp, 
        setAuthOtp,
        opentFormOtp, 
        setOpentFormOtp,
    } = useMasterList(
        [],
        [],
        handleRecordSelect,
        null,
        null,
        null,
        null,
        treatmentFeeListService,
        isDB,
        null,
        null,
        filterCursor,
        isApiNoAuth,
    );

    const {
        otpTreatmentFeeData,
        setOtpTreatmentFeeData,
        loadingOtpTreatmentFee,
        errorOtpTreatmentFee,
        checkOtpTreatmentFee,
    } = useOtpTreatmentFee();
    // ghi đè lên master
    const handleOpenMoMoPayment = () => {
        if (payment) {
            const deeplink = payment.deeplink
            const fallbackURL = 'https://play.google.com/store/apps/details?id=com.mservice.momotransfer';

            // Gọi hàm openAppMoMoPayment từ masterhook
            openAppMoMoPayment(deeplink, fallbackURL);
        }
    };
    const handleLoadMore = () => {
        if (dataCursor && dataCursor.length > 0) {
            // Đặt vị trí scroll
            setScrollPosition(scrollContainerRef.current.scrollTop);
            const lastRecordId = Number(dataCursor[dataCursor.length - 1].id); // Lấy id cuối cùng
            setLastId(lastRecordId); // Cập nhật lastId
            setRefreshTrigger(true);
        }
    };
    const onConfirmOtp = async (otpCode) => {
        if(otpCode){
            const checkOtp = await checkOtpTreatmentFee(selectedRecord.patientPhone, otpCode, selectedRecord.patientCode)
        }
    }
    useEffect(() => {
        // Kiểm tra tất cả các trường trong filterCursor khác null
        const allFieldsNotNull = Object.values(filterCursor).every(value => value !== null);

        if (allFieldsNotNull) {
            fetchDataCursor();
        }
    }, [filterCursor]); // Gọi lại khi có thay đổi

    /// Xử lý khi scroll và lấy thêm dữ liệu mới vẫn giữ vị trí scroll cũ
    useEffect(() => {
        scrollContainerRef.current.scrollTop = scrollPosition; // Gán lại scrollTop của div
    }, [dataCursor]); // Chạy lại khi data thay đổi

    /// Xử lý hiện xác thực otp
    useEffect(() => {
        // Nếu có dữ liệu và dữ liệu chưa được xác thực ở thiết bị này thì hiện form
        if((dataCursor.length > 0) && (authOtp === false)){
            setOpentFormOtp(true)
       }
    }, [dataCursor]); // Chạy lại khi data thay đổi

    useEffect(() => {
        if (refreshTrigger) {
            fetchDataCursor();
        }

        setRefreshTrigger(false)
    }, [refreshTrigger]); // Gọi lại khi có thay đổi

    useEffect(() => {
        if (filterTrigger) {
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
    // Tải lại dữ liệu mỗi lần nhấn vào 
    useEffect(() => {
        const fetchAndUpdate = async () => {
            try {
                // Cập nhật lại vị trí scroll
                setScrollPosition(scrollContainerRef.current.scrollTop);
                setLoadingRecord(true);
                // Gọi API để lấy dữ liệu mới
                const response = await treatmentFeeListService.getById(selectedRecord.id);
                const updatedRecord = response.data

                // Cập nhật dữ liệu trong dataCursor
                setDataCursor((prevData) =>
                    prevData.map((item) =>
                        item.id == selectedRecord.id ? { ...item, ...updatedRecord } : item
                    )
                );
                // Cập nhật lại bản ghi đang được chọn
                setSelectedRecord(updatedRecord)
                setLoadingRecord(false);
            } catch (error) {
                setError(true)
                console.error("Error fetching record:", error);
            }
        };

        const fetchData = async () => {
            try {
                // Gọi cả hai API song song
                await Promise.all([
                    fetchAndUpdate(), // Lấy dữ liệu mới cho bản ghi được chọn
                    fetchDepositReqList(),
                    fetchTestServiceTypeList(),
                    fetchTreatmentFeeDetail(),
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (reload) {
            // Cập nhật lại thông tin 
            fetchData();
            setReload(false);
        }
    }, [reload]); // Gọi lại khi có thay đổi

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
    // tải lại dữ liệu khi thanh toán xong
    useEffect(() => {
        if (!openModalResultPayment && selectedRecord) {
            // Cập nhật lại thông tin transaction
            setReload(true)
            // fetchDepositReqList()
            // fetchTreatmentFeeDetail()
            // fetchTestServiceTypeList()
        }
    }, [openModalResultPayment]); // Gọi lại khi có thay đổi

    // Đóng bảng chọn phương thức thanh toán thì đóng bảng thông báo
    useEffect(() => {
        if (!opentShowAllPayment) {
            setOpenModalOtherLinkPayment(false)
        }
    }, [opentShowAllPayment]); // Gọi lại khi có thay đổi
    return {
        fieldLabels,
        format,
        dataCursor,
        loading,
        loadingFetchTestServiceTypeList,
        loadingFetchTreatmentFeeDetail,
        error,
        setError,
        isProcessing,
        errorFetchTestServiceTypeList,
        errorFetchTreatmentFeeDetail,
        limitCursor,
        selectedRecord,
        recordDetails,
        lastId,
        setLastId,
        alerts,
        testServiceTypeList,
        treatmentFeeDetail,
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
        openModalNoFee,
        setOpenModalNoFee,
        isApiNoAuth,
        setIsApiNoAuth,
        scrollContainerRef,
        handleLoadMore,
        setReload,
        reload,
        loadingRecord,
        openModalOtherLinkPayment,
        setOpenModalOtherLinkPayment,
        setTreatmentFeeDetail,
        setTestServiceTypeList,
        loaiThanhToan,
        numDepositReqList,
        countFeeDepositReqList,
        fee,
        firstLoadPage, 
        setFirstLoadPage,
        isHelpInputFiler, 
        setIsHelpInputFiler,
        isHelpButtonSearch, 
        setIsHelpButtonSearch,
        sectionPayInfoRef,
        handleScrollPayInfo,
        isModalDepositReqFeeListOpen, 
        setIsModalDepositReqFeeListOpen,
        authOtp, 
        setAuthOtp,
        opentFormOtp, 
        setOpentFormOtp,
        otpTreatmentFeeData,
        loadingOtpTreatmentFee,
        errorOtpTreatmentFee,
        onConfirmOtp,
        setOtpTreatmentFeeData,
        payNow, 
        setPayNow,
    };
};

export default useTreatmentFeeList;