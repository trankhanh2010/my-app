import { useState, useEffect } from "react";
import config from "../../config";
import bedService from "../../services/bedService";
import bedRoomService from "../../services/bedRoomService";
import bedTypeService from "../../services/bedTypeService";
import { format } from "date-fns";

const useBedList = () => {
    const isDB = config.apiService.bed.typeGetApi === 'db';
    const isElastic = config.apiService.bed.typeGetApi === 'elastic';
    const bedRoomIsDB = config.apiService.bedRoom.typeGetApi === 'db';
    const bedRoomIsElastic = config.apiService.bedRoom.typeGetApi === 'elastic';
    const bedTypeIsDB = config.apiService.bed.typeGetApi === 'db';
    const bedTypeIsElastic = config.apiService.bed.typeGetApi === 'elastic';

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [keyword, setKeyword] = useState(null);
    const [orderBy, setOrderBy] = useState("modifyTime");
    const [orderDirection, setOrderDirection] = useState("desc");

    const [selectedBed, setSelectedBed] = useState(null);
    const [bedDetails, setBedDetails] = useState(null);

    const [bedRooms, setBedRooms] = useState([]);
    const [bedRoomKeyword, setBedRoomKeyword] = useState(null);

    const [bedTypes, setBedTypes] = useState([]);
    const [bedTypeKeyword, setBedTypeKeyword] = useState(null);

    const start = (page - 1) * limit;
    const totalPages = Math.ceil(totalItems / limit);

    const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);  // Trạng thái mở modal
    const [bedToDelete, setBedToDelete] = useState(null); // Giường cần xóa

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

    // Mở modal và thiết lập giường cần xóa
    const openDeleteModal = (bed) => {
        setBedToDelete(bed); 
        setIsModalConfirmDeleteOpen(true);  // Mở modal
    };

    // Đóng modal
    const closeModalConfirmDelete = () => {
        setIsModalConfirmDeleteOpen(false);
        setBedToDelete(null); // Reset giường khi đóng modal
    };

    // Hàm xác nhận xóa từ modal
    const confirmDelete = () => {
        if (bedToDelete) {
            handleDelete(bedToDelete.id, bedToDelete.bedName); // Gọi handleDelete để xóa
            closeModalConfirmDelete(); // Đóng modal sau khi xóa
        }
    };

    const fetchData = async () => {
        try {
            const beds = await bedService.getBeds(start, limit, orderBy, orderDirection, keyword || null);
            if (isDB) {
                setData(beds.data);
            }
            if (isElastic) {
                setData(
                    beds.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
            setTotalItems(beds.param.Count); // Tổng bản ghi
            setLoading(false);

            if (!selectedBed && beds.length > 0) {
                setSelectedBed(beds[0]); // Chọn bản ghi đầu tiên nếu chưa có bản ghi nào được chọn
                setBedDetails(beds[0]);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoading(false);
        }
    };

    // Lấy danh sách buồng bệnh
    const fetchBedRooms = async () => {
        try {
            const bedRooms = await bedRoomService.getAllSelect(bedRoomKeyword || null);
            if (bedRoomIsDB) {
                setBedRooms(bedRooms.data);
            }
            if (bedRoomIsElastic) {
                setBedRooms(
                    bedRooms.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
        } catch (err) {
            console.error("Lỗi khi tải buồng bệnh:", err);
        }
    };
    // Lấy danh sách loại giường
    const fetchBedTypes = async () => {
        try {
            const bedTypes = await bedTypeService.getAllSelect(bedTypeKeyword || null);
            if (bedTypeIsDB) {
                setBedTypes(bedTypes.data);
            }
            if (bedTypeIsElastic) {
                setBedTypes(
                    bedTypes.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
        } catch (err) {
            console.error("Lỗi khi tải loại giường:", err);
        }
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

    const handleBedSelect = (bed) => {
        setSelectedBed(bed);
        setBedDetails(bed);
    };

    const handleAddNew = () => {
        setBedDetails({
            bedCode: "",
            bedName: "",
            bedTypeId: null,
            bedRoomId: null,
            maxCapacity: "",
            isBedStretcher: "0", // Giá trị mặc định là "Không"
        });
    };

    const handleCreate = async (bedDetails) => {
        const bedData = {
            bed_code: bedDetails.bedCode,
            bed_name: bedDetails.bedName,
            bed_type_id: Number(bedDetails.bedTypeId),
            bed_room_id: Number(bedDetails.bedRoomId),
            max_capacity: Number(bedDetails.maxCapacity),
            is_bed_stretcher: (bedDetails.isBedStretcher),
        };
        try {
            await bedService.create(bedData); // Gọi API xóa
            addAlert("Thêm mới thành công!", "success");
            fetchData(); // Load lại danh sách sau khi xóa
        } catch (err) {
            console.error("Lỗi khi thêm mới bản ghi:", err);
            addAlert("Lỗi khi thêm mới bản ghi!", "error");
        }
    };

    const handleUpdate = async (bedDetails) => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn cập nhật bản ghi ?`);
        if (!confirm) return;
        const bedData = {
            bed_code: bedDetails.bedCode,
            bed_name: bedDetails.bedName,
            bed_type_id: Number(bedDetails.bedTypeId),
            bed_room_id: Number(bedDetails.bedRoomId),
            max_capacity: Number(bedDetails.maxCapacity),
            is_bed_stretcher: Number(bedDetails.isBedStretcher),
            is_active: Number(bedDetails.isActive),
        };
        try {
            await bedService.update(bedDetails.id, bedData); // Gọi API xóa
            addAlert("Cập nhật bản ghi thành công!", "success");
            fetchData(); // Load lại danh sách sau khi xóa
        } catch (err) {
            console.error("Lỗi khi cập nhật bản ghi:", err);
            addAlert("Lỗi khi cập nhật bản ghi!", "error");
        }
    };

    const handleDelete = async (bedId, bedName) => {
        try {
            await bedService.deleteBed(bedId); // Gọi API xóa
            addAlert("Xóa bản ghi thành công!", "success");
            fetchData(); // Load lại danh sách sau khi xóa
        } catch (err) {
            console.error("Lỗi khi xóa bản ghi:", err);
            addAlert("Lỗi khi xóa bản ghi!", "error");
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchBedRooms();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [bedRoomKeyword]); // Gọi lại khi có thay đổi

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchBedTypes();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [bedTypeKeyword]); // Gọi lại khi có thay đổi

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [page, limit, orderBy, orderDirection, keyword]); // Gọi lại khi có thay đổi

    return {
        format,
        data,
        loading,
        error,
        page,
        limit,
        totalItems,
        keyword,
        orderBy,
        orderDirection,
        selectedBed,
        bedDetails,
        bedRooms,
        bedTypes,
        totalPages,
        isModalConfirmDeleteOpen,
        bedToDelete,
        alerts,
        confirmDelete,
        setPage,
        setLimit,
        setKeyword,
        setOrderBy,
        setOrderDirection,
        setSelectedBed,
        setBedDetails,
        setBedRoomKeyword,
        setBedTypeKeyword,
        setBedTypes,
        setBedRooms,
        setBedToDelete,
        setAlerts,
        closeModalConfirmDelete,
        openDeleteModal,
        setIsModalConfirmDeleteOpen,
        convertToDate,
        addAlert,
        removeAlert,
        handleBedSelect,
        handleAddNew,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchData,
        fetchBedRooms,
        fetchBedTypes,

    };
};

export default useBedList;
