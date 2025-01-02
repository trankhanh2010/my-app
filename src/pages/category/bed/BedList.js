import React from "react";
import ManegerAlert from "../../../components/common/Alert/ManegerAlert";
import useBedList from "../../../hooks/category/bed/useBedList";
import BedTable from "../../../components/category/bed/BedTable";
import BedDetails from "../../../components/category/bed/BedDetails";
import Filter from "../../../components/category/bed/Filter";
import Card from "../../../components/common/Master/Card";

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
        setReload,
        loadingRecord,
        handleReload,
        handleBlur,
        handleFormSubmit,

    } = useBedList();


    return (
        <div className={`grid grid-cols-12 gap-1 w-full p-1 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="col-span-12 md:col-span-8 flex flex-col md:mr-1 md:border-r md:pr-2">
                <Card>
                    <div class="min-h-[20vh]">
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
                <Card>
                    <div class="mt-1 relative md:overflow-x-auto overflow-y-auto min-h-[70vh] md:max-h-[70vh] flex flex-row">
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
                            loading={loading}
                            error={error}
                            isProcessing={isProcessing}
                            setReload={setReload}
                        />
                    </div>
                </Card>
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col flex-grow mt-4 md:mt-0">
                {/*Nếu đang load thì đặt là flex để load nằm ở giữa */}
                <Card className={`${loadingRecord || isProcessing ? "flex" : ""} flex-grow`}>
                    <div class="flex-grow relative overflow-x-auto max-h-[100vh] flex flex-col">
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
                        />
                    </div>
                </Card>
            </div>

            <ManegerAlert
                alerts={alerts}
                removeAlert={removeAlert}
            />


        </div>
    );
};

export default BedList;
