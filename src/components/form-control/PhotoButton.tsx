import {FC, ReactElement} from "react";
import {PhotoIcon} from "@heroicons/react/24/outline";
import {FILES_BASE_URL} from "@/utils";
//import {FILES_BASE_URL} from "@/api/requests.ts";

interface  IPhotoButton {
     label?:string
     title:string
     Icon:ReactElement
     file?:string
}


const PhotoButton:FC<IPhotoButton> = (props: IPhotoButton) => {
    const { label, title,  Icon , file} = props
    return (
        <div className={"w-full space-y-3"}>
            <label className={"text-sm items-between leading-6 text-gray-900"}>{label}</label>
            <div className={"flex gap-2 space-x-2 space-y-5"}>
                <div className={"w-[80px] h-[80px] border-[2px] rounded-full border-dashed grid place-items-center"}>

                    { file && file !== "no-file" ?
                        <img src={FILES_BASE_URL+'/'+file} alt={"passport"} className={"object-cover w-[96%] h-[96%] rounded-full"}/> :
                        <PhotoIcon className={"w-[28px] h-[28px] text-gray-300"} strokeWidth={1}/>
                    }
                </div>
                <div>
                    <div
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold ring-inset ring-1 ring-primary-300 rounded-lg border border-transparent bg-primary-100 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none">
                        {Icon}
                        {title}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoButton