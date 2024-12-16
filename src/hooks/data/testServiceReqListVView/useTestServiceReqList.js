import { useState, useEffect, useRef } from "react";
import config from "../../../config";
import useMasterList from '../../master/useMasterList';
import testServiceReqListService from "../../../services/data/testServiceReqListService";
import testServiceTypeListService from "../../../services/data/testServiceTypeListService";

const useTestServiceReqList = () => {
    const isDB = config.apiService.testServiceReqListVView.typeGetApi === 'db';
    const testServiceTypeListVViewIsDB = config.apiService.testServiceTypeListVView.typeGetApi === 'db';

    const [testServiceTypeList, setTestServiceTypeList] = useState([]);
    const [patientId, setPatientId] = useState(0);
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

    const validateDateRange = (from, to) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const range = (toDate - fromDate) / (1000 * 60 * 60 * 24)
        return range <= 7 && range >= 0;
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

    const fetchTestServiceTypeList = async () => {
        try {
            setLoadingFetchTestServiceTypeList(true)
            const testServiceTypeList = await testServiceTypeListService.getAllSelect(patientId || 0);
            if (testServiceTypeListVViewIsDB) {
                setTestServiceTypeList(testServiceTypeList.data);
            }
            setLoadingFetchTestServiceTypeList(false)
            setErrorFetchTestServiceTypeList(false)
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
        }, [patientId]); // Gọi lại khi có thay đổi

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
        patientId,
        setPatientId,
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
    };
};

export default useTestServiceReqList;