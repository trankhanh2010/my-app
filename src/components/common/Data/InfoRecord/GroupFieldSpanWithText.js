import React from "react";
import FieldSpanWithText from "../InfoRecord/FieldSpanWithText";

const component = ({ fields, css }) => {
    return (
        <div className={`flex flex-col md:flex-row md:space-x-2 border border-gray-300 p-2 ${css}`}>
            {fields.map((field, index) => (
                <FieldSpanWithText
                    key={index}
                    fieldName={field.fieldName}
                    fieldValue={field.fieldValue}
                    divCss={field.divCss}
                    pCss={field.pCss}
                    spanCss={field.spanCss}
                />
            ))}
        </div>
    );
};

export default component;