import { useState, useEffect } from "react";
import config from "../../../config";
import useMasterList from '../../master/useMasterList';
import transactionTamUngService from "../../../services/transaction/transactionTamUngService";
import treatmentFeeListService from "../../../services/data/treatmentFeeListService";
import accountBookService from "../../../services/data/accountBookService";
import payFormService from "../../../services/category/payFormService";
import cashierRoomService from "../../../services/category/cashierRoomService";

const useHook = () => {
    const isDB = true
    const isElastic = false
    const accountBookIsDB = config.apiService.accountBookVView.typeGetApi === 'db';
    const accountBookIsElastic = config.apiService.accountBookVView.typeGetApi === 'elastic';
    const payFormIsDB = config.apiService.payForm.typeGetApi === 'db';
    const payFormIsElastic = config.apiService.payForm.typeGetApi === 'elastic';
    const cashierRoomIsDB = config.apiService.cashierRoom.typeGetApi === 'db';
    const cashierRoomIsElastic = config.apiService.cashierRoom.typeGetApi === 'elastic';

    const [accountBooks, setAccountBooks] = useState([]);
    const [accountBookKeyword, setAccountBookKeyword] = useState(null);
    const [payForms, setPayForms] = useState([]);
    const [payFormKeyword, setPayFormKeyword] = useState(null);
    const [cashierRooms, setCashierRooms] = useState([]);
    const [cashierRoomKeyword, setCashierRoomKeyword] = useState(null);

    const [treatmentCode, setTreatmentCode] = useState();
    const [loadingTreatment, setLoadingTreatment] = useState(false);
    const [filter, setFilter] = useState({   
        treatmentCode: null,
    });
    const fieldLabels = {
        patientCode: "Mã bệnh nhân",
        patientName: "Tên bệnh nhân",
        address: "Địa chỉ",
        dateOfBirth: "Ngày sinh",
        gender: "Giới tính",
        amount: "Số tiền tạm ứng",
        treatmentCode: "Mã điều trị",
        accountBookId: "Id sổ thu chi",
        accountBookCode: "Mã sổ thu chi",
        accountBookName: "Tên sổ thu chi",
        payFormId: "Id hình thức thanh toán",
        payFormCode: "Mã hình thức thanh toán",
        payFormName: "Tên hình thức thanh toán",
        cashierRoomId: "Id phòng thu ngân",
        cashierRoomCode: "Mã phòng thu ngân",
        cashierRoomName: "Tên phòng thu ngân",
        description: "Lý do tạm ứng",
        transferAmount: "Số tiền chuyển khoản",
        swipeAmount: "Số tiền quẹt thẻ",
    };
    const fieldConfig = {
        amount: {
            errorMessageGT0: `${fieldLabels.amount} phải lớn hơn bằng 0!`,
            errorMessageRequired: `${fieldLabels.amount} không được bỏ trống!`,
        },
        treatmentId: {
            errorMessageRequired: `Chưa chọn diện điều trị!`,
        },
        accountBookId: {
            errorMessageRequired: `${fieldLabels.accountBookId} không được bỏ trống!`,
        },
        payFormId: {
            errorMessageRequired: `${fieldLabels.payFormId} không được bỏ trống!`,
        },
        cashierRoomId: {
            errorMessageRequired: `${fieldLabels.cashierRoomId} không được bỏ trống!`,
        },
        description: {
            maxLength: 2000,
            errorMessageMaxLength: `${fieldLabels.description} có số ký tự tối đa là 2000!`,
        },
        swipeAmount: {
            errorMessageGT0: `${fieldLabels.swipeAmount} phải lớn hơn bằng 0!`,
            errorMessageRequired: `${fieldLabels.swipeAmount} không được bỏ trống!`,
            errorMessageLTAmount: `${fieldLabels.swipeAmount} phải bé hơn bằng ${fieldLabels.amount}!`,
        },
        transferAmount: {
            errorMessageGT0: `${fieldLabels.transferAmount} phải lớn hơn bằng 0!`,
            errorMessageRequired: `${fieldLabels.transferAmount} không được bỏ trống!`,
            errorMessageLTAmount: `${fieldLabels.transferAmount} phải bé hơn bằng ${fieldLabels.amount}!`,
        },
    };
    const validateForm = (data, type = 'normal') => {
        let error = {};  // Khởi tạo lỗi là một object 
        if(!data) return
        switch (type) {
            case "normal":
                // Kiểm tra lỗi amount
                if (data.amount === undefined || data.amount === null) {
                    error.amount = error.amount || [];
                    error.amount.push(fieldConfig.amount.errorMessageRequired);  // Thêm lỗi 
                }
                if (data.amount < 0) {
                    error.amount = error.amount || [];
                    error.amount.push(fieldConfig.amount.errorMessageGT0);  // Thêm lỗi 
                }
                // Kiểm tra lỗi cho treatmentId
                if (data.treatmentId === undefined || data.treatmentId === null) {
                    error.treatmentId = error.treatmentId || [];
                    error.treatmentId.push(fieldConfig.treatmentId.errorMessageRequired);  // Thêm lỗi 
                }
                // Kiểm tra lỗi cho accountBookId
                if (data.accountBookId === undefined || data.accountBookId === null) {
                    error.accountBookId = error.accountBookId || [];
                    error.accountBookId.push(fieldConfig.accountBookId.errorMessageRequired);  // Thêm lỗi 
                }
                // Kiểm tra lỗi cho cashierRoomId
                if (data.cashierRoomId === undefined || data.cashierRoomId === null) {
                    error.cashierRoomId = error.cashierRoomId || [];
                    error.cashierRoomId.push(fieldConfig.cashierRoomId.errorMessageRequired);  // Thêm lỗi 
                }
                // Kiểm tra lỗi cho payFormId
                if (data.payFormId === undefined || data.payFormId === null) {
                    error.payFormId = error.payFormId || [];
                    error.payFormId.push(fieldConfig.payFormId.errorMessageRequired);  // Thêm lỗi 
                }
                // Kiểm tra lỗi description
                if (data.description.length > fieldConfig.description.maxLength) {
                    error.description = error.description || [];  // Khởi tạo mảng nếu chưa có
                    error.description.push(fieldConfig.description.errorMessageMaxLength);  // Thêm lỗi 
                }
                // Kiểm tra lỗi swipeAmount
                if(data.payFormCode == '06'){ // Nếu hình thức là  06 tiền mặt/quẹt thẻ
                    if (data.swipeAmount === undefined || data.swipeAmount === null) {
                        error.swipeAmount = error.swipeAmount || [];
                        error.swipeAmount.push(fieldConfig.swipeAmount.errorMessageRequired);  // Thêm lỗi 
                    }
                    if (data.swipeAmount < 0) {
                        error.swipeAmount = error.swipeAmount || [];
                        error.swipeAmount.push(fieldConfig.swipeAmount.errorMessageGT0);  // Thêm lỗi 
                    }
                    if (data.swipeAmount > data.amount) {
                        error.swipeAmount = error.swipeAmount || [];
                        error.swipeAmount.push(fieldConfig.swipeAmount.errorMessageLTAmount);  // Thêm lỗi 
                    }
                }
                // Kiểm tra lỗi transferAmount
                if(data.payFormCode == '03'){ // Nếu hình thức là  03 tiền mặt/ chuyển khoản
                    if (data.transferAmount === undefined || data.transferAmount === null) {
                        error.transferAmount = error.transferAmount || [];
                        error.transferAmount.push(fieldConfig.transferAmount.errorMessageRequired);  // Thêm lỗi 
                    }
                    if (data.transferAmount < 0) {
                        error.transferAmount = error.transferAmount || [];
                        error.transferAmount.push(fieldConfig.swipeAmount.errorMessageGT0);  // Thêm lỗi 
                    }
                    if (data.transferAmount > data.amount) {
                        error.transferAmount = error.transferAmount || [];
                        error.transferAmount.push(fieldConfig.transferAmount.errorMessageLTAmount);  // Thêm lỗi 
                    }
                }
        }
        return error;
    };
    const calculateNewData = (newData, fieldLabel=fieldLabels) => {
        let data
        if(newData){
            data = {
                [fieldLabel.amount] : Number(newData.amount).toLocaleString(),
                [fieldLabel.accountBookCode] : newData.accountBookCode,
                [fieldLabel.accountBookName] : newData.accountBookName,
                [fieldLabel.payFormCode] : newData.payFormCode,
                [fieldLabel.payFormName] : newData.payFormName,
                [fieldLabel.swipeAmount] : Number(newData.swipeAmount).toLocaleString(),
                [fieldLabel.transferAmount] : Number(newData.transferAmount).toLocaleString(),
                [fieldLabel.description] : newData.description,
                [fieldLabel.cashierRoomCode] : newData.cashierRoomCode,
                [fieldLabel.cashierRoomName] : newData.cashierRoomName,
            }
        }
        return data;
    };
    const transformCreateData = (recordDetails) => ({
        treatment_id: Number(recordDetails.treatmentId),
        amount: Number(recordDetails.amount),
        account_book_id: Number(recordDetails.accountBookId),
        pay_form_id: Number(recordDetails.payFormId),
        cashier_room_id: Number(recordDetails.cashierRoomId),
        swipe_amount: Number(recordDetails.swipeAmount),
        transfer_amount: Number(recordDetails.transferAmount),
        description: recordDetails.description,
    });

    const handleCreate = (recordDetails) => {
        handleMasterCreate(recordDetails, transformCreateData);
    };
    // Lấy từ hookMaster qua
    const {
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
        filterTrigger,
        setFilterTrigger,
        recordDetails,
        setRecordDetails,
        selectedRecord,
        setSelectedRecord,
        format,
        convertToDate,
        handleFormSubmit,
        closeModalConfirmCreate,
        confirmCreate,
        isModalConfirmCreateOpen,
        handleMasterCreate,
        removeAlert,
        alerts,
        firstLoadPage, 
        setFirstLoadPage,
        parseNumberToLocalString,
    } = useMasterList(
        null,
        null,
        null,
        null,
        handleCreate,
        null,
        null,
        transactionTamUngService,
        isDB,
        isElastic,
    );
    const fetchTreatment = async () => {
        try {
            setLoadingTreatment(true); // Bắt đầu tải dữ liệu
            let response = null;
            response = await treatmentFeeListService.getCusor(0, 20, filter);
            const dataTreatment = response.data[0]
            setSelectedRecord(dataTreatment)
            // Nếu có data treatment set data nhập và hiện form nhập
            if(dataTreatment){
                setRecordDetails({
                    ...recordDetails,
                    treatmentId: dataTreatment.id,
                })
            }else{
                setRecordDetails(null)
            }
            setLoadingTreatment(false); // Kết thúc tải dữ liệu
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Lỗi khi tải dữ liệu.");
            setLoadingTreatment(false); // Kết thúc tải dữ liệu ngay cả khi lỗi
        }
    };
    // Lấy danh sách sổ thu chi
    const fetchAccountBooks = async () => {
        try {
            const accountBooks = await accountBookService.getAllSelect(accountBookKeyword || null, {isForDeposit : 1});
            if (accountBookIsDB) {
                setAccountBooks(accountBooks.data);
            }
            if (accountBookIsElastic) {
                setAccountBooks(
                    accountBooks.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
        } catch (err) {
            console.error("Lỗi khi tải sổ thu chi:", err);
        }
    };
    // Lấy danh sách hình thức thanh toán
    const fetchPayForms = async () => {
        try {
            const payForms = await payFormService.getAllSelect(payFormKeyword || null);
            if (payFormIsDB) {
                setPayForms(payForms.data);
            }
            if (payFormIsElastic) {
                setPayForms(
                    payForms.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
        } catch (err) {
            console.error("Lỗi khi tải ds hình thức thanh toán:", err);
        }
    };
    // Lấy danh sách phòng thu ngân
    const fetchCashierRooms = async () => {
        try {
            const cashierRooms = await cashierRoomService.getAllSelect(cashierRoomKeyword || null);
            if (cashierRoomIsDB) {
                setCashierRooms(cashierRooms.data);
            }
            if (cashierRoomIsElastic) {
                setCashierRooms(
                    cashierRooms.data.map((item) => ({
                        ...item._source, // Lấy dữ liệu chính
                        highlight: item.highlight || {}, // Lấy highlight nếu có
                    }))
                );
            }
        } catch (err) {
            console.error("Lỗi khi tải ds phòng thu ngân:", err);
        }
    };
    // Đặt các giá trị mặc định khi tải trang lần đầu
    useEffect(() => {
        // Nếu tải trang lần đầu
        if(firstLoadPage){
            setRecordDetails({
                treatmentId: null,
                accountBookId: null,
                payFormId: null,
                cashierRoomId: null,
                amount: 0, // Giá trị mặc định là "Không"
                description: "",
                swipeAmount: 0,
                transferAmount: 0,
            })
            fetchAccountBooks() // Lấy danh sách sổ thu chi
            fetchPayForms() // Lấy danh sách hình thức thanh toán
            fetchCashierRooms() // Lấy danh sách phòng thu ngân
        }
        setFirstLoadPage(false)
    }, [firstLoadPage]); // Gọi lại khi có thay đổi
    useEffect(() => {
        if (filterTrigger) {
            const newFilter = {};
            if (treatmentCode) {
                newFilter.treatmentCode = treatmentCode;
            }
            // Nếu không trống thì set Filter
            if (Object.keys(newFilter).length > 0) {
                setFilter(newFilter);
            }
        }

        setFilterTrigger(false)
    }, [filterTrigger]);

    useEffect(() => {
        // Kiểm tra tất cả các trường trong filter khác null
        const allFieldsNotNull = Object.values(filter).every(value => value !== null);

        if (allFieldsNotNull) {
            fetchTreatment();
        }
    }, [filter]); // Gọi lại khi có thay đổi

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchAccountBooks();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [accountBookKeyword]); // Gọi lại khi có thay đổi
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchPayForms();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [payFormKeyword]); // Gọi lại khi có thay đổi
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchCashierRooms();
        }, 200); // Chờ 200ms trước khi gọi API

        return () => clearTimeout(delayDebounce); // Xóa timeout nếu dependency thay đổi
    }, [cashierRoomKeyword]); // Gọi lại khi có thay đổi
    return {
        reload,
        setReload,
        loadingRecord,
        setLoadingRecord,
        loading,
        setLoading,
        loadingTreatment,
        setLoadingTreatment,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        treatmentCode, 
        setTreatmentCode,
        filterTrigger,
        setFilterTrigger,
        fieldLabels,
        recordDetails,
        setRecordDetails,
        format,
        convertToDate,
        selectedRecord,
        setSelectedRecord,
        validateForm,
        accountBooks,
        setAccountBookKeyword,
        payForms,
        setPayFormKeyword,
        cashierRooms,
        setCashierRoomKeyword,
        handleFormSubmit,
        closeModalConfirmCreate,
        confirmCreate,
        isModalConfirmCreateOpen,
        calculateNewData,
        removeAlert,
        alerts,
        parseNumberToLocalString,
    };
};

export default useHook;
