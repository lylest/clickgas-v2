import { Fragment } from "react";

import { useAlerts } from "@/Providers/Alert/AlertProvider.tsx";
import ModalMessageCenter from "@/Providers/Alert/ModalMessageCenter.tsx";

const AlertContainer = () => {
    const { alerts, handleClose, renderActions } = useAlerts();
    if (!alerts.length) return <Fragment />;

    return (
        <Fragment>
            {alerts.map((alert) => (
                <ModalMessageCenter
                    actions={renderActions(alert)}
                    appendTo={alert.appendTo}
                    key={alert.id}
                    message={alert.message}
                    onClose={() => handleClose(alert, alert.actions[0])}
                    size={alert.size}
                    title={alert.title}
                    type={alert.type}
                />
            ))}
        </Fragment>
    );
};

export default AlertContainer;
