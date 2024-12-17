import React from "react";

const component = ({
    fieldName,
    fieldValue,
    divCss,
    spanCss,
    pCss,
 }) => {
    return (
        <div className={`w-full flex flex-col ${divCss ? divCss : ""}`}>
            <span className={`font-semibold uppercase ${spanCss ? spanCss : ""}`}>{fieldName}: </span>
            <p className={`p-1 mr-2 bg-gray-100 flex-grow ${pCss ? pCss : ""}`}>{fieldValue}</p>
        </div>
    );
};

export default component;
