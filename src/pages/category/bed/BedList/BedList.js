import React from "react";
import TotalPages from "../../../../components/common/Paginate/TotalPages";
import RecordPerPage from "../../../../components/common/Paginate/RecordPerPage";
import PrevPage from "../../../../components/common/Paginate/PrevPage";
import NextPage from "../../../../components/common/Paginate/NextPage";

import Search from "../../../../components/common/Filter/Search";
import OrderBy from "../../../../components/common/Filter/OrderBy";
import OrderDirection from "../../../../components/common/Filter/OrderDirection";
import TotalRecord from "../../../../components/common/Filter/TotalRecord";

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
        convertToDate,
        handleBedSelect,
        handleAddNew,
        handleCreate,
        handleDelete,
        handleUpdate,
        fetchData,
        fetchBedRooms,
        fetchBedTypes,
        
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
                    <button
                        onClick={handleAddNew}
                        className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                        Thêm mới
                    </button>
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
                    handleDelete = {handleDelete}
                    selectedBed = {selectedBed}
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
        </div>
    );
};

export default BedList;
