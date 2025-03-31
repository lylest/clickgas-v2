import {FC, ReactElement} from "react";

export  interface  IChipIcon {
     Icon:ReactElement
}

const ChipIcon:FC<IChipIcon> =({ Icon })=>{
    return (
        <div className={"bg-gray-50 dark:bg-neutral-700  size-8 border-[1px] border-gray-200 dark:border-neutral-600 rounded-md grid place-items-center"}>
            {Icon}
        </div>
    )
}

export  default  ChipIcon