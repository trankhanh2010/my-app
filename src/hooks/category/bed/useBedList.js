import { useState, useEffect } from "react";
import config from "../../../config";
import useMasterList from '../../master/useMasterList';
import bedService from "../../../services/category/bedService";
import bedRoomService from "../../../services/category/bedRoomService";
import bedTypeService from "../../../services/category/bedTypeService";

const useBedList = () => {
    const isDB = config.apiService.bed.typeGetApi === 'db';
    const isElastic = config.apiService.bed.typeGetApi === 'elastic';
    const bedRoomIsDB = config.apiService.bedRoom.typeGetApi === 'db';
    const bedRoomIsElastic = config.apiService.bedRoom.typeGetApi === 'elastic';
    const bedTypeIsDB = config.apiService.bed.typeGetApi === 'db';
    const bedTypeIsElastic = config.apiService.bed.typeGetApi === 'elastic';

    const [bedRooms, setBedRooms] = useState([]);
    const [bedRoomKeyword, setBedRoomKeyword] = useState(null);

    const [bedTypes, setBedTypes] = useState([]);
    const [bedTypeKeyword, setBedTypeKeyword] = useState(null);

    const fieldLabels = {
        id: "Id",
        createTime: "Ngày tạo",
        modifyTime: "Ngày cập nhật",
        creator: "Người tạo",
        modifier: "Người cập nhật",
        appCreator: "Phần mềm tạo",
        appModifier: "Phần mềm cập nhật",
        isActive: "Trạng thái",
        isDelete: "Xóa",
        bedCode: "Mã giường",
        bedName: "Tên giường",
        bedRoomId: "Id buồng bệnh",
        bedTypeId: "Id loại giường",
        maxCapacity: "Số lượng nằm ghép tối đa",
        x: "x",
        y: "y",
        treatmentRoomId: "Id phòng",
        isBedStretcher: "Giường cáng",
        bedTypeName: "Tên loại giường",
        bedTypeCode: "Mã loại giường",
        bedRoomName: "Tên phòng",
        bedRoomCode: "Mã phòng",
        departmentName: "Tên khoa",
        departmentCode: "Mã khoa"
    };

    const fieldConfig = {
        bedCode: {
            maxLength: 10,
            errorMessageMaxLength: `${fieldLabels.bedCode} có số ký tự tối đa là 10!`,
            errorMessageRequired: `${fieldLabels.bedCode} không được bỏ trống!`,
        },
        bedName: {
            maxLength: 200,
            errorMessageMaxLength: `${fieldLabels.bedName} có số ký tự tối đa là 200!`,
            errorMessageRequired: `${fieldLabels.bedName} không được bỏ trống!`,
        },
        bedTypeId: {
            errorMessageRequired: `${fieldLabels.bedTypeId} không được bỏ trống!`,
        },
        bedRoomId: {
            errorMessageRequired: `${fieldLabels.bedRoomId} không được bỏ trống!`,
        },
        maxCapacity: {
            errorMessageGT0: `${fieldLabels.maxCapacity} phải lớn hơn bằng 0!`,
            errorMessageIsBedStretcher: `${fieldLabels.maxCapacity} phải bằng 1 nếu là giường cáng!`,
        },
    };

    const validateForm = (data, type = 'normal') => {
        let error = {};  // Khởi tạo lỗi là một object 
        switch (type) {
            case "normal":
                // Kiểm tra lỗi cho bedCode
                if (data.bedCode.trim() === "") {
                    error.bedCode = error.bedCode || [];  // Khởi tạo mảng nếu chưa có
                    error.bedCode.push(fieldConfig.bedCode.errorMessageRequired);  // Thêm lỗi 
                }
                if (data.bedCode.length > fieldConfig.bedCode.maxLength) {
                    error.bedCode = error.bedCode || [];  // Khởi tạo mảng nếu chưa có
                    error.bedCode.push(fieldConfig.bedCode.errorMessageMaxLength);  // Thêm lỗi 
                }

                // Kiểm tra lỗi cho bedName
                if (data.bedName.trim() === "") {
                    error.bedName = error.bedName || [];
                    error.bedName.push(fieldConfig.bedName.errorMessageRequired);  // Thêm lỗi 
                }
                if (data.bedName.length > fieldConfig.bedName.maxLength) {
                    error.bedName = error.bedName || [];
                    error.bedName.push(fieldConfig.bedName.errorMessageMaxLength);  // Thêm lỗi 
                }

                // Kiểm tra lỗi cho bedTypeId
                if (data.bedTypeId === undefined || data.bedTypeId === null) {
                    error.bedTypeId = error.bedTypeId || [];
                    error.bedTypeId.push(fieldConfig.bedTypeId.errorMessageRequired);  // Thêm lỗi 
                }

                // Kiểm tra lỗi cho bedRoomId
                if (data.bedRoomId === undefined || data.bedRoomId === null) {
                    error.bedRoomId = error.bedRoomId || [];
                    error.bedRoomId.push(fieldConfig.bedRoomId.errorMessageRequired);  // Thêm lỗi 
                }

                // Kiểm tra lỗi cho maxCapacity
                if (data.maxCapacity < 0) {
                    error.maxCapacity = error.maxCapacity || [];
                    error.maxCapacity.push(fieldConfig.maxCapacity.errorMessageGT0);  // Thêm lỗi 
                }
                if (data.maxCapacity != 1 && data.isBedStretcher == 1) {
                    error.maxCapacity = error.maxCapacity || [];
                    error.maxCapacity.push(fieldConfig.maxCapacity.errorMessageIsBedStretcher);  // Thêm lỗi 
                }
        }

        return error;
    };

    const fieldsToSkipList = [
        'treatmentRoomId',
        'bedTypeId',
        'bedRoomId'
    ]; // Danh sách các trường cần bỏ qua

    const handleRecordSelect = (record) => {
        setSelectedRecord(record);
        setRecordDetails(record);
    };

    const handleAddNew = () => {
        setRecordDetails({
            bedCode: "",
            bedName: "",
            bedTypeId: null,
            bedRoomId: null,
            maxCapacity: "",
            isBedStretcher: "0", // Giá trị mặc định là "Không"
        });
    };

    const handleCreate = async (recordDetails) => {
        setIsProcessing(true);
        const bedData = {
            bed_code: recordDetails.bedCode,
            bed_name: recordDetails.bedName,
            bed_type_id: Number(recordDetails.bedTypeId),
            bed_room_id: Number(recordDetails.bedRoomId),
            max_capacity: Number(recordDetails.maxCapacity),
            is_bed_stretcher: (recordDetails.isBedStretcher),
        };
        try {
            await bedService.create(bedData); // Gọi API xóa
            addAlert("Thêm mới thành công!", "success");
            fetchData(); // Load lại danh sách sau khi xóa
        } catch (err) {
            console.error("Lỗi khi thêm mới bản ghi:", err);
            addAlert("Lỗi khi thêm mới bản ghi!", "error");
        }
        setIsProcessing(false);
    };

    const handleUpdate = async (recordDetails) => {
        setIsProcessing(true);
        const bedData = {
            bed_code: recordDetails.bedCode,
            bed_name: recordDetails.bedName,
            bed_type_id: Number(recordDetails.bedTypeId),
            bed_room_id: Number(recordDetails.bedRoomId),
            max_capacity: Number(recordDetails.maxCapacity),
            is_bed_stretcher: Number(recordDetails.isBedStretcher),
            is_active: Number(recordDetails.isActive),
        };
        try {
            await bedService.update(recordDetails.id, bedData); // Gọi API xóa
            addAlert("Cập nhật bản ghi thành công!", "success");
            fetchData(); // Load lại danh sách sau khi cập nhật
        } catch (err) {
            console.error("Lỗi khi cập nhật bản ghi:", err);
            addAlert("Lỗi khi cập nhật bản ghi!", "error");
        }
        setIsProcessing(false);
    };

    const handleDelete = async (bedId, bedName) => {
        setIsProcessing(true);
        try {
            await bedService.deleteRecord(bedId); // Gọi API xóa
            addAlert("Xóa bản ghi thành công!", "success");
            fetchData(); // Load lại danh sách sau khi xóa
            handleRecordSelect(null)
        } catch (err) {
            console.error("Lỗi khi xóa bản ghi:", err);
            addAlert("Lỗi khi xóa bản ghi!", "error");
        }
        setIsProcessing(false);
    };

    // Lấy từ hookMaster qua
    const {
        format,
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

    } = useMasterList(
        fieldLabels,
        fieldsToSkipList,
        handleRecordSelect,
        handleAddNew,
        handleCreate,
        handleUpdate,
        handleDelete,
        bedService,
        isDB,
        isElastic,
        fieldLabels.bedCode,
    );

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

    useEffect(() => {
        if (data && selectedRecord) {
            const updatedBed = data.find((bed) => bed.id == selectedRecord.id);
            if (updatedBed) {
                handleRecordSelect(updatedBed); // Cập nhật lại selectedRecord
            }
        }
    }, [data]); // Chạy lại mỗi khi 'data' thay đổi

    return {
        fieldLabels,
        fieldConfig,
        format,
        validateForm,
        data,
        loading,
        isProcessing,
        error,
        page,
        limit,
        totalItems,
        keyword,
        orderBy,
        orderDirection,
        selectedRecord,
        recordDetails,
        bedRooms,
        bedTypes,
        totalPages,
        isModalConfirmDeleteOpen,
        isModalConfirmUpdateOpen,
        recordToDelete,
        recordToUpdate,
        alerts,
        changes,
        errorUniqueCode,
        setErrorUniqueCode,
        calculateChanges,
        confirmDelete,
        confirmUpdate,
        setPage,
        setLimit,
        setKeyword,
        setOrderBy,
        setOrderDirection,
        setSelectedRecord,
        setRecordDetails,
        setBedRoomKeyword,
        setBedTypeKeyword,
        setBedTypes,
        setBedRooms,
        setRecordToDelete,
        setRecordToUpdate,
        setAlerts,
        setChanges,
        closeModalConfirmDelete,
        openDeleteModal,
        closeModalConfirmUpdate,
        openUpdateModal,
        setIsModalConfirmDeleteOpen,
        setIsModalConfirmUpdateOpen,
        convertToDate,
        addAlert,
        removeAlert,
        handleRecordSelect,
        handleAddNew,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchData,
        checkUniqueCode,
        fetchBedRooms,
        fetchBedTypes,

    };
};

export default useBedList;
