import {FC} from "react";
import { TbPencil, TbTrash} from "react-icons/tb";
import Badge from "@/components/general/Badge.tsx";

interface IPermissionCard {
    title: string
    subtitle: string
    severity: string
    onClick:() => void
}


const PermissionCard: FC<IPermissionCard> = ({title, subtitle, severity, onClick}) => {

    function getSeverity(httpMethod: string):  "primary" | "secondary" | "info" | "warning" | "error" | "success" | "pink" | "purple" {
        switch (httpMethod) {
            case "GET":
                return "info";

            case "POST":
                return "success"

            case "PUT":
                return "purple"

            case "DELETE":
                return "error";

            default:
                return "info";
        }
    }

    return (
        <div className={"flex gap-1 space-y-0"}>
            <div
                className={"w-[60px]  h-[42px] mt-2  border-[0px]  border-gray-100  rounded-md"}>
                <Badge className={"rounded-md ring-0"} label={severity} type={getSeverity(severity)}/>
            </div>
            <div className={"-space-y-1"}>
                <p className={"text-neutral-800 dark:text-neutral-200 font-medium"}>{title}</p>
                <p className={"text-gray-600 dark:text-gray-400 text-sm"}>{subtitle}</p>
            </div>

            <div className={"ml-auto flex gap-1  items-center"}>
                <button
                    className="white-button shadow-none border-gray-50 ml-auto px-2 py-2 text-gray-400 dark:border-neutral-600">
                    <TbPencil size={18}/>
                </button>
                <button onClick={()=> onClick()}
                    className="white-button shadow-none border-gray-50 ml-auto px-2 py-2 text-gray-400 dark:border-neutral-600">
                    <TbTrash size={18}/>
                </button>
            </div>
        </div>
    )
}

export default PermissionCard;