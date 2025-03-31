import {FC} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

interface Props {
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const NotFound: FC<Props> = (
    {
        title = "Page not found",
        message = "Sorry, we couldn't find the page you're looking for.",
        actionLabel = "Go back home",
        onAction,
    }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md">
                {/* Animated 404 elements */}
                <div className="relative h-48 mb-8">
                    <motion.div
                        className="absolute flex items-center justify-center w-full"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {/* Numbers with decorative elements */}
                        <div className="relative">
                            <div className="flex items-baseline">
                                <span className="text-9xl font-bold text-primary-500 tracking-tighter">4</span>
                                <motion.div
                                    className="w-20 h-20 bg-primary-100 dark:bg-primary-900/50 rounded-full mx-1 flex items-center justify-center"
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
                                        className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                                        <div className="w-3 h-3 bg-primary-500 rounded-full"/>
                                    </div>
                                </motion.div>
                                <span className="text-9xl font-bold text-primary-500 tracking-tighter">4</span>
                            </div>

                            {/* Decorative lines */}
                            <motion.div
                                className="absolute -bottom-4 left-8 w-3/4 h-0.5 bg-gradient-to-r from-primary-200 to-transparent"
                                initial={{width: 0}}
                                animate={{width: "75%"}}
                                transition={{duration: 0.7, delay: 0.3}}
                            />
                            <motion.div
                                className="absolute -bottom-7 left-12 w-2/4 h-0.5 bg-gradient-to-r from-primary-100 to-transparent"
                                initial={{width: 0}}
                                animate={{width: "50%"}}
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

                    <button
                        onClick={handleAction}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 text-white font-medium transition-colors hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 focus:outline-none"
                    >
                        <ArrowLeft size={18} className="mr-2"/>
                        {actionLabel}
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;