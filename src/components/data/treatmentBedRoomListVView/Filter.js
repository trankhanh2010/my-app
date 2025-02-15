import React from "react";
import DatePicker from "react-datepicker";
import RecordPerPage from "../../../components/common/Paginate/RecordPerPage";
import Search from "../../../components/common/Filter/Search";
import SpanFieldName from "../../common/Data/InfoRecord/SpanFieldName";
import CardElement from "../../common/Master/CardElement";
import ReactSelectCustomList from "../../common/Custom/ReactSelect/ReactSelectCustomList"

const Filter = ({
    applyFilter,
    setApplyFilter,
    dataDepartment,
    loadingDepartment,
    errorDepartment,
}) => {

    return (
        <>
            <CardElement>
                <div className="mt-1 flex flex-col  border p-2">
                    <div className="mt-1 w-full flex flex-col ">
                        {/* <ReactSelectCustomList
                            setRecordDetails={setRecordDetails}
                            list={dataDepartment}
                            setListKeyword={setDepartmentKeyword}
                            listFieldName="departmentName"
                            recordFieldName="departmentName"
                            listFieldCode="departmentCode"
                            recordFieldCode="departmentCode"
                            recordFieldId="departmentId"
                            placeholder="Chọn khoa"
                            errors={errorDepartment}
                            createOrUpdate={true}
                            loading={loadingDepartment}
                        /> */}
                        {/* Nút Lọc */}
                        <button
                            onClick={() => {
                                setApplyFilter(true);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        >
                            Lọc
                        </button>
                    </div>
                </div>
            </CardElement>
        </>
    );
};

export default Filter;
