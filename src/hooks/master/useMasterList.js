import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useMasterService from "../../services/master/useMasterService";

const useMasterCategoryList = (
    fieldLabels = [],
    fieldsToSkipList = [],
    handleRecordSelect,
    handleAddNew,
    handleCreate,
    handleUpdate,
    handleDelete,
    apiService,
    isDB,
    isElastic,
    recordCode,
) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = useMasterService.getAuthToken();
        if (!token) {
          // Nếu không có token, điều hướng về trang đăng nhập
          navigate('/login');
        }
      }, [navigate]);

    const [changes, setChanges] = useState([]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [keyword, setKeyword] = useState(null);
    const [orderBy, setOrderBy] = useState("modifyTime");
    const [orderDirection, setOrderDirection] = useState("desc");
    const [errorUniqueCode, setErrorUniqueCode] = useState(null)
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [recordDetails, setRecordDetails] = useState(null);

    const start = (page - 1) * limit;
    const totalPages = Math.ceil(totalItems / limit);

    const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);  // Trạng thái mở modal
    const [isModalConfirmUpdateOpen, setIsModalConfirmUpdateOpen] = useState(false);  // Trạng thái mở modal

    const [recordToDelete, setRecordToDelete] = useState(null); // Dữ liệu cần xóa
    const [recordToUpdate, setRecordToUpdate] = useState(null); // Dữ liệu muốn cập nhật thành

    const [alerts, setAlerts] = useState([]);

    const calculateChanges = (oldData, newData, fieldsToSkip = fieldsToSkipList) => {
        const changes = [];
        for (const key in oldData) {
            // Kiểm tra xem trường có nằm trong danh sách bỏ qua không
            if (fieldsToSkip.includes(key)) {
                continue; // Bỏ qua so sánh nếu trường nằm trong danh sách
            }

            // So sánh giá trị sau khi chuyển đổi thành chuỗi để tránh vấn đề về kiểu dữ liệu
            const oldValue = oldData[key] != null ? oldData[key].toString() : "";
            const newValue = newData[key] != null ? newData[key].toString() : "";

            if (oldValue !== newValue) {
                changes.push({
                    field: fieldLabels[key] || key, // Dùng nhãn hoặc tên gốc nếu không có nhãn
                    oldValue: oldValue,
                    newValue: newValue,
                });
            }
        }
        return changes;
    };
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

    // Mở modal và thiết lập giường cần xóa
    const openDeleteModal = (data) => {
        setRecordToDelete(data);
        setIsModalConfirmDeleteOpen(true);  // Mở modal
    };

    // Đóng modal
    const closeModalConfirmDelete = () => {
        setIsModalConfirmDeleteOpen(false);
        setRecordToDelete(null); // Reset giường khi đóng modal
    };

    // Hàm xác nhận xóa từ modal
    const confirmDelete = () => {
        if (recordToDelete) {
            handleDelete(recordToDelete.id, recordToDelete.bedName); // Gọi handleDelete để xóa
            closeModalConfirmDelete(); // Đóng modal sau khi xóa
        }
    };

    // Mở modal và thiết lập giường cần cập nhật
    const openUpdateModal = (data) => {
        setRecordToUpdate(data);
        setIsModalConfirmUpdateOpen(true);  // Mở modal
    };

    // Đóng modal
    const closeModalConfirmUpdate = () => {
        setIsModalConfirmUpdateOpen(false);
        setRecordToUpdate(null); // Reset giường khi đóng modal
    };

    // Hàm xác nhận cập nhật từ modal
    const confirmUpdate = () => {
        if (recordToUpdate) {
            handleUpdate(recordToUpdate);
            closeModalConfirmUpdate();
        }
    };

    const fetchData = async () => {
        try {
            const response = await apiService.get(start, limit, orderBy, orderDirection, keyword || null);
            if (isDB) {
                setData(response.data);
            }
            if (isElastic) {
                setData(
                    response.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
            setTotalItems(response.param.Count); // Tổng bản ghi
            setLoading(false);

        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoading(false);
        }
    };

    const checkUniqueCode = async (code, id = null) => {
        if(code != ""){
            try {
                const response = await apiService.checkUniqueCode(code, id);
                if (!response.data.available) {
                    return `${recordCode} đã được sử dụng`;
                }
                return null;  // Không có lỗi, mã hợp lệ
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Lỗi khi tải dữ liệu.");
            }
        }
    }
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
    useEffect(() => {
        setErrorUniqueCode(null); // Reset lỗi unique khi bản ghi thay đổi
    }, [recordDetails]);
    return {
        changes,
        setChanges,
        data,
        setData,
        loading,
        setLoading,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        page,
        setPage,
        limit,
        setLimit,
        totalItems,
        setTotalItems,
        keyword,
        setKeyword,
        orderBy,
        setOrderBy,
        orderDirection,
        setOrderDirection,
        selectedRecord,
        setSelectedRecord,
        recordDetails,
        setRecordDetails,
        start,
        totalPages,
        isModalConfirmDeleteOpen,
        setIsModalConfirmDeleteOpen,
        isModalConfirmUpdateOpen,
        setIsModalConfirmUpdateOpen,
        recordToDelete,
        setRecordToDelete,
        recordToUpdate,
        setRecordToUpdate,
        errorUniqueCode,
        setErrorUniqueCode,
        alerts,
        setAlerts,
        calculateChanges,
        addAlert,
        removeAlert,
        openDeleteModal,
        closeModalConfirmDelete,
        confirmDelete,
        openUpdateModal,
        closeModalConfirmUpdate,
        confirmUpdate,
        fetchData,
        checkUniqueCode,
        convertToDate,
    };
};

export default useMasterCategoryList;