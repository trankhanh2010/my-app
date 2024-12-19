import React from "react";

const component = ({
    fieldName,
    spanCss,
 }) => {
    return (
        <span className={`font-semibold uppercase ${spanCss ? spanCss : ""}`}>{fieldName}: </span>
    );
};

export default component;
