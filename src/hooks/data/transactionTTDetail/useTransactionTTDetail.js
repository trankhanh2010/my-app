import { useState, useEffect } from "react";
import config from "../../../config";
import transactionTTDetailService from "../../../services/data/transactionTTDetailService";
const useHook = () => {
    const isDB = config.apiService.transactionTTDetailVView.typeGetApi === 'db';

    const [loadingRecord, setLoadingRecord] = useState(false);
    const [error, setError] = useState(null);

    // Data bảng phụ
    const [billCode, setBillCode] = useState();

    const [data, setData] = useState([]);

    const [filterTrigger, setFilterTrigger] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [expandedGroups, setExpandedGroups] = useState({
        patientType: {},
        serviceType: {}
    });
    const fieldLabels = {
        testServiceTypeList:
        {
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
    const fetchData = async () => {
        try {
            setLoadingRecord(true);
            const response = await transactionTTDetailService.getAll(billCode);
            if (isDB) {
                setData(response.data);
            }
            setLoadingRecord(false);

        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoadingRecord(false);
        }
    };

    useEffect(() => {
        if (filterTrigger) {
            if(billCode){
                fetchData()
            }
        }
        setFilterTrigger(false)
    }, [filterTrigger]);

    return {
        data,
        billCode, 
        setBillCode,
        loadingRecord,
        error,
        setFilterTrigger,
        expandedGroups, 
        setExpandedGroups,
        searchTerm, 
        setSearchTerm,
        fieldLabels,
    };
};

export default useHook;