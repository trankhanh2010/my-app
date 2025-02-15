import { useState, useEffect, useRef } from "react";
import treatmentBedRoomListService from "../../../services/data/treatmentBedRoomListService";
import medicalCaseCoverListService from "../../../services/data/medicalCaseCoverListService";
import { format } from "date-fns";

const useTreatmentBedRoomList = () => {
    const [data, setData] = useState()
    const [paramData, setParamData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [applyFilter, setApplyFilter] = useState(false)
    const [filter, setFilter] = useState({
        start : 0,
        limit : 20,
        departmentCode: "NTQ",
        isInBed: null,
        bedRoomIds: null,
        treatmentTypeIds: null,
        isCoTreatDepartment: null,
        patientClassifyIds: null,
        isOut: null,
        addLoginname: null,
        addTimeFrom: null,
        addTimeTo: null,
    })
    const [selectedRecord, setSelectedRecord] = useState()

    const [dataMedicalCaseCover, setDataMedicalCaseCover] = useState()
    const [loadingMedicalCaseCover, setLoadingMedicalCaseCover] = useState(false)
    const [errorMedicalCaseCover, setErrorMedicalCaseCover] = useState(false)

    const [dataDepartment, setDataDepartment] = useState()
    const [loadingDepartment, setLoadingDepartment] = useState(false)
    const [errorDepartment, setErrorDepartment] = useState(false)

    const fieldLabels = {
        id: "Id",
        createTime: "Ngày tạo",
        modifyTime: "Ngày sửa",
        creator: "Người tạo",
        modifier: "Người sửa",
        appCreator: "Phần mềm tạo",
        appModifier: "Phần mềm sửa",
        isActive: "Trạng thái",
        isDelete: "Đã xóa",
        treatmentId: "Id điều trị",
        treatmentCode: "Mã điều trị",
        tdlPatientCode: "Mã bệnh nhân",
        departmentId: "Id khoa",
        departmentCode: "Mã khoa",
        departmentName: "Khoa",
        outTime: "Thời gian ra viện",
        bedId: "Id giường",
        bedCode: "Mã giường",
        bedName: "Tên giường",
        inCode: "Số vào viện",
        addTime: "Thời gian vào",
        addLoginname: "Người thêm",
        addUsername: "Người thêm",
        removeTime: "Thời gian xóa",
        storeBordereauTime: "Thời gian lưu trữ",
        bedRoomId: "Id phòng bệnh",
        bedRoomCode: "Mã phòng bệnh",
        bedRoomName: "Tên phòng bệnh",
        inTreatmentTypeCode: "Mã diện điều trị",
        inTreatmentTypeName: "Tên diện điều trị",
        inTreatmentTypeId: "Id diện điều trị",
        coDepartmentIds: "coDepartmentIds",
        tdlPatientClassifyId: "Id phân loại bệnh nhân",
        patientClassifyName: "Phân loại bệnh nhân",
        patientClassifyCode: "Mã phân loại bệnh nhân",
        tdlPatientName: "Tên bệnh nhân",
        tdlPatientDob: "Ngày sinh bệnh nhân",
        tdlPatientGenderName: "Giới tính bệnh nhân",
        tdlPatientCareerName: "Nghề nghiệp bệnh nhân",
        tdlPatientEthnicName: "Dân tộc",
        tdlPatientNationalName: "Quốc gia",
        tdlPatientAddress: "Địa chỉ bệnh nhân",
        tdlPatientWorkPlaceName: "Nơi làm việc bệnh nhân",
        patientTypeName: "Đối tượng",
        tdlHeinCardNumber: "Mã BHYT",
        tdlHeinCardFromTime: "Từ",
        tdlHeinCardToTime: "Đến",
        tdlPatientRelativeAddress: "Địa chỉ người thân",
        tdlPatientPhone: "Điện thoại bệnh nhân",
        inTime: "Thời gian nhập viện",
        isEmergency: "Cấp cứu",
        inDepartmentName: "Tên khoa vào",
        inDepartmentCode: "Mã khoa vào",
        clinicalInTime: "Thời gian điều trị",
        lastDepartmentCode: "Mã khoa cuối",
        lastDepartmentName: "Tên khoa cuối",
        transferInMediOrgCode: "Mã nơi chuyển viện",
        transferInMediOrgName: "Tên nơi chuyển viện",
        treatmentEndTypeCode: "Mã loại kết thúc điều trị",
        treatmentEndTypeName: "Tên loại kết thúc điều trị",
        treatmentResultCode: 'Mã kết quả điều trị',
        treatmentResultName: "Tên kết quả điều trị",
        surgery: "Khám nghiệm tử thi",
        mainCause: "Lý do tử vong chính",
        isHasAupopsy: "",
        deathTime: "Thời gian tử vong"

    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        // Nếu chưa đến sinh nhật trong năm nay, trừ 1 tuổi
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      
        return age;
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

    // Lấy dữ liệu theo start - limit
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await treatmentBedRoomListService.get(filter);
            setData(response.data);
            setParamData(response.param)
            setLoading(false);

        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoading(false);
        }
    };

    const fetchDataMedicalCaseCover = async (id) => {
        try {
            setLoadingMedicalCaseCover(true);
            const response = await medicalCaseCoverListService.getId(id);
            setDataMedicalCaseCover(response.data);
            setLoadingMedicalCaseCover(false);

        } catch (err) {
            console.error("Fetch error:", err);
            setErrorMedicalCaseCover("Lỗi khi tải dữ liệu vỏ bệnh án.");
            setLoadingMedicalCaseCover(false);
        }
    };

    // const fetchDataDepartment = async (id) => {
    //     try {
    //         setLoadingDepartment(true);
    //         const response = await departmentService.getAllSelect(id);
    //         setDataDepartment(response.data);
    //         setLoadingDepartment(false);

    //     } catch (err) {
    //         console.error("Fetch error:", err);
    //         setErrorDepartment("Lỗi khi tải dữ liệu khoa.");
    //         setLoadingDepartment(false);
    //     }
    // };

    const handleRecordSelect = (record) => {
        setSelectedRecord(record)
        fetchDataMedicalCaseCover(record.id)
    }

    // tải lại dữ liệu khi ấn lọc
    useEffect(() => {
        if (applyFilter) {
            setApplyFilter(false)
            fetchData()
        }

    }, [applyFilter]); // Gọi lại khi có thay đổi
    return {
        data,
        paramData,
        loading,
        error,
        applyFilter,
        setApplyFilter,
        filter,
        setFilter,
        selectedRecord,
        setSelectedRecord,
        fieldLabels,
        convertToDate,
        format,
        calculateAge,
        handleRecordSelect,
        dataMedicalCaseCover,
        loadingMedicalCaseCover,
        errorMedicalCaseCover,
        dataDepartment,
        loadingDepartment,
        errorDepartment,
    };
};

export default useTreatmentBedRoomList;