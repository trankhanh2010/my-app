import React from "react";

const component = ({
    onChange,
    type,
    value,
    css,
    checked,
}) => {
    return (
        <input
            checked={checked}
            onChange={onChange}
            type={type}
            value={value}
            className={`p-2 mr-2 rounded flex-grow w-full border bg-gray-100 ${css ? css : ""}`}
        />
    );
};

export default component;
