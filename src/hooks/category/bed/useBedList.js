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

    const [loadingListSelect, setLoadingListSelect] = useState(false);

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
        bedType: "Loại giường",
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

    const calculateNewData = (newData, fieldLabel = fieldLabels) => {
        let data
        if (newData) {
            data = {
                [fieldLabel.bedCode]: newData.bedCode,
                [fieldLabel.bedName]: newData.bedName,
                [fieldLabel.bedTypeCode]: newData.bedTypeCode,
                [fieldLabel.bedTypeName]: newData.bedTypeName,
                [fieldLabel.bedRoomCode]: newData.bedRoomCode,
                [fieldLabel.bedRoomName]: newData.bedRoomName,
                [fieldLabel.isBedStretcher]: [newData.isBedStretcher == 1 ? 'Có' : 'Không'],
                [fieldLabel.maxCapacity]: newData.maxCapacity,
            }
        }
        return data;
    };

    const transformCreateData = (recordDetails) => ({
        bed_code: recordDetails.bedCode,
        bed_name: recordDetails.bedName,
        bed_type_id: Number(recordDetails.bedTypeId),
        bed_room_id: Number(recordDetails.bedRoomId),
        max_capacity: Number(recordDetails.maxCapacity),
        is_bed_stretcher: recordDetails.isBedStretcher,
    });

    const handleCreate = (recordDetails) => {
        handleMasterCreate(recordDetails, transformCreateData);
    };

    const transformUpdateData = (recordDetails) => ({
        bed_code: recordDetails.bedCode,
        bed_name: recordDetails.bedName,
        bed_type_id: Number(recordDetails.bedTypeId),
        bed_room_id: Number(recordDetails.bedRoomId),
        max_capacity: Number(recordDetails.maxCapacity),
        is_bed_stretcher: Number(recordDetails.isBedStretcher),
        is_active: Number(recordDetails.isActive),
    });

    const handleUpdate = (recordDetails) => {
        handleMasterUpdate(recordDetails, transformUpdateData);
    };

    const handleDelete = (Id) => {
        handleMasterDelete(Id);
    };

    const handleReload = async () => {
        fetchData()
        handleRecordSelect(null)
    };
    // Lấy từ hookMaster qua
    const {
        format,
        changes,
        setChanges,
        data,
        setData,
        reload,
        setReload,
        loadingRecord,
        setLoadingRecord,
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
        confirmCreate,
        fetchData,
        checkUniqueCode,
        convertToDate,
        handleMasterCreate,
        handleMasterUpdate,
        handleMasterDelete,
        handleBlur,
        handleFormSubmit,
        recordToCreate,
        setRecordToCreate,
        isModalConfirmCreateOpen,
        setIsModalConfirmCreateOpen,
        closeModalConfirmCreate,
        created, setCreated,
        updated, setUpdated,
        deleted, setDeleted,

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
        } finally {
            setIsProcessing(false)
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

    // Tải lại dữ liệu mỗi lần nhấn vào 
    useEffect(() => {
        const fetchAndUpdate = async () => {
            try {
                setLoadingRecord(true);
                // Gọi API để lấy dữ liệu mới
                const response = await bedService.getById(selectedRecord.id);
                const updatedRecord = response.data

                // Cập nhật dữ liệu trong dataCursor
                setData((prevData) =>
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
                setLoadingListSelect(true)
                // Gọi cả hai API song song
                await Promise.all([
                    fetchAndUpdate(), // Lấy dữ liệu mới cho bản ghi được chọn
                    fetchBedRooms(),
                    fetchBedTypes(),
                ]);
                setLoadingListSelect(false) // Kết thúc tải dữ liệu
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Lỗi khi tải dữ liệu")
                setLoadingListSelect(false)
            }
        };
        if (reload) {
            // Cập nhật lại thông tin 
            fetchData();
            setReload(false);
        }
    }, [reload]); // Gọi lại khi có thay đổi

    // Tải lại ds sau khi thêm mới bản ghi
    useEffect(() => {
        if (created) {
            fetchData()
        }
        setCreated(false)
    }, [created]);  
    // Tải lại ds sau khi sửa đổi bản ghi
    useEffect(() => {
        if (updated) {
            fetchData()
        }
        setUpdated(false)
    }, [updated]);  
    // Tải lại ds sau khi xóa bản ghi
    useEffect(() => {
        if (deleted) {
            fetchData()
        }
        setDeleted(false)
    }, [deleted]);  
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
        isModalConfirmCreateOpen,
        recordToDelete,
        recordToUpdate,
        alerts,
        changes,
        errorUniqueCode,
        setErrorUniqueCode,
        calculateChanges,
        confirmDelete,
        confirmUpdate,
        confirmCreate,
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
        closeModalConfirmCreate,
        openUpdateModal,
        setIsModalConfirmDeleteOpen,
        setIsModalConfirmUpdateOpen,
        setIsModalConfirmCreateOpen,
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
        setReload,
        loadingRecord,
        handleReload,
        handleBlur,
        handleFormSubmit,
        calculateNewData,
        loadingListSelect,
    };
};

export default useBedList;
