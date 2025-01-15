import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTransactionTTDetail from "../../../hooks/data/transactionTTDetail/useTransactionTTDetail";
import TransactionTTDetailTable from "../../../components/data/transactionTTDetail/TransactionTTDetailTable";
import SearchTransactionTTDetailTable from "../../../components/data/transactionTTDetail/SearchTransactionTTDetailTable";
import Filter from "../../../components/data/transactionTTDetail/Filter";
import Card from "../../../components/common/Master/Card";

const Page = ({
    paramBillCode,
    isFullScreen = false,
}) => {
    const {
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
    }
        = useTransactionTTDetail();
    // Nếu có param từ trang khác truyền vào thì xử lý
    useEffect(() => {
        if (paramBillCode) {
            setBillCode(paramBillCode);
            setFilterTrigger(true);
        }
    }, [paramBillCode]);
    return (
        <div className={`grid grid-cols-12 gap-1 ${loadingRecord ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="col-span-12 md:col-span-3 flex flex-col md:mr-1 md:border-r md:pr-2">
                {/* Phần điều khiển và lọc */}
                <Card className="flex-grow">
                    <div className="flex flex-col">
                        <Filter
                            billCode={billCode}
                            setBillCode={setBillCode}
                            setFilterTrigger={setFilterTrigger}
                        />
                    </div>
                </Card>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-col flex-grow mt-4 md:mt-1">
                {/* Phần bảng thông tin dịch vụ */}
                <Card className="flex-grow mt-1">
                    <SearchTransactionTTDetailTable
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <div className="flex flex-col md:flex-row md:space-x-2 border">
                        {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                        <div className={`w-full ${loadingRecord ? "flex" : ""} flex-grow whitespace-pre-line break-words relative overflow-x-auto ${isFullScreen?'h-[85vh]':'h-[70vh]'} overflow-y-auto`}>
                            <TransactionTTDetailTable
                                fieldLabels={fieldLabels}
                                testServiceTypeList={data}
                                searchTerm={searchTerm}
                                expandedGroups={expandedGroups}
                                setExpandedGroups={setExpandedGroups}
                                loadingFetchTestServiceTypeList={loadingRecord}
                                errorFetchTestServiceTypeList={error}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Page;
