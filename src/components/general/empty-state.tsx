import { FC } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LucidePlus } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    message?: string;
    actionLink?: string;
    actionLabel?: string;
    icon?: React.ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({
                                             title = "Nothing here yet",
                                             message = "There are no items to display at the moment.",
                                             actionLink,
                                             actionLabel,
                                             icon,
                                         }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (actionLink) {
            navigate(actionLink);
        }
    };

    // File stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const fileVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Floating animation
    const floatingAnimation = {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Stacked files animation */}
                <div className="relative h-48 mb-8">
                    {icon ? (
                        <motion.div
                            className="absolute flex items-center justify-center w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="w-24 h-24 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center"
                                animate={floatingAnimation}
                            >
                                {icon}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="absolute flex items-center justify-center w-full h-full"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {/* Bottom file */}
                            <motion.div
                                className="absolute w-32 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm transform rotate-6"
                                variants={fileVariants}
                                transition={{ duration: 0.5 }}
                            />

                            {/* Middle file */}
                            <motion.div
                                className="absolute w-32 h-40 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm transform -rotate-3"
                                variants={fileVariants}
                                transition={{ duration: 0.5, delay: 0.15 }}
                            />

                            {/* Top file with dotted pattern */}
                            <motion.div
                                className="absolute w-32 h-40 bg-white dark:bg-gray-900 rounded-lg shadow-md"
                                variants={fileVariants}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                animate={floatingAnimation}
                            >
                                {/* File content lines */}
                                <div className="w-full h-full p-4 flex flex-col justify-center items-center">
                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3"/>
                                    <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3"/>
                                    <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"/>
                                </div>
                            </motion.div>

                            {/* Floating "No Files" icon on top */}
                            <motion.div
                                className="absolute top-2 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg z-10"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
                            >
                                <div className="w-4 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Content */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        {title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        {message}
                    </p>

                    {actionLink && actionLabel && (
                        <motion.button
                            onClick={handleAction}
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 text-white font-medium transition-colors hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 focus:outline-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <LucidePlus size={18} className="ml-2" />
                            {actionLabel}

                        </motion.button>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default EmptyState;