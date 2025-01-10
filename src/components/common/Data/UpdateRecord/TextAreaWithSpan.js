import React from "react";
import SpanFieldName from "../InfoRecord/SpanFieldName";
import TextAreaField from "../UpdateRecord/TextAreaField";
const component = ({
    inputName,
    inputValue,
    inputType,
    divCss,
    spanCss,
    inputCss,
    onChange,
}) => {
    return (
        <div className={`mt-1 w-full flex flex-col ${divCss ? divCss : ""}`}>
            <SpanFieldName
                fieldName={inputName}
                spanCss={spanCss}
            />
            <TextAreaField
                onChange={onChange}
                type={inputType}
                value={inputValue}
                css={inputCss}
            />
        </div>
    );
};

export default component;
