import React from "react";

const component = ({
    fieldValue,
    css,
    dangerouslySetInnerHTML,
 }) => {
    return (
        <td className={`border px-2 py-1 ${css ? css : ""}`}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >{fieldValue}</td>
    );
};

export default component;
