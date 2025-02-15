import React from "react";
import Loading from "../../common/Info/Loading";
import NoRecord from "../../common/Info/NoRecord";
import Thead from "../../common/Data/TableList/Thead";
import GroupTd from "../../common/Data/TableList/GroupTd";
import AuthOtp from "../../common/Info/AuthOtp";

const TreatmentBedRoomListTable = ({
    fieldLabels,
    format,
    data,
    convertToDate,
    handleRecordSelect,
    selectedRecord,
    setTreatmentId,
    loading,
    calculateAge,
}) => {
    if (loading) return <Loading />
    if (!data) return <NoRecord />
    if (data && data.length == 0) return <NoRecord />

    return (
        <>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.tdlPatientName, css: `w-[5%]` },
                        { fieldName: fieldLabels.tdlPatientCode, css: `w-[10%]` },
                        { fieldName: fieldLabels.treatmentCode, css: `w-[10%]` },
                        { fieldName: 'Tuổi', css: `w-[10%]` },
                        { fieldName: fieldLabels.tdlPatientGenderName, css: `w-[10%]` },
                        { fieldName: fieldLabels.tdlHeinCardNumber, css: `w-[10%]` },
                        { fieldName: "Hạn thẻ", css: `w-[10%]` },
                        { fieldName: fieldLabels.addTime, css: `w-[10%]` },
                        { fieldName: fieldLabels.bedName, css: `w-[10%]` },
                        { fieldName: fieldLabels.inCode, css: `w-[10%]` },
                        { fieldName: fieldLabels.departmentName, css: `w-[10%]` },
                        { fieldName: fieldLabels.patientClassifyName, css: `w-[10%]` },
                        { fieldName: fieldLabels.inTime, css: `w-[10%]` },
                        { fieldName: fieldLabels.tdlPatientPhone, css: `w-[10%]` },

                    ]}
                />
                <tbody className="text-xs">
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.id === record.id ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record);
                            }
                            }
                        >
                            <GroupTd
                                fields={[
                                    { fieldValue: record.tdlPatientName, css: `truncate font-semibold` },
                                    { fieldValue: record.tdlPatientCode, css: `truncate font-semibold` },
                                    { fieldValue: record.treatmentCode, css: `${selectedRecord?.id === record.id ? "bg-blue-100" : "bg-white"} truncate font-semibold` },
                                    { fieldValue: calculateAge(convertToDate(record.tdlPatientDob)), css: `truncate` },
                                    { fieldValue: record.tdlPatientGenderName, css: `truncate` },
                                    { fieldValue: record.tdlHeinCardNumber, css: `truncate` },
                                    {
                                        fieldValue: (record.tdlHeinCardToTime && record.tdlHeinCardFromTime) ? (
                                            format(convertToDate(record.tdlHeinCardFromTime), "dd/MM/yyyy")
                                            + ' - ' +
                                            format(convertToDate(record.tdlHeinCardToTime), "dd/MM/yyyy")
                                        )
                                            : ""
                                        ,
                                        css: `truncate`
                                    },
                                    { fieldValue: format(convertToDate(record.addTime), "dd/MM/yyyy hh:mm:ss"), css: `truncate` },
                                    { fieldValue: record.bedName, css: `truncate` },
                                    { fieldValue: record.inCode, css: `truncate` },
                                    { fieldValue: record.departmentName, css: `truncate` },
                                    { fieldValue: record.patientClassifyName, css: `truncate` },
                                    { fieldValue: format(convertToDate(record.inTime), "dd/MM/yyyy hh:mm:ss"), css: `truncate` },
                                    { fieldValue: record.tdlPatientPhone, css: `truncate` },

                                ]}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TreatmentBedRoomListTable;
