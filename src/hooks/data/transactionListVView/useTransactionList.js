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
    const [isApiNoAuth, setIsApiNoAuth] = useState(false)

    // Data bảng phụ
    const [applyFilterCursor, setApplyFilterCursor] = useState(false);
    const [filterCursor, setFilterCursor] = useState({
        fromTime: null,
        toTime: null,
        transactionTypeId: null,
        transactionCode: null,        
        treatmentCode: null,
    });
    
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

    const validateDateRange = (from, to) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const range = (toDate - fromDate) / (1000 * 60 * 60 * 24)
        return range <= 60 && range >= 0;
    };

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
        dataCursor,
        setDataCursor,
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
        limitCursor,
        setLimitCursor,
        selectedRecord,
        setSelectedRecord,
        recordDetails,
        setRecordDetails,
        alerts,
        fetchDataCursor,
        convertToDate,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        handleRawChange,
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
        filterCursor,
        isApiNoAuth,
    );
    const handleLoadMore = () => {
        if (dataCursor && dataCursor.length > 0) {
            // Đặt vị trí scroll
            setScrollPosition(scrollContainerRef.current.scrollTop);
            const lastRecordId = Number(dataCursor[dataCursor.length - 1].id); // Lấy id cuối cùng
            setLastId(lastRecordId); // Cập nhật lastId
            setRefreshTrigger(true);
        }
    };
    useEffect(() => {
        // Kiểm tra tất cả các trường trong filterCursor khác null
        const allFieldsNotNull = Object.values(filterCursor).every(value => value !== null);

        if (allFieldsNotNull) {
            fetchDataCursor();
        }
    }, [filterCursor]); // Gọi lại khi có thay đổi

    /// Xử lý khi scroll và lấy thêm dữ liệu mới vẫn giữ vị trí scroll cũ
    useEffect(() => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollTop = scrollPosition; // Gán lại scrollTop của div
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
            if (transactionTypeId) {
                newFilterCursor.transactionTypeId = transactionTypeId;
            }
            if (transactionCode) {
                newFilterCursor.transactionCode = transactionCode;
            }
            if (treatmentCode) {
                newFilterCursor.treatmentCode = treatmentCode;
            }
            if(listTransactionType.length > 0){
                newFilterCursor.listTransactionType = listTransactionType;
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
                const response = await transactionListService.getById(selectedRecord.id);
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

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTransactionTypes();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [transactionTypeKeyword]); // Gọi lại khi có thay đổi
    return {
        fieldLabels,
        format,
        dataCursor,
        loading,
        error,
        setError,
        isProcessing,
        limitCursor,
        selectedRecord,
        recordDetails,
        lastId,
        setLastId,
        alerts,
        setLimitCursor,
        filterCursor,
        setFilterCursor,
        fromTime, setFromTime,
        toTime, setToTime,
        setSelectedRecord,
        setRecordDetails,
        convertToDate,
        handleRecordSelect,
        fetchDataCursor,
        setApplyFilterCursor,
        transactionTypeId, setTransactionTypeId,
        refreshTrigger,
        setRefreshTrigger,
        filterTrigger,
        setFilterTrigger,
        scrollPosition,
        setScrollPosition,
        handleRawChange,
        scrollContainerRef,
        handleLoadMore,
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