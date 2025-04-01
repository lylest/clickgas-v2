import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModernLoaderProps {
    message?: string;
    fullScreen?: boolean;
    size?: "small" | "medium" | "large";
    accentColor?: string;
    showProgress?: boolean;
    progress?: number;
}

const MainLoader: FC<ModernLoaderProps> = ({
                                                 message,
                                                 fullScreen = true,
                                                 size = "medium",
                                                 accentColor = "#0066CC", // Apple-inspired blue
                                                 showProgress = false,
                                                 progress = 0,
                                             }) => {
    const [dots, setDots] = useState("");

    // Animated ellipsis effect for the message
    useEffect(() => {
        if (!message) return;

        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".");
        }, 500);

        return () => clearInterval(interval);
    }, [message]);

    // Size configurations
    const sizeConfig = {
        small: {
            container: "max-w-xs",
            loaderSize: "w-16 h-16",
            trackWidth: 2,
            indicatorWidth: 2,
            gap: 0.5,
            fontSize: "text-xs",
            iconSize: 20,
        },
        medium: {
            container: "max-w-sm",
            loaderSize: "w-24 h-24",
            trackWidth: 3,
            indicatorWidth: 3,
            gap: 1,
            fontSize: "text-sm",
            iconSize: 28,
        },
        large: {
            container: "max-w-md",
            loaderSize: "w-32 h-32",
            trackWidth: 4,
            indicatorWidth: 4,
            gap: 1.5,
            fontSize: "text-base",
            iconSize: 36,
        },
    };

    const config = sizeConfig[size];

    // Calculate the circumference of the circle
    const radius = size === "small" ? 30 : size === "medium" ? 45 : 60;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = showProgress
        ? circumference - (progress / 100) * circumference
        : 0;

    return (
        <div
            className={`${
                fullScreen ? "min-h-screen" : ""
            } flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300`}
        >
            <div className={`${config.container} p-8 flex flex-col items-center justify-center`}>
                <div className="relative">
                    <motion.div
                        className={`${config.loaderSize} relative`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Base track circle */}
                        <svg
                            className={`w-full h-full`}
                            viewBox={`0 0 ${radius * 2 + 10} ${radius * 2 + 10}`}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx={radius + 5}
                                cy={radius + 5}
                                r={radius}
                                strokeWidth={config.trackWidth}
                                stroke="rgba(0, 0, 0, 0.1)"
                                className="dark:stroke-gray-800"
                                fill="none"
                            />

                            {/* Progress circle or animated circle */}
                            {showProgress ? (
                                <circle
                                    cx={radius + 5}
                                    cy={radius + 5}
                                    r={radius}
                                    strokeWidth={config.indicatorWidth}
                                    stroke={accentColor}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={progressOffset}
                                    transform={`rotate(-90 ${radius + 5} ${radius + 5})`}
                                    className="transition-all duration-300 ease-in-out"
                                />
                            ) : (
                                <motion.circle
                                    cx={radius + 5}
                                    cy={radius + 5}
                                    r={radius}
                                    strokeWidth={config.indicatorWidth}
                                    stroke={accentColor}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
                                    animate={{
                                        rotate: [0, 360],
                                        strokeDasharray: [
                                            `${circumference * 0.1} ${circumference * 0.9}`,
                                            `${circumference * 0.25} ${circumference * 0.75}`,
                                            `${circumference * 0.1} ${circumference * 0.9}`
                                        ],
                                        strokeDashoffset: [0, -circumference * 0.5, -circumference]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1]
                                    }}
                                />
                            )}

                            {/* Center dot */}
                            <motion.circle
                                cx={radius + 5}
                                cy={radius + 5}
                                r={radius / 6}
                                fill={accentColor}
                                animate={{
                                    opacity: [0.7, 1, 0.7],
                                    scale: [0.9, 1, 0.9]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </svg>

                        {/* Floating particles around the circle */}
                        <AnimatePresence>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full bg-opacity-70"
                                    style={{
                                        backgroundColor: accentColor,
                                        width: config.gap * 3,
                                        height: config.gap * 3,
                                        top: "50%",
                                        left: "50%",
                                    }}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 0,
                                        scale: 0
                                    }}
                                    animate={{
                                        x: [0, (radius * Math.cos(i * (72 * Math.PI / 180))) * 0.8],
                                        y: [0, (radius * Math.sin(i * (72 * Math.PI / 180))) * 0.8],
                                        opacity: [0, 0.7, 0],
                                        scale: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.8,
                                        delay: i * 0.3,
                                        repeat: Infinity,
                                        repeatDelay: 0.5
                                    }}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {message && (
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p
                            className={`${config.fontSize} font-medium text-gray-800 dark:text-gray-200`}
                            style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}
                        >
                            {message}{dots}
                        </p>

                        {showProgress && (
                            <p
                                className={`${config.fontSize} mt-2 font-semibold`}
                                style={{ color: accentColor }}
                            >
                                {Math.round(progress)}%
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MainLoader;