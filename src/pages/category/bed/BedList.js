import React from "react";
import ManegerAlert from "../../../components/common/Alert/ManegerAlert";
import useBedList from "../../../hooks/category/bed/useBedList";
import BedTable from "../../../components/category/bed/BedTable";
import BedDetails from "../../../components/category/bed/BedDetails";
import Filter from "../../../components/category/bed/Filter";
import Card from "../../../components/common/Master/Card";
import ModalConfirmDelete from "../../../components/common/Modal/Normal/ModalConfirmDelete";
import ModalConfirmUpdate from "../../../components/common/Modal/Normal/ModalConfirmUpdate";
import ModalConfirmCreate from "../../../components/common/Modal/Normal/ModalConfirmCreate";
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
        loadingBedRoom,
        loadingBedType,

    } = useBedList();


    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-2 gap-2 mt-2 w-full`}>
                <Card className={`${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} md:col-span-9`}>
                    <div className={`min-h-[20vh] ${isProcessing ? 'pointer-events-none' : ''}`}>
                        <Filter
                            page={page}
                            limit={limit}
                            totalItems={totalItems}
                            keyword={keyword}
                            orderBy={orderBy}
                            orderDirection={orderDirection}
                            totalPages={totalPages}
                            setPage={setPage}
                            setLimit={setLimit}
                            setKeyword={setKeyword}
                            setOrderBy={setOrderBy}
                            setOrderDirection={setOrderDirection}
                            handleAddNew={handleAddNew}
                            handleReload={handleReload}
                        />
                    </div>
                </Card>
                <Card className="md:col-span-9 md:order-2">
                    <div className="mt-1 relative md:overflow-x-auto overflow-y-auto h-[70vh] flex flex-row border">
                        <BedTable
                            fieldLabels={fieldLabels}
                            format={format}
                            data={data}
                            convertToDate={convertToDate}
                            handleRecordSelect={handleRecordSelect}
                            selectedRecord={selectedRecord}
                            setRecordDetails={setRecordDetails}
                            openDeleteModal={openDeleteModal}
                            openUpdateModal={openUpdateModal}
                            loading={loading}
                            error={error}
                            isProcessing={isProcessing}
                            setReload={setReload}
                        />
                    </div>
                </Card>

                {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                <Card className={`${loadingRecord || isProcessing ? "flex" : ""} md:col-span-3 md:row-span-2 md:order-1`}>
                    <div className="flex-grow relative overflow-x-auto max-h-[100vh] flex flex-col">
                        <BedDetails
                            fieldLabels={fieldLabels}
                            recordDetails={recordDetails}
                            setRecordDetails={setRecordDetails}
                            bedTypes={bedTypes}
                            bedRooms={bedRooms}
                            setBedRoomKeyword={setBedRoomKeyword}
                            setBedTypeKeyword={setBedTypeKeyword}
                            validateForm={validateForm}
                            errorUniqueCode={errorUniqueCode}
                            isProcessing={isProcessing}
                            loadingRecord={loadingRecord}
                            handleBlur={handleBlur}
                            handleFormSubmit={handleFormSubmit}
                            loadingBedRoom={loadingBedRoom}
                            loadingBedType={loadingBedType}
                        />
                    </div>
                </Card>
            {/* Thông báo */}
            <ManegerAlert
                alerts={alerts}
                removeAlert={removeAlert}
            />
            {/* Modal xác nhận xóa */}
            <ModalConfirmDelete
                isOpen={isModalConfirmDeleteOpen}
                onConfirm={confirmDelete}  // Gọi confirmDelete nếu xác nhận
                onCancel={closeModalConfirmDelete}  // Đóng modal nếu không xác nhận
                message={`${recordToDelete?.bedName} (${recordToDelete?.bedCode})`} // Truyền tên giường vào modal
            />
            {/* Modal xác nhận cập nhật */}
            <ModalConfirmUpdate
                isOpen={isModalConfirmUpdateOpen}
                onConfirm={confirmUpdate}  // Gọi confirmUpdate nếu xác nhận
                onCancel={closeModalConfirmUpdate}  // Đóng modal nếu không xác nhận
                message={`${selectedRecord?.bedName} (${selectedRecord?.bedCode})`} // Truyền tên giường vào modal
                changes={calculateChanges(selectedRecord, recordToUpdate ?? recordDetails)}
            />
            {/* Modal xác nhận tạo mới */}
            <ModalConfirmCreate
                fields={calculateNewData(recordDetails)}
                isOpen={isModalConfirmCreateOpen}
                onConfirm={confirmCreate}  // Gọi confirmCreate nếu xác nhận
                onCancel={closeModalConfirmCreate}  // Đóng modal nếu không xác nhận
            />

        </div>
    );
};

export default BedList;
