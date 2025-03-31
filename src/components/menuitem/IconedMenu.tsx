import {ElementType, FC} from "react";
import classNames from 'classnames';
import {useLocation} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export interface IMenuItem {
    Icon?: ElementType
    iconColor?: string
    badge?: string | number | undefined
    url?: string
    label: string
    pattern?: RegExp
    onClick?: () => void
}

const IconedMenu: FC<IMenuItem> = (
    {
        Icon,
        onClick,
        iconColor = "#868e96",
        pattern,
        label
    }) => {

    const {pathname} = useLocation();
    const activePage = pattern?.test(pathname);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div onClick={() => onClick && onClick()}
                         className={
                             classNames("w-10  flex gap-3 p-2 mt-2 rounded-full dark:hover:bg-neutral-600 dark:ring-neutral-600/50 transition ease-in-out display-block hover:bg-gray-100 cursor-pointer duration-300",
                                 {"bg-primary-50 dark:bg-neutral-700 hover:bg-primary-50 ring-inset ring-1 ring-primary-100": activePage})}>

                        {Icon && <Icon
                            color={localStorage.theme === 'dark' && activePage ? "#3b82f6" : activePage ? "#3b82f6" : iconColor}
                            size={22}/>}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default IconedMenu
