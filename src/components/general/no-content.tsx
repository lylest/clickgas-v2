import { ElementType, FC } from "react";

interface Props {
    label: string;
    description: string;
    Icon: ElementType;
    className?: string;
}

const NoContent: FC<Props> = ({ label, description, Icon, className = "" }) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
            <div className="relative w-24 h-24 mb-6">
                {/* Background elements */}
                <div className="absolute w-full h-full bg-gray-100 dark:bg-neutral-800 rounded-2xl transform rotate-12 -right-3 -top-3" />
                <div className="absolute w-full h-full bg-gray-200 dark:bg-neutral-700 rounded-2xl transform -rotate-6" />

                {/* Icon container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={36} className="text-gray-400 dark:text-gray-500" />
                </div>
            </div>

            {/* Text content */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {label}
            </h3>

            <p className="mt-3 text-gray-500 dark:text-gray-400 text-center max-w-md text-base">
                {description}
            </p>
        </div>
    );
};

export default NoContent;