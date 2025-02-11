import { useState, useEffect } from "react";
import otpService from "../../services/otp/otpService";

const useDeviceGetOtpTreatmentFeeList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);     // Dữ liệu bản ghi muốn cập nhật thành
    const [recordDetails, setRecordDetails] = useState(null);
    const [filterTrigger, setFilterTrigger] = useState(false);

    const fieldLabels = {
        device: "Tên thiết bị",
        ip: "Địa chỉ IP",
        totalRequests: "Tổng số lần nhận mã OTP trong 24h",
        firstRequestAt: "Lần yêu cầu nhận mã đầu tiên",
        lastRequestAt: "Lần yêu cầu nhận mã gần nhất",
        ttl: "Thời gian bị chặn",
    };
    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setRecordDetails(record);
    };
    const [isModalConfirmUnlockOpen, setIsModalConfirmUnlockOpen] = useState(false);  // Trạng thái mở modal
    const [recordToUnlock, setRecordToUnlock] = useState(null); // Dữ liệu cần xóa
    const [alerts, setAlerts] = useState([]);

    // Hàm thêm thông báo
    const addAlert = (message, type = "success") => {
        const id = new Date().getTime(); // Tạo ID duy nhất
        setAlerts((prevAlerts) => [...prevAlerts, { id, message, type }]);
        setTimeout(() => removeAlert(id), 3000); // Tự động xóa sau 3 giây
    };

    // Hàm xóa thông báo
    const removeAlert = (id) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };
    // Lấy danh sách 
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await otpService.getDeviceGetOtpTreatmentFeeList()
            setData(response.data);
            setLoading(false)
        } catch (err) {
            console.error("Lỗi khi tải ds thiết bị nhận mã otp:", err);
            setLoading(false)
            setError(true)
        }
    };

    // Mở modal và thiết lập 
    const openUnlockModal = (data) => {
        setRecordToUnlock(data);
        setIsModalConfirmUnlockOpen(true);  // Mở modal
    };
    // Đóng modal
    const closeModalConfirmUnlock = () => {
        setIsModalConfirmUnlockOpen(false);
        setRecordToUnlock(null); // Reset khi đóng modal
    };
    // Hàm xác nhậntừ modal
    const confirmUnlock = () => {
        if (recordToUnlock) {
            handleUnlock(); // Gọi handleUnlock để xóa
            closeModalConfirmUnlock(); // Đóng modal
        }
    };
    const handleUnlock = async () => {
        setIsProcessing(true);
        try {
            const response = await otpService.unlockDeviceLimitTotalRequestSendOtp(recordToUnlock)
            if(response.data.success){
                addAlert("Mở khóa thiết bị thành công!", "success");
            }else{
                addAlert("Mở khóa thiết bị không thành công!", "error");
            }
            hanldeReload()
        } catch (err) {
            addAlert("Lỗi khi mở khóa thiết bị!", "error");
        } finally {
            setIsProcessing(false);
        }
    };
    const hanldeReload = () =>{
        fetchData()
        setSelectedRecord()
        setFilterTrigger(false)
    }
    useEffect(() => {
        if (filterTrigger) {
           hanldeReload()
        }
    }, [filterTrigger]);

    return {
        fieldLabels,
        data,
        loading,
        isProcessing,
        error,
        selectedRecord,
        recordDetails,
        handleRecordSelect,
        filterTrigger,
        setFilterTrigger,
        openUnlockModal,
        isModalConfirmUnlockOpen,
        confirmUnlock,
        closeModalConfirmUnlock,
        recordToUnlock,
        removeAlert,
        alerts,
    };
};

export default useDeviceGetOtpTreatmentFeeList;
