import React from "react";

import TotalPages from "../../../components/common/Paginate/TotalPages";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import Search from "../../../components/common/Filter/Search";
import OrderBy from "../../../components/common/Filter/OrderBy";
import OrderDirection from "../../../components/common/Filter/OrderDirection";
import ButtonAddNew from "../../../components/common/Button/ButtonAddNew";
import ButtonReload from "../../../components/common/Button/ButtonReload";
import PrevPage from "../../../components/common/Paginate/PrevPage";
import NextPage from "../../../components/common/Paginate/NextPage";
import TotalRecord from "../../../components/common/Filter/TotalRecord";
import CardElement from "../../common/Master/CardElement";

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
    handleReload,
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
            <CardElement>
                <div className="flex flex-col md:flex-row md:space-x-2 border p-2">
                    <div className="w-full flex flex-col md:w-[1/4]">
                        {/* Chọn số bản ghi trên mỗi trang */}
                        <RecordPerPage
                            limit={limit}
                            setLimit={setLimit}
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
                    <div className="mt-1 w-full flex flex-col md:w-[1/4]">
                        <ButtonReload
                            handleReload={handleReload}
                        />
                    </div>
                </div>
            </CardElement>
            <CardElement>
                <div className="mt-1 flex flex-col md:flex-row md:space-x-2 border p-2">
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
            </CardElement>
            <CardElement>
                <div className="mt-1 flex flex-col md:flex-row md:space-x-2 border p-2">
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
            </CardElement>
        </>
    );
};

export default Filter;
