import React from "react";
import Th from "../TableList/Th";

const component = ({ fields, css }) => {
    return (
        <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ${css}`}>
            <tr>
                {fields.map((field, index) => (
                    <Th
                        key={index}
                        fieldName={field.fieldName}
                        css={field.css}
                    />
                ))}
            </tr>
        </thead>
    );
};

export default component;
