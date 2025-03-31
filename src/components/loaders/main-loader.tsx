import {FC} from "react";
import {motion} from "framer-motion";

interface MainLoaderProps {
    message?: string;
    fullScreen?: boolean;
    size?: "small" | "medium" | "large";
    brandColor?: boolean;
}

const MainLoader: FC<MainLoaderProps> = (
    {
        message = "Loading...",
        fullScreen = true,
        size = "medium",
        brandColor = true,
    }) => {
    // Size configurations
    const sizeConfig = {
        small: {
            container: "h-24",
            circle: {
                outer: "w-12 h-12",
                inner: "w-8 h-8",
                dot: "w-2 h-2",
            },
            text: "text-sm",
        },
        medium: {
            container: "h-36",
            circle: {
                outer: "w-20 h-20",
                inner: "w-16 h-16",
                dot: "w-3 h-3",
            },
            text: "text-base",
        },
        large: {
            container: "h-48",
            circle: {
                outer: "w-28 h-28",
                inner: "w-24 h-24",
                dot: "w-4 h-4",
            },
            text: "text-lg",
        },
    };

    // Animation configurations
    const pulseAnimation = {
        scale: [1, 1.05, 1],
        rotate: [0, 180, 360],
    };

    const dotAnimation = {
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
    };


    return (
        <div
            className={`${
                fullScreen ? "min-h-screen" : "min-h-[200px]"
            } flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900`}
        >
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Animated loader elements */}
                <div className={`relative ${sizeConfig[size].container} mb-6 flex items-center justify-center`}>
                    <motion.div
                        className="absolute flex items-center justify-center"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {/* Circular spinner with decorative elements */}
                        <div className="relative">
                            <motion.div
                                className={`${sizeConfig[size].circle.outer} ${
                                    brandColor ? "bg-primary-100 dark:bg-primary-900/50" : "bg-gray-200 dark:bg-gray-700/50"
                                } rounded-full flex items-center justify-center`}
                                animate={pulseAnimation}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut",
                                }}
                            >
                                <div
                                    className={`${sizeConfig[size].circle.inner} bg-white dark:bg-gray-800 rounded-full flex items-center justify-center`}
                                >
                                    <motion.div
                                        className={`${sizeConfig[size].circle.dot} ${
                                            brandColor ? "bg-primary-500" : "bg-gray-500"
                                        } rounded-full`}
                                        animate={dotAnimation}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Decorative lines */}
                            <motion.div
                                className={`absolute -top-2 left-1/2 transform -translate-x-1/2 h-0.5 ${
                                    brandColor
                                        ? "bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                                        : "bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                                }`}
                                initial={{width: "0%"}}
                                animate={{width: "130%"}}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    repeatType: "reverse",
                                }}
                            />
                            <motion.div
                                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 ${
                                    brandColor
                                        ? "bg-gradient-to-r from-transparent via-primary-200 to-transparent"
                                        : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                                }`}
                                initial={{width: "0%"}}
                                animate={{width: "100%"}}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2.5,
                                    repeatType: "reverse",
                                    delay: 0.3,
                                }}
                            />

                            {/* Rotating orbit line */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    border: `1px solid ${brandColor ? 'rgba(59, 130, 246, 0.2)' : 'rgba(156, 163, 175, 0.2)'}`,
                                }}
                                animate={{rotate: 360}}
                                transition={{
                                    repeat: Infinity,
                                    duration: 8,
                                    ease: "linear",
                                }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Message */}
                {message && (
                    <motion.div
                        className="text-center"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.3}}
                    >
                        <p className={`${sizeConfig[size].text} ${brandColor ? "text-primary-600" : "text-gray-600"} dark:text-gray-300`}>
                            {message}
                        </p>

                        {/* Animated loading dots */}
                        <motion.div
                            className="flex space-x-1 justify-center mt-2"
                            initial="hidden"
                            animate="visible"
                        >
                            {[0, 1, 2].map((dot) => (
                                <motion.div
                                    key={dot}
                                    className={`${brandColor ? "bg-primary-400" : "bg-gray-400"} rounded-full h-1.5 w-1.5`}
                                    animate={{
                                        y: [0, -3, 0],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: dot * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MainLoader;