import {ElementType, FC} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export interface IMenuItem {
    Icon?: ElementType
    iconColor?: string
    badge?: string | number | undefined
    url?: string
    label:string
    pattern?:RegExp
    onClick?: () => void
}

const Fab: FC<IMenuItem> = (
    {
        Icon,
        onClick,
        iconColor = "#fff",
        label
    }) => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div onClick={() => onClick && onClick()}
                    className={"w-10 h-10 drop-shadow-md bg-primary dark:bg-slate-700  grid place-items-center rounded-full transition ease-in-out display-block hover:bg-primary-400 dark:hover:bg-slate-600 hover:drop-shadow-lg cursor-pointer duration-300"}>
                        {Icon && <Icon color={iconColor} size={20}/>}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default Fab