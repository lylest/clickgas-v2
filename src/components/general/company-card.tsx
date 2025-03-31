import {FC} from "react";
import {IoCheckmarkCircle} from "react-icons/io5";
import {twMerge} from "tailwind-merge";

interface Props {
    name: string
    contact: string
    isSelected?: boolean
    onClick?: () => void
    imageUrl:string
    className?:string
}

const CompanyCard: FC<Props> = (
    {
        name,
        contact,
        isSelected,
        imageUrl,
        className,
        onClick
    }) => {
    return (
        <div   onClick={() =>  onClick && onClick()}
               className={twMerge(className,"flex gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-600/30 p-2 rounded-xl custom-transition")}>
            <div
                className={`bg-primary-100 dark:bg-neutral-200 center h-10 w-10 shrink-0 overflow-hidden rounded-2xl ${isSelected ? " border-[2px]": ""} border-primary-500`}>
                <img
                    className={"h-full w-full object-cover"}
                    src={imageUrl}
                    alt={"company logo"}
                />
            </div>
            <div className="w-7/12">
                <p className="text-sm font-medium  text-slate-600 dark:text-neutral-100">{name}</p>
                <p className="text-xs font-normal text-slate-500 dark:text-neutral-400 ">{contact}</p>
            </div>

            <div className={"ml-auto"}>
                {isSelected ?
                    <IoCheckmarkCircle  className={"text-primary mt-3"} size={20}/>
                    : null}
            </div>
        </div>
    )
}

export default CompanyCard