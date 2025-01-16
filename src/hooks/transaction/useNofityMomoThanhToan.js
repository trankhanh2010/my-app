import { useState, useEffect } from "react";
import nofityMomoService from "../../services/transaction/nofityMomoService";
const useHook = () => {
    const [transactionData, setTransactionData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const ipnMomoThanhToan = async () => {
        try {
            if (transactionData) {
                setLoading(true)
                const response = await nofityMomoService.ipnNofityThanhToan(transactionData);
                const status = response.status
                if(status!=204){
                    setError(true)
                }
                setLoading(false)
            }
        } catch (err) {
            setError(true)
            setLoading(false)
            console.error("Lỗi khi gọi api cập nhật trạng thái thanh toán:", err);
        }
    };
    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = new URLSearchParams(window.location.search);
    
        // Chuyển đổi các tham số thành đối tượng
        const data = Object.fromEntries(queryParams.entries());
    
        // Lưu dữ liệu vào state
        setTransactionData(data);
    }, []);

    useEffect(() => {
        if (transactionData.orderId) {
            // Cập nhật lại thông tin 
            ipnMomoThanhToan();
        }
    }, [transactionData]);
    return {
        transactionData,
        loading,
    };
};

export default useHook;
