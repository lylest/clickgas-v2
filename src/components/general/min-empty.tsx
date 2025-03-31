import {FC} from "react";
import {TbMoodEmpty} from "react-icons/tb";

interface Props {
    title:string
}
const MinEmpty:FC<Props> =({ title })=> {
     return (
         <div className={"w-full grid place-items-center"}>
              <TbMoodEmpty className={"text-gray-500 text-xl"} />
             <h1 className={"text-lg text-gray-600 dark:text-neutral-400"}>{title}</h1>
         </div>
     )
}

export  default MinEmpty