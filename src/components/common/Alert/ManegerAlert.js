import React, { useEffect } from "react";
import Alert from "../Alert/Alert";

const Maneger = ({alerts, removeAlert }) => {
    return (
        <div className="fixed bottom-4 right-4 space-y-4">
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
