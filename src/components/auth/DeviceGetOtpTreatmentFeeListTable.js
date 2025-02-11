import React from "react";
import Loading from "../common/Info/Loading";
import ErrorInfo from "../common/Info/ErrorInfo";
import Thead from "../common/Data/TableList/Thead";
import GroupTd from "../common/Data/TableList/GroupTd";
import NoRecord from "../common/Info/NoRecord";
import { FaUnlock } from "react-icons/fa";

const DeviceGetOtpTreatmentFeeListTable = ({
    fieldLabels,
    data,
    selectedRecord,
    loading,
    error,
    isProcessing,
    openUnlockModal,
    handleRecordSelect,
}) => {
    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;
    if (isProcessing) return <Loading />;
    if (!data) return <NoRecord />

    return (
        <div>
            <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <Thead
                    fields={[
                        { fieldName: fieldLabels.totalRequests },
                        { fieldName: 'Hành động' },
                        { fieldName: fieldLabels.ttl },
                        { fieldName: fieldLabels.device },
                        { fieldName: fieldLabels.ip },
                        { fieldName: fieldLabels.firstRequestAt },
                        { fieldName: fieldLabels.lastRequestAt },
                    ]}
                />
                <tbody>
                    {data.map((record) => (
                        <tr
                            className={`hover:bg-gray-50 cursor-pointer ${selectedRecord?.device === record.device && selectedRecord?.ip === record.ip ? "bg-blue-100" : ""}`}
                            onClick={() => {
                                handleRecordSelect(record)
                            }}
                        >
                            <GroupTd
                                fields={[
                                    { fieldValue: record.totalRequests, css: `truncate text-center` },
                                    {
                                        fieldValue:
                                            <button
                                                onClick={() => openUnlockModal(record)}
                                                className="bg-green-500 text-white p-1 rounded ">
                                                <FaUnlock className="inline-block mr-1 w-5 h-3" /> Mở chặn</button>
                                    },
                                    {
                                        fieldValue: `${Math.floor(record.ttl / 3600)} giờ ${Math.floor((record.ttl % 3600) / 60)} phút ${record.ttl % 60} giây`,
                                        css: `text-red-600 font-semibold truncate`
                                    },
                                    { fieldValue: record.device, css: `truncate font-semibold text-blue-600` },
                                    { fieldValue: record.ip },
                                    { fieldValue: record.firstRequestAt, css: `text-center` },
                                    { fieldValue: record.lastRequestAt, css: `text-center` },
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
