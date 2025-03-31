import {ElementType, FC} from "react";
import Badge from "./Badge.tsx";
import classNames from 'classnames';

export interface IMenuItem {
    label: string | undefined
    Icon?: ElementType
    iconColor?: string
    badge?: string | number | undefined
    url?: string
    onClick?: () => void
}

const MenuItem: FC<IMenuItem> = (
    {
        Icon,
        label,
        badge,
        onClick,
        iconColor = "#666"
    }) => {

    const activePage = label === "Trash"

    return (
        <div onClick={() => onClick && onClick()}
             className={
                 classNames("flex gap-3 p-2 rounded transition ease-in-out display-block hover:bg-primary-50/50 cursor-pointer duration-300",
                     {"bg-primary hover:bg-primary-500": activePage})}>

            {Icon && <Icon color={activePage ? "#fff" : iconColor} size={25}/>}

            <p className={classNames("font-medium text-md text-[#666]", {
                "text-slate-100": activePage
            })}>{label}</p>

            <div className={"ml-auto"}>{badge && <Badge label={4}/>}</div>

        </div>
    )
}

export default MenuItem