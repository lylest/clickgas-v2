import MenuItem from "@/components/menuitem/MenuItem.tsx";
import {ElementType, FC, ReactNode} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {TbCopy} from "react-icons/tb";
import toast from "react-hot-toast";
import {twMerge} from "tailwind-merge";

interface Props {
    children?:ReactNode
    value:string | number
    label: string | undefined
    Icon?: ElementType
    iconColor?: string
    className?:string

}

const MenuValue:FC<Props> =({Icon,label, value,className})=> {

    const copyToClipboard = (text:string | number) => {
        navigator.clipboard.writeText(text.toString()).then(() => {
           toast.success("Copied")
        }).catch(() => {
            toast.error("Failed to copy")
        });
    };

    return (
        <div className={twMerge("w-1/2 flex space-y-3 cursor-pointer", className)}>
            <MenuItem label={label} Icon={Icon}/>
            <div className={"ml-auto"}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className={"text-[14px] dark:text-neutral-100"}>{value}</p>
                        </TooltipTrigger>
                        <TooltipContent onClick={() => copyToClipboard(value)}>
                            <div className={"flex -space-y-1 gap-1"}>
                                <TbCopy/>
                                <p>Copy to clipboard</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
        </div>
    )
}

export default MenuValue