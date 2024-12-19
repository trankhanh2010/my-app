import React from "react";
import SpanFieldName from "../InfoRecord/SpanFieldName";
import InputField from "../UpdateRecord/InputField";
const component = ({
    inputName,
    inputValue,
    inputType,
    divCss,
    spanCss,
    inputCss,
    onChange,
    inputChecked,
}) => {
    return (
        <div className={`mt-1 w-full flex flex-col ${divCss ? divCss : ""}`}>
            <SpanFieldName
                fieldName={inputName}
                spanCss={spanCss}
            />
            <InputField
                onChange={onChange}
                type={inputType}
                value={inputValue}
                css={inputCss}
                checked={inputChecked}
            />
        </div>
    );
};

export default component;
