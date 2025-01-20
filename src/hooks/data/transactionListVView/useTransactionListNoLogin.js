import { useState, useEffect, useRef } from "react";
import useMasterList from '../../master/useMasterList';
import transactionListService from "../../../services/data/transactionListService";
import transactionTypeService from "../../../services/category/transactionTypeService";
import config from "../../../config";

const useTransactionList = () => {
    const transactionTypeIsDB = config.apiService.transactionType.typeGetApi === 'db';
    const transactionTypeIsElastic = config.apiService.transactionType.typeGetApi === 'elastic';

    /// Xử lý khi scroll và lấy thêm dữ liệu mới vẫn giữ vị trí scroll cũ
    const scrollContainerRef = useRef(null); // Dùng ref để tham chiếu đến thẻ div
    const [isApiNoAuth, setIsApiNoAuth] = useState(true)

    // Data bảng phụ
    const [applyFilter, setApplyFilter] = useState(false);
    
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [transactionTypeKeyword, setTransactionTypeKeyword] = useState(null);
    const [listTransactionType, setListTransactionType] = useState([]);
    const [loadingTransactionType, setLoadingTransactionType] = useState(false);

    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [transactionTypeId, setTransactionTypeId] = useState();
    const [transactionCode, setTransactionCode] = useState();
    const [treatmentCode, setTreatmentCode] = useState();

    const [scrollPosition, setScrollPosition] = useState(0); // Lưu trữ vị trí cuộn

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
        isDelete: "Xóa",
        transactionCode: "Mã giao dịch",
        transactionTypeId: "Id loại giao dịch",
        amount: "Số tiền",
        isCancel: "Hủy",
        kcAmount: "Tổng kết chuyển",
        tdlBillFundAmount: "Quỹ chi trả",
        exemption: "Miễn giảm",
        exemptionReason: "Lý do miễn giảm",
        roundedTotalPrice: "Tiền làm tròn",
        swipeAmount: "Số tiền quẹt thẻ",
        transferAmount: "Số tiền chuyển khoản",
        bankTransactionCode: "Mã giao dịch ngân hàng",
        transactionTime: "Thời gian giao dịch",
        cashierLoginname: "Người tạo giao dịch",
        cashierUsername: "Người tạo giao dịch",
        transactionTypeCode: "Mã loại giao dịch",
        transactionTypeName: "Tên loại giao dịch",
        einvoiceNumOrder: "Số chứng từ", // numberOrder trong DB
        cancelReason: "Lý do hủy giao dịch",
        cancelUsername: "Người hủy",
        cancelLoginname: "Người hủy",
        cancelTime: "Thời gian hủy",
        tdlTreatmentCode: "Mã điều trị",
        tdlPatientCode: "Mã bệnh nhân",
        tdlPatientDob: "Ngày sinh",
        tdlPatientName: "Tên bệnh nhân",
        tdlPatientGenderName: "Giới tính",
        bankCode: "Mã ngân hàng",
        bankName: "Tên ngân hàng",
        payFormCode: "Mã hình thức giao dịch",
        payFormName: "Tên hình thức giao dịch",
        cashierRoomName: "Tên phòng thực hiện giao dịch",
        cashierRoomCode: "Mã phòng thực hiện giao dịch",
        accountBookName: "Tên sổ",
        accountBookCode: "Mã sổ",
    };
    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setRecordDetails(record);
    };

        // Lấy danh sách loại giao dịch
        const fetchTransactionTypes = async () => {
            try {
                setLoadingTransactionType(true)
                const transactionTypes = await transactionTypeService.getAllSelect(transactionTypeKeyword || null);
                if (transactionTypeIsDB) {
                    setTransactionTypes(transactionTypes.data);
                }
                if (transactionTypeIsElastic) {
                    setTransactionTypes(
                        transactionTypes.data.map((item) => ({
                            ...item._source, // Lấy dữ liệu chính
                            highlight: item.highlight || {}, // Lấy highlight nếu có
                        }))
                    );
                }
                setLoadingTransactionType(false)
            } catch (err) {
                console.error("Lỗi khi tải buồng bệnh:", err);
                setError(true)
                setLoadingTransactionType(false)
            } 
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
        transactionListService,
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
            if (transactionTypeId) {
                newFilter.transactionTypeId = transactionTypeId;
            }
            if (transactionCode) {
                newFilter.transactionCode = transactionCode;
            }
            if (treatmentCode) {
                newFilter.treatmentCode = treatmentCode;
            }
            if(listTransactionType.length > 0){
                newFilter.listTransactionType = listTransactionType;
            }
            if (applyFilter) {
                if (fromTime && toTime) {
                    newFilter.fromTime = formatDate(fromTime, '000000');
                    newFilter.toTime = formatDate(toTime, '235959');
                }
            }

            if (Object.keys(newFilter).length > 0) {
                setFilter(newFilter);
            }
            setData([])
            setApplyFilter(false)
        }

        setFilterTrigger(false)
    }, [filterTrigger]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTransactionTypes();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [transactionTypeKeyword]); // Gọi lại khi có thay đổi
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
        fromTime, setFromTime,
        toTime, setToTime,
        setSelectedRecord,
        setRecordDetails,
        convertToDate,
        handleRecordSelect,
        fetchDataAll,
        setApplyFilter,
        transactionTypeId, setTransactionTypeId,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        scrollPosition,
        setScrollPosition,
        handleRawChange,
        setReload,
        loadingRecord,
        transactionCode, setTransactionCode,
        treatmentCode, setTreatmentCode,
        transactionTypes, setTransactionTypes,
        transactionTypeKeyword, setTransactionTypeKeyword,
        listTransactionType, setListTransactionType,
        loadingTransactionType,
    };
};

export default useTransactionList;