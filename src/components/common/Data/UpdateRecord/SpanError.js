import React from "react";

const component = ({
    errors,
    error,
}) => {
    return (
        <div className="w-full mt-1 truncate">
            {errors && (errors || []).map((errorMessage, index) => (
                <p key={index} className="text-red-500 text-sm">{errorMessage}</p>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default component;
