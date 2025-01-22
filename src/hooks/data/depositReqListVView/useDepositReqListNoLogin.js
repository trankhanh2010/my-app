import { useState, useEffect, useRef } from "react";
import useMasterList from '../../master/useMasterList';
import depositReqListService from "../../../services/data/depositReqListService";
import config from "../../../config";

const useDepositReqList = () => {

    const [isApiNoAuth, setIsApiNoAuth] = useState(true)

    // Data bảng phụ
    const [applyFilter, setApplyFilter] = useState(false);

    const [isDeposit, setIsDeposit] = useState();
    const [treatmentId, setTreatmentId] = useState();


    // Chuyển đổi ngày sang định dạng YYYYMMDDHHMMSS
    const formatDate = (date, string) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}${month}${day}${string}`;
    };

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
    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setRecordDetails(record);
    };

    // Lấy từ hookMaster qua
    const {
        format,
        data,
        setData,
        reload,
        setReload,
        loadingRecord,
        setLoadingRecord,
        loading,
        isProcessing,
        error,
        setError,
        lastId,
        setLastId,
        limit,
        setLimit,
        selectedRecord,
        setSelectedRecord,
        recordDetails,
        setRecordDetails,
        alerts,
        convertToDate,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        handleRawChange,
        setLoading,
        fetchDataAll,
        filter, 
        setFilter,
    } = useMasterList(
        [],
        [],
        handleRecordSelect,
        null,
        null,
        null,
        null,
        depositReqListService,
        true,
        null,
        null,
        null,
        isApiNoAuth,
    );
    useEffect(() => {
        // Kiểm tra tất cả các trường trong filter khác null
        const allFieldsNotNull = Object.values(filter).every(value => value !== null);

        if (allFieldsNotNull) {
            fetchDataAll();
        }
    }, [filter]); // Gọi lại khi có thay đổi
    
    useEffect(() => {
        if (refreshTrigger) {
            fetchDataAll();
        }

        setRefreshTrigger(false)
    }, [refreshTrigger]); // Gọi lại khi có thay đổi

    useEffect(() => {
        if (filterTrigger) {
            const newFilter = {};
            if (isDeposit) {
                newFilter.isDeposit = isDeposit;
            }
            if (treatmentId) {
                newFilter.treatmentId = treatmentId;
            }


            if (Object.keys(newFilter).length > 0) {
                setFilter(newFilter);
            }
            setData([])
            setApplyFilter(false)
        }

        setFilterTrigger(false)
    }, [filterTrigger]);
    // Tải lại dữ liệu mỗi lần nhấn vào 
    useEffect(() => {
        if (reload) {
            // Cập nhật lại thông tin 
            fetchDataAll();
            setReload(false);
        }
    }, [reload]); // Gọi lại khi có thay đổi
    return {
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
    };
};

export default useDepositReqList;