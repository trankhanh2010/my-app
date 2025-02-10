import React from "react";
import Loading from "../common/Info/Loading";
import ErrorInfo from "../common/Info/ErrorInfo";
import Thead from "../common/Data/TableList/Thead";
import GroupTd from "../common/Data/TableList/GroupTd";
import NoRecord from "../common/Info/NoRecord";

const DeviceGetOtpTreatmentFeeListTable = ({
    fieldLabels,
    data,
    selectedRecord,
    loading,
    error,
    isProcessing,
}) => {
    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;
    if (isProcessing) return <Loading />;
    if (!data) return  <NoRecord />
 
    return (
        <div>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.totalRequests},
                        { fieldName: fieldLabels.device},
                        { fieldName: fieldLabels.ip},
                        { fieldName: fieldLabels.firstRequestAt },
                        { fieldName: fieldLabels.lastRequestAt},
                    ]}
                />
                <tbody>
                    {data.map((record) => (
                        <tr
                            key={record.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.device === record.device && selectedRecord?.ip === record.ip? "bg-blue-100" : ""}`}
                            // onClick={() => {
                            //     handleRecordSelect(record)
                            //     setReload(true)
                            // }}
                        >
                            <GroupTd
                                fields={[
                                    { fieldValue: record.totalRequests , css: `truncate` },
                                    { fieldValue: record.device },
                                    { fieldValue: record.ip },
                                    { fieldValue: record.firstRequestAt },
                                    { fieldValue: record.lastRequestAt },
                                ]}
                            />                         
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeviceGetOtpTreatmentFeeListTable;
