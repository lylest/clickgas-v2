import {FC, ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

export interface IBadge {
    children?: ReactNode;
    label: string | number
    className?: string
    onClick?: () => void
    type?: "primary" | "secondary" | "info" | "warning" | "error" | "success" | "pink" | "purple" | string
}

const Badge: FC<IBadge> = ({type, label, className, children,onClick}) => {
    const getType = () => {
        switch (type) {
            case "primary":
                return "inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-500 px-2 py-1 text-xs  text-primary-700 ring-1 ring-inset ring-600-700/10"

            case "secondary":
                return "inline-flex items-center rounded-full bg-gray-100 dark:bg-neutral-600/50 px-2 py-1 text-xs  text-gray-600 dark:text-neutral-200 ring-1 ring-inset ring-gray-500/10"

            case "info":
                return "inline-flex items-center rounded-full bg-blue-100  dark:bg-primary-500  dark:text-primary-200 px-2 py-1 text-xs  text-blue-700 ring-1 ring-inset ring-blue-700/10"

            case "warning":
                return "inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-100 px-2 py-1 text-xs text-yellow-800 ring-1 ring-inset ring-yellow-600/10"

            case "error":
                return "inline-flex items-center rounded-full bg-red-100 dark:bg-red-100 px-2 py-1 text-xs  text-red-700 ring-1 ring-inset ring-red-600/10"

            case "success":
                return "inline-flex items-center rounded-full bg-green-100 dark:bg-green-100 px-2 py-1 text-xs  text-green-700 ring-1 ring-inset ring-green-600/10"

            case "pink":
                return "inline-flex items-center rounded-full bg-pink-100  dark:bg-pink-100 px-2 py-1 text-xs  text-pink-700 ring-1 ring-inset ring-pink-700/10"

            case "purple":
                return "inline-flex items-center rounded-full bg-purple-100  dark:bg-purple-100 px-2 py-1 text-xs  text-purple-700 ring-1 ring-inset ring-purple-700/10"

            default:
                return "inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs text-primary-700 ring-1 ring-inset ring-primary-700/10"

        }
    }
    return (
        <span  onClick={() => onClick?.()} className={`${cn(getType(), className)} hover:cursor-pointer`}>{children && children}{label}</span>
    )
}

export default Badge