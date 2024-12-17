import React from "react";
import Td from "../TableList/Td";

const component = ({ fields }) => {
    return (
        <>
            {fields.map((field, index) => (
                <Td
                    key={index}
                    fieldValue={field.fieldValue}
                    css={field.css}
                />
            ))}
        </>
    );
};

export default component;
