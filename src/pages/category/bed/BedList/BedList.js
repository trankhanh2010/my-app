import React from "react";

import TotalPages from "../../../../components/common/Paginate/TotalPages";
import RecordPerPage from "../../../../components/common/Paginate/RecordPerPage";
import PrevPage from "../../../../components/common/Paginate/PrevPage";
import NextPage from "../../../../components/common/Paginate/NextPage";

import Search from "../../../../components/common/Filter/Search";
import OrderBy from "../../../../components/common/Filter/OrderBy";
import OrderDirection from "../../../../components/common/Filter/OrderDirection";
import TotalRecord from "../../../../components/common/Filter/TotalRecord";

import ButtonAddNew from "../../../../components/common/Button/ButtonAddNew";

import Alert from "../../../../components/common/Alert/Alert";

import useBedList from "../../../../hooks/category/bed/useBedList";
import BedTable from "../../../../components/category/bed/BedList/BedTable";
import BedDetails from "../../../../components/category/bed/BedList/BedDetails";

const BedList = () => {
    const {
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
        fetchBedRooms,
        fetchBedTypes,

    } = useBedList();

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`flex flex-wrap gap-8 w-full p-4 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="w-full md:w-8/12">
                <div className="mb-4 flex flex-wrap gap-4">
                    <TotalPages
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                    <RecordPerPage
                        limit={limit}
                        setLimit={setLimit}
                        options={[
                            { value: 10, label: "10" },
                            { value: 20, label: "20" },
                            { value: 50, label: "50" },
                        ]}
                    />
                    <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                    <OrderBy
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                    />
                    <OrderDirection
                        orderDirection={orderDirection}
                        setOrderDirection={setOrderDirection}
                    />
                    <ButtonAddNew
                        handleAddNew={handleAddNew}
                    />
                </div>
                <div className="mt-4 flex justify-between mb-4">
                    <PrevPage
                        page={page}
                        setPage={setPage}
                    />
                    <TotalRecord
                        totalItems={totalItems}
                    />
                    <NextPage
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
                <BedTable
                    fieldLabels={fieldLabels}
                    format={format}
                    data={data}
                    convertToDate={convertToDate}
                    handleRecordSelect={handleRecordSelect}
                    selectedRecord={selectedRecord}
                    recordDetails={recordDetails}
                    setRecordDetails={setRecordDetails}
                    recordToDelete={recordToDelete}
                    closeModalConfirmDelete={closeModalConfirmDelete}
                    confirmDelete={confirmDelete}
                    isModalConfirmDeleteOpen={isModalConfirmDeleteOpen}
                    openDeleteModal={openDeleteModal}
                    openUpdateModal={openUpdateModal}
                    isModalConfirmUpdateOpen={isModalConfirmUpdateOpen}
                    confirmUpdate={confirmUpdate}
                    closeModalConfirmUpdate={closeModalConfirmUpdate}
                    calculateChanges={calculateChanges}
                    recordToUpdate={recordToUpdate}
                />
            </div>

            <div className="w-full md:w-3/12 border-l border-gray-300 pl-4 mt-4 md:mt-0 flex-grow">
                <BedDetails
                    fieldLabels={fieldLabels}
                    recordDetails={recordDetails}
                    setRecordDetails={setRecordDetails}
                    bedTypes={bedTypes}
                    bedRooms={bedRooms}
                    setBedRoomKeyword={setBedRoomKeyword}
                    setBedTypeKeyword={setBedTypeKeyword}
                    handleCreate={handleCreate}
                    openUpdateModal={openUpdateModal}
                    validateForm={validateForm}
                />
            </div>


            <div className="fixed top-8 right-4 space-y-4">
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        message={alert.message}
                        type={alert.type}
                        onClose={() => removeAlert(alert.id)}
                    />
                ))}
            </div>

        </div>
    );
};

export default BedList;
