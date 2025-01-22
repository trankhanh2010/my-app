import { useState, useEffect, useRef } from "react";
import depositReqListService from "../../../services/data/depositReqListService";
import config from "../../../config";
import { format } from "date-fns";

const useHook = () => {

    const [loadingRecord, setLoadingRecord] = useState(false);
    const [error, setError] = useState(null);

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
            setData(response.data);
            setLoadingRecord(false);

        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoadingRecord(false);
        }
    };

    useEffect(() => {
        if (filterTrigger) {
            if(depositReqId){
                fetchData()
            }
        }
        setFilterTrigger(false)
    }, [filterTrigger]);

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
    };
};

export default useHook;