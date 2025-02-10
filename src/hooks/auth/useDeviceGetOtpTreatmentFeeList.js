import { useState, useEffect } from "react";
import otpService from "../../services/otp/otpService";

const useDeviceGetOtpTreatmentFeeList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);     // Dữ liệu bản ghi muốn cập nhật thành
    const [recordDetails, setRecordDetails] = useState(null);

    const fieldLabels = {
        device: "Tên thiết bị",
        ip: "Địa chỉ IP",
        totalRequests: "Tổng số lần nhận mã OTP trong 24h",
        firstRequestAt: "Lần yêu cầu nhận mã đầu tiên",
        lastRequestAt: "Lần yêu cầu nhận mã gần nhất",
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
    useEffect(() => {
        fetchData()
    }, []);  

    return {
        fieldLabels,
        data,
        loading,
        isProcessing,
        error,
        selectedRecord,
        recordDetails,
    };
};

export default useDeviceGetOtpTreatmentFeeList;
