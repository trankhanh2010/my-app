import React, { useRef, useEffect, useState } from "react";
import Loading from "../../common/Info/Loading";
import GroupFieldSpanWithText from "../../common/Data/InfoRecord/GroupFieldSpanWithText";

const TestServiceReqListTable = ({
    fieldLabels,
    format,
    data,
    convertToDate,
    handleRecordSelect,
    selectedRecord,
    setTreatmentId,
    loading,
    setReload,
}) => {
    if (loading) return <Loading />
    const getTextColor = (record) => {
        return "text-gray-500"; // Màu mặc định
    };
    return (
        <>
            <GroupFieldSpanWithText
                fields={[
                    { fieldName: "Mã yêu cầu tạm ứng", fieldValue: data.depositReqCode, divCss: `md:w-[50%] md:border-r`, pCss: `font-semibold` },
                    { fieldName: 'Mã bệnh nhân', fieldValue: data.tdlPatientCode, divCss: `md:w-[50%] md:border-r`, pCss: `font-semibold` },
                    { fieldName: 'Mã điều trị', fieldValue: data.treatmentCode, divCss: `md:w-[50%]`, pCss: `font-semibold` },

                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: fieldLabels.tdlPatientName, fieldValue: data.tdlPatientName, divCss: `md:w-[50%] md:border-r` },
                    { fieldName: fieldLabels.room, fieldValue: data.roomCode + ' - ' + data.roomName, divCss: `md:w-[50%] md:border-r` },
                    { fieldName: fieldLabels.department, fieldValue: data.departmentCode + ' - ' + data.departmentName, divCss: `md:w-[50%]` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: "Ngày sinh bệnh nhân", fieldValue: format(convertToDate(data.tdlPatientDob), "dd/MM/yyyy"), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: "Thời gian tạo", fieldValue: format(convertToDate(data.createTime), "dd/MM/yyyy"), divCss: `md:w-[50%] md:border-r` },
                    { fieldName: "Người tạo", fieldValue: data.creator, divCss: `md:w-[50%]` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Mô tả', fieldValue: data.description, divCss: `md:w-[100%]`, pCss: `` },
                ]}
            />
            <GroupFieldSpanWithText
                css='mt-1'
                fields={[
                    { fieldName: 'Số tiền yêu cầu tạm ứng', fieldValue: Number(data.amount).toLocaleString(), divCss: `md:w-[100%]`, pCss: `text-red-500 font-semibold` },
                ]}
            />
            {data && Number(data.amount) > 0
                && (
                    <button
                        className="py-2 px-4 rounded bg-pink-500 hover:bg-pink-600 mt-1 mb-1 text-white"
                        // onClick={() => setOpentShowAllPayment(true)}
                    >
                        Thanh toán 
                    </button>
                )}
        </>
    );
};

export default TestServiceReqListTable;
