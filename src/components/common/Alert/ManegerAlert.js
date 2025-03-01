import React, { useEffect } from "react";
import Alert from "../Alert/Alert";

const Maneger = ({alerts, removeAlert, className = "" }) => {
    return (
        <div className={`fixed max-h-[50px] bottom-4 right-4 ml-2 space-y-4 z-[99999] ${className}`}>
        {alerts.map((alert) => (
            <Alert
                key={alert.id}
                message={alert.message}
                type={alert.type}
                onClose={() => removeAlert(alert.id)}
            />
        ))}
    </div>
    );
};

export default Maneger;
