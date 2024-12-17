import React from "react";

const component = ({
    fieldName,
    css,
 }) => {
    return (
        <th className={`px-2 py-1 truncate ${css ? css : ""}`}>{fieldName}</th>
    );
};

export default component;
