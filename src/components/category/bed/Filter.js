import React from "react";

import TotalPages from "../../../components/common/Paginate/TotalPages";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import Search from "../../../components/common/Filter/Search";
import OrderBy from "../../../components/common/Filter/OrderBy";
import OrderDirection from "../../../components/common/Filter/OrderDirection";
import ButtonAddNew from "../../../components/common/Button/ButtonAddNew";
import PrevPage from "../../../components/common/Paginate/PrevPage";
import NextPage from "../../../components/common/Paginate/NextPage";
import TotalRecord from "../../../components/common/Filter/TotalRecord";

const Filter = ({
    page,
    limit,
    totalItems,
    keyword,
    orderBy,
    orderDirection,
    totalPages,
    setPage,
    setLimit,
    setKeyword,
    setOrderBy,
    setOrderDirection,
    handleAddNew,
}) => {
    // Các trường để lọc
    const options = [
        { value: "bedCode", label: "Mã giường" },
        { value: "bedName", label: "Tên giường" },
        { value: "createTime", label: "Ngày tạo" },
        { value: "modifyTime", label: "Ngày sửa" },
    ];
    return (
        <>
            <div className="flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[2/4]">
                    {/* Chọn số bản ghi trên mỗi trang */}
                    <RecordPerPage
                        limit={limit}
                        setLimit={setLimit}
                        options={[
                            { value: 10, label: "10" },
                            { value: 20, label: "20" },
                            { value: 50, label: "50" },
                        ]}
                    />
                </div>
                <div className="mt-1 w-full flex flex-col md:w-[1/4] items-center">
                    <TotalRecord
                        totalItems={totalItems}
                    />
                </div>
                <div className="mt-1 w-full flex flex-col md:w-[1/4]">
                    <ButtonAddNew
                        handleAddNew={handleAddNew}
                    />
                </div>
            </div>
            <div className="mt-1 flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="mt-1 w-full flex flex-col md:w-[50%]">
                    <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                </div>
                <div className="mt-1 w-full flex flex-col md:w-[25%]">
                    <OrderBy
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        options={options}
                    />
                </div>
                <div className="mt-1 w-full flex flex-col md:w-[25%]">
                    <OrderDirection
                        orderDirection={orderDirection}
                        setOrderDirection={setOrderDirection}
                    />
                </div>
            </div>
            <div className="mt-1 flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2">
                <div className="w-full flex flex-col md:w-[1/3]">
                    <PrevPage
                        page={page}
                        setPage={setPage}
                    />
                </div>
                <div className="mt-1 w-full flex flex-col md:w-[1/3]">
                    <TotalPages
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </div>
                <div className="mt-1 w-full flex flex-col md:w-[1/3]">

                    <NextPage
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </>
    );
};

export default Filter;
