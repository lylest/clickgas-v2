import { FC, ElementType, } from 'react';
import {twMerge} from "tailwind-merge";

interface Props {
    title: string;
    Icon: ElementType;
    iconSize?: number;
    iconWrapperClassName?: string;
    iconColor?: string;
}

const HeaderIcon: FC<Props> = ({ title, Icon, iconSize = 14, iconWrapperClassName, iconColor }) => {
    return (
        <div className="flex gap-2 items-center">
            <div
                className={twMerge("flex items-center justify-center w-6 h-6 border bg-gray-50 dark:bg-neutral-600/30 border-gray-200 dark:border-neutral-600/30 rounded-lg",iconWrapperClassName)}>
                <Icon size={iconSize as number} className={twMerge("text-gray-500",iconColor)} />
            </div>
            <p className="font-semibold dark:text-neutral-100">{title}</p>
        </div>
    );
};

export default HeaderIcon;
