import React from "react";

const component = ({
    fieldValue,
    css,
 }) => {
    return (
        <td className={`border-b px-2 py-1 ${css ? css : ""}`}>{fieldValue}</td>
    );
};

export default component;
