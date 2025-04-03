import React, {FC} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {Lock, ArrowLeft} from "lucide-react";
import checkPermission from "@/pages/permissions-manager/check-permission";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook";

interface Props {
    children: React.ReactNode;
    permission: string;
    navigate?: boolean;
    messageScreen?: boolean;
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const Can: FC<Props> = (
    {
        children,
        permission,
        messageScreen = true,
        title = "Access Denied",
        message = "Insufficient permission to access resource. Please ensure your account has the appropriate access rights or contact support for assistance.",
        actionLabel = "Go back",
        onAction,
    }) => {
    const {state} = useGlobalContextHook();
    const navigate = useNavigate();
    const user = state.currentUser;
    const userPermissions = user?.permissions ?? [];
    const hasPermission = checkPermission(permission, userPermissions);

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            navigate(-1);
        }
    };

    if (hasPermission) {
        return <>{children}</>;
    }

    return messageScreen ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md">
                {/* Animated lock element */}
                <div className="relative h-48 mb-8">
                    <motion.div
                        className="absolute flex items-center justify-center w-full"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {/* Lock icon with decorative elements */}
                        <div className="relative">
                            <motion.div
                                className="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                            >
                                <div
                                    className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
                                >
                                    <Lock size={32} className="text-primary-500"/>
                                </div>
                            </motion.div>

                            {/* Decorative lines */}
                            <motion.div
                                className="absolute -bottom-4 left-2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent"
                                initial={{width: 0}}
                                animate={{width: "100%"}}
                                transition={{duration: 0.7, delay: 0.3}}
                            />
                            <motion.div
                                className="absolute -bottom-7 left-4 w-3/4 h-0.5 bg-gradient-to-r from-primary-100 to-transparent"
                                initial={{width: 0}}
                                animate={{width: "75%"}}
                                transition={{duration: 0.5, delay: 0.6}}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    className="text-center"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.3}}
                >
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                        {title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        {message}
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleAction}
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 text-white font-medium transition-colors hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 focus:outline-none"
                        >
                            <ArrowLeft size={18} className="mr-2"/>
                            {actionLabel}
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        For assistance, contact <a href="mailto:contact@clickgas.com"
                                                   className="text-primary-500 hover:underline">contact@clickgas.com</a>
                    </p>
                </motion.div>
            </div>
        </div>
    ) : null;
};

export default Can;