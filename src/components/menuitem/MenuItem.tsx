import {ElementType, FC} from "react";
import {useLocation} from "react-router-dom";
import {cn} from "@/lib/utils";
import Badge from "@/components/general/Badge.tsx";

export interface IMenuItem {
    label: string | undefined;
    Icon?: ElementType;
    badge?: string | number | undefined;
    url?: string;
    pattern?: RegExp;
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
}

const MenuItem: FC<IMenuItem> = (
    {
        Icon,
        label,
        badge,
        onClick,
        pattern,
        isActive: propIsActive,
        className,
    }) => {
    const {pathname} = useLocation();

    // Allow isActive to be passed as a prop or determined by the pattern
    const isActive = propIsActive !== undefined ? propIsActive : (pattern?.test(pathname) ?? false);

    return (
        <div
            onClick={() => onClick && onClick()}
            className={cn(
                "flex items-center gap-3 py-2 px-3 rounded-md transition-colors cursor-pointer",
                "hover:bg-gray-100 dark:hover:bg-neutral-700/50",
                isActive && "bg-primary-50 dark:bg-primary-900/20",
                className
            )}
        >
            {Icon && (
                <Icon
                    className={cn(
                        "flex-shrink-0",
                        isActive ? "text-primary-500 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
                    )}
                    size={18}
                />
            )}

            <p
                className={cn(
                    "font-medium text-sm truncate",
                    isActive
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-gray-700 dark:text-gray-300"
                )}
            >
        {label}
      </p>

            {badge && (
                <div className="ml-auto">
                    <Badge label={badge}/>
                </div>
            )}
        </div>
    );
};

export default MenuItem;