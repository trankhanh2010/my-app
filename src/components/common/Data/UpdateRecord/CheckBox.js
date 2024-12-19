import React from "react";

const component = ({
    checked,
    onChange
}) => {
    return (
        <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-large"
      />
    );
};

export default component;
