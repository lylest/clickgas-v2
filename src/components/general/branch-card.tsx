import {FC} from "react";
import {IoCheckmarkCircle} from "react-icons/io5";

interface Props {
    name: string
    isSelected: boolean
    onClick: () => void
}

const BranchCard: FC<Props> = (
    {
        name,
        isSelected,
        onClick
    }) => {
    return (
        <div   onClick={() =>  onClick()} className={"flex gap-2 cursor-pointer hover:bg-gray-100 dark:hover:neutral-500 p-2 rounded-xl custom-transition"}>
            <div
                className={`grid place-items-center bg-neutral-400 dark:bg-neutral-600 center h-10 w-10 shrink-0 overflow-hidden rounded-2xl ${isSelected ? " border-[2px]": ""} border-primary-500`}>
                <h1 className={"text-2xl font-bold text-white"}>{name.charAt(0).toUpperCase()}</h1>
            </div>
            <div className="w-7/12">
                <p className="text-lg font-medium pt-2  text-slate-600 dark:text-neutral-100">{name}</p>
            </div>

            <div className={"ml-auto"}>
                {isSelected ?
                    <IoCheckmarkCircle  className={"text-primary mt-3"} size={20}/>
                    : null}
            </div>
        </div>
    )
}

export default BranchCard