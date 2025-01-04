import React from "react";
import SpanFieldName from "./SpanFieldName";
const component = ({
    fieldName,
    fieldValue,
    divCss,
    spanCss,
    pCss,
 }) => {
    return (
        <div className={`w-full flex flex-col ${divCss ? divCss : ""}`}>
            <SpanFieldName 
                fieldName={fieldName}
                spanCss={spanCss}
            />
            <p className={`pl-1 pr-1 mr-2 bg-gray-100 flex-grow min-h-[24px] ${pCss ? pCss : ""}`}>{fieldValue}</p>
        </div>
    );
};

export default component;
