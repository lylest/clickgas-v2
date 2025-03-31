import React, {
    createContext,
    FC,
    ReactElement,
    ReactNode,
    useContext,
    useState,
} from "react";


import { getIconAndColor } from "./ModalMessageCenter.tsx";
import {randomId} from "@/utils";
import {Button} from "@/components/form-control";


export interface IAlert {
    actions: string[];
    appendTo?: React.RefObject<Element>;
    callback?: (action: string) => void;
    cancelText: string;
    hideCloseButton: boolean;
    id: string;
    message: ReactNode;
    okayText: string;
    open: boolean;
    size: string;
    title: string;
    type: "success" | "info" | "warning" | "danger";
}

export interface IConfirmOptions {
    appendTo?: React.RefObject<Element>;
    cancelText?: string;
    hideCloseButton?: boolean;
    message?: ReactNode;
    okayText?: string;
    open?: boolean;
    title?: string;
    type?: "success" | "info" | "warning" | "danger";
}

interface IAlertContext {
    alerts: IAlert[];
    clearAlerts: ()=> void;
    confirm: (options?: IConfirmOptions) => Promise<any>;
    handleClose: (alert: IAlert, action: string) => Promise<any>;
    renderActions: (alert: IAlert) => ReactElement;
}

const AlertContext = createContext<IAlertContext | null>(null);

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    async function handleClose(al: IAlert, action: string) {
        const alertId = al.id;
        // @ts-ignore
        al.callback(action);

        const updatesAlerts = alerts.map((alert) => {
            if (alert.id === alertId) return { ...alert, open: false };
            return alert;
        });

        setAlerts(updatesAlerts);
        setAlerts(alerts.filter(({ id }) => id !== alertId));
    }

    const confirm = (options = {}) => {
        const alert: IAlert = {
            actions: [],
            cancelText: "No, Cancel",
            hideCloseButton: false,
            id: randomId(),
            message: "Action cant be undone",
            okayText: "Yes, Continue",
            open: true,
            size: "md",
            title: "Are you sure?",
            type: "info",
            ...(options || {}),
        };

        alert.actions = [alert.cancelText, alert.okayText];
        return new Promise((resolve) => {
            setAlerts([
                {
                    ...alert,
                    callback: (action) => resolve(action === alert.actions[1]),
                },
            ]);
        });
    };

    function renderActions(alert: IAlert): ReactElement {
        const { buttonClass } = getIconAndColor(alert.type);
        return (
            <>
                <Button
                    hidden={alert.hideCloseButton}
                    onClick={() => handleClose(alert, alert.actions[0])}
                    type="button"
                    className="mt-3  w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border border-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    {alert.cancelText}
                </Button>

                <Button
                    onClick={() => handleClose(alert, alert.actions[1])}
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md ${buttonClass} px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}
                >
                    {alert.okayText}
                </Button>
            </>
        );
    }

    const clearAlerts = () => {
        setAlerts([]);
    };
    const value = {
        alerts,
        confirm,
        renderActions,
        handleClose,
        clearAlerts,
    };

    return (
        <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
    );
};

export function useAlerts() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error(
            "useAlert hook should be used inside of AlertProvider.",
        );
    }
    return context;
}

export default AlertProvider;
