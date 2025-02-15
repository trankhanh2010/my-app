import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../../../components/common/Master/Card";
import SectionHeader from "../../../components/common/Data/InfoRecord/SectionHeader";
import Filter from "../../../components/data/treatmentBedRoomListVView/Filter";
import TreatmentBedRoomListTable from "../../../components/data/treatmentBedRoomListVView/TreatmentBedRoomListTable";
import Paginate from "../../../components/data/treatmentBedRoomListVView/Paginate";

import useTreatmentBedRoomList from "../../../hooks/data/treatmentBedRoomListVView/useTreatmentBedRoomList";
import MedicalCaseCover from "../../../components/data/treatmentBedRoomListVView/MedicalCaseCover";

const Page = () => {
    const {
        data,
        paramData,
        loading,
        error,
        applyFilter,
        setApplyFilter,
        filter,
        setFilter,
        selectedRecord,
        setSelectedRecord,
        fieldLabels,
        convertToDate,
        format,
        calculateAge,
        handleRecordSelect,
        dataMedicalCaseCover,
        loadingMedicalCaseCover,
        errorMedicalCaseCover,
        dataDepartment,
        loadingDepartment,
        errorDepartment,
    } = useTreatmentBedRoomList()

    return (
        <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-12 gap-2 mt-2 min-h-[80vh]`}>
            {/* Phần điều khiển và lọc */}
            <Card className="md:order-1 md:col-span-4 md:row-span-4">
                <SectionHeader title="Bộ lọc" />
                <div className=" min-h-[20vh] md:overflow-y-auto">
                    <Filter
                        applyFilter={applyFilter}
                        setApplyFilter={setApplyFilter}
                        dataDepartment={dataDepartment}
                        loadingDepartment={loadingDepartment}
                        errorDepartment={errorDepartment}
                    />
                </div>
            </Card>

            {/* Danh sách dữ liệu */}
            <Card className="md:order-3 md:col-span-4 md:row-span-8">
                <SectionHeader title="Danh sách điều trị" />
                <div
                    className="relative overflow-x-auto overflow-y-auto max-h-[80vh] md:max-h-[40vh] md:min-h-[40vh] mb-2 flex flex-col border"
                >
                    <TreatmentBedRoomListTable
                        fieldLabels={fieldLabels}
                        format={format}
                        data={data}
                        convertToDate={convertToDate}
                        selectedRecord={selectedRecord}
                        loading={loading}
                        calculateAge={calculateAge}
                        handleRecordSelect={handleRecordSelect}
                    />
                </div>
                <Paginate
                    filter={filter}
                    setFilter={setFilter}
                    setApplyFilter={setApplyFilter}
                    paramData={paramData}
                    data={data}
                />
            </Card>

            {/*Chi tiết */}
            <Card className="md:order-2 md:col-span-8 md:row-span-12">
                <SectionHeader title="Thông tin vỏ bệnh án" />
                <div
                    className="relative overflow-x-auto overflow-y-auto max-h-[80vh] md:max-h-[80vh] md:min-h-[80vh] mb-2 flex flex-col border"
                >
                    <MedicalCaseCover
                        fieldLabels={fieldLabels}
                        recordDetails={dataMedicalCaseCover}
                        loading={loadingMedicalCaseCover}
                        error={errorMedicalCaseCover}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Page;
