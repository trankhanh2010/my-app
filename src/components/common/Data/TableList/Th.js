import React from "react";

const component = ({
    fieldName,
    css,
 }) => {
    return (
        <th className={`sticky top-0 bg-gray-50 dark:bg-gray-700 px-2 py-2 truncate ${css ? css : ""}`}>{fieldName}</th>
    );
};

export default component;
