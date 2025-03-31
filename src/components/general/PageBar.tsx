import {FC} from "react";
import Badge from "@/components/general/Badge.tsx";

export interface  IPageBar {
     title: string
}

const PageBar:FC<IPageBar> =()=> {
    return (
        <div className={"w-full flex bg-white  justify-between items-center h-20 border-b-[1px] border-slate-200"}>
            <div className={"flex items-center"}>
                <p aria-label="Campaigns-page" className={"font-medium text-xl text-slate-800 p-4"}>Campaigns</p>
                <Badge label={"12 created"} type="primary"/>
            </div>
            <div className={"flex gap-4 mt-0"}>
                <p className={"font-medium text-md text-slate-800 pt-1"}>John doe</p>
                <img className={"size-8 rounded-full  mr-6 mt-0"} src={"https://picsum.photos/200"} alt={"profile image"} loading={"lazy"} />
            </div>
        </div>
    )
}
export  default PageBar