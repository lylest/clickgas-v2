import {ElementType, FC} from "react";
import classNames from 'classnames';
import {twMerge} from "tailwind-merge";
import Badge from "@/components/general/Badge.tsx";

export interface IMenuIcon {
    label: string | undefined
    Icon?: ElementType
    iconColor?: string
    iconSize?:number
    badge?: string | number | undefined
    url?: string
    onClick?: () => void
    iconClassName?:string
    value?:string
    className?:string
}

const MenuIcon: FC<IMenuIcon> = (
    {
        Icon,
        label,
        badge,
        onClick,
        iconColor , //= "#aeaea6",
        value,
        iconSize,
        className,
        iconClassName
    }) => {

    return (
        <div onClick={() => onClick && onClick()}
             className={twMerge(className,"flex gap-2 py-2 rounded-[6px] dark:hover:bg-neutral-600 transition ease-in-out display-block cursor-pointer duration-300 hover:bg-gray-100")}>

            {Icon && <Icon
                className={twMerge("", iconClassName)}
                color={localStorage.theme === 'dark' ? "#aeaea6": iconColor ? iconColor: "#868e96"}
                size={iconSize ? iconSize: 22}/>}

            <p className={classNames("pt-[1px] font-normal text-sm text-slate-600 dark:text-neutral-300", {
            })}>{label}</p>

            <div className={"ml-auto "}>
                {badge && <Badge label={4}/>}
                {value && <p className={"text-slate-800 text-sm"}>{value}</p>}
            </div>

        </div>
    )
}

export default MenuIcon