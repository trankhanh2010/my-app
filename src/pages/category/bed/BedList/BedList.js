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

import AlertSucces from "../../../../components/common/Alert/AlertSucces";
import AlertError from "../../../../components/common/Alert/AlertError";

import useBedList from "../../../../hooks/bed/useBedList";
import BedTable from "../../../../components/category/bed/BedList/BedTable";
import BedDetails from "../../../../components/category/bed/BedList/BedDetails";

const BedList = () => {
    const {
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
        alertSucces,
        alertError,
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
        closeModalConfirmDelete,
        openDeleteModal,
        setIsModalConfirmDeleteOpen,
        convertToDate,
        handleBedSelect,
        handleAddNew,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchData,
        fetchBedRooms,
        fetchBedTypes,
        setAlertSucces,
        setAlertError,
        
    } = useBedList();

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap gap-8 w-full p-4">
            <div className="w-full md:w-8/12">
                <div className="mb-4 flex flex-wrap gap-4">
                    <TotalPages
                        page = {page}
                        totalPages = {totalPages}
                        setPage = {setPage}
                    />
                    <RecordPerPage
                        limit = {limit}
                        setLimit = {setLimit}
                        options = {[
                            { value: 10, label: "10" },
                            { value: 20, label: "20" },
                            { value: 50, label: "50" },
                        ]}
                    />
                    <Search
                        keyword={keyword}
                        setKeyword = {setKeyword}
                    />
                    <OrderBy
                        orderBy={orderBy}
                        setOrderBy = {setOrderBy}
                    />
                    <OrderDirection
                        orderDirection = {orderDirection}
                        setOrderDirection = {setOrderDirection}
                    />
                    <ButtonAddNew
                        handleAddNew = {handleAddNew}
                    />
                </div>
                <div className="mt-4 flex justify-between mb-4">
                    <PrevPage   
                        page = {page}
                        setPage = {setPage}
                    />
                    <TotalRecord
                        totalItems = {totalItems}
                    />
                    <NextPage   
                        page = {page}
                        setPage = {setPage}
                        totalPages = {totalPages}
                    />
                </div>
                <BedTable
                    format = {format}
                    data = {data}
                    convertToDate = {convertToDate}
                    handleBedSelect = {handleBedSelect}
                    selectedBed = {selectedBed}
                    bedToDelete = {bedToDelete}
                    closeModalConfirmDelete = {closeModalConfirmDelete}
                    confirmDelete = {confirmDelete}
                    isModalConfirmDeleteOpen = {isModalConfirmDeleteOpen}
                    openDeleteModal = {openDeleteModal}
                />
            </div>

            <div className="w-full md:w-auto border-l border-gray-300 pl-4 mt-4 md:mt-0 flex-grow">
                <BedDetails
                    bedDetails = {bedDetails}
                    setBedDetails = {setBedDetails}
                    bedTypes = {bedTypes}
                    bedRooms = {bedRooms}
                    setBedRoomKeyword = {setBedRoomKeyword}
                    setBedTypeKeyword = {setBedTypeKeyword}
                    handleCreate = {handleCreate}
                    handleUpdate = {handleUpdate}
                />
            </div>


            {alertSucces.message && (
                <AlertSucces
                    message={alertSucces.message}
                    onClose={() => setAlertSucces({ message: "", type: "" })}
                />
            )}
            {alertError.message && (
                <AlertError
                    message={alertError.message}
                    onClose={() => setAlertError({ message: "", type: "" })}
                />
            )}
        </div>
    );
};

export default BedList;
