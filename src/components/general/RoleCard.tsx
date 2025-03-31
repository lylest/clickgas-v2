import {FC} from "react";
import {TbDotsVertical, TbEye, TbPencil, TbTrash, TbUserShield} from "react-icons/tb";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Link} from "react-router-dom";
import MenuIcon from "@/components/menuitem/MenuIcon.tsx";
import Divider from "@/components/divider/Divider.tsx";

interface IRole {
    label: string;
    value: string;
    roleId:string
    onClick?: () => void;
}

const RoleCard:FC<IRole> =({ label, onClick, value, roleId })=> {
    return (
        <div className={"flex  justify-between p-4 gap-3 border-b-[1px] border-gray-200 dark:border-neutral-700"}>
            <div className={"flex gap-4"}>
                <div
                    className={"w-[58px] h-[42px]  border-[1px] bg-gray-50 border-gray-200 dark:border-neutral-600 dark:bg-neutral-700 rounded-md grid place-items-center"}>
                    <TbUserShield size={30} className="object-fit text-gray-400"/>
                </div>
                <div className={"-space-y-1"}>
                    <p className={"text-neutral-800 dark:text-neutral-200 font-medium"}>{label}</p>
                    <p className={"text-gray-600 dark:text-gray-400 text-sm"}>{value}</p>
                </div>
            </div>

            <div className={"hidden lg:flex space-x-1 space-y-2"}>
                <p className={"text-xs pt-5 font-medium text-neutral-500"}>PERMISSIONS</p>
                <div className="flex -space-x-3 rtl:space-x-reverse">
                    <div
                        className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-full dark:border-gray-800 bg-gray-300 text-gray-700 dark:text-neutral-700 font-medium">
                        C
                    </div>
                    <div
                        className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-full dark:border-gray-800 bg-gray-300 text-gray-700 dark:text-neutral-700 font-medium">
                        R
                    </div>
                    <div
                        className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-full dark:border-gray-800 bg-gray-300 text-gray-700 dark:text-neutral-700 font-medium">
                        U
                    </div>
                    <div
                        className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-full dark:border-gray-800 bg-gray-300 text-gray-700 dark:text-neutral-700 font-medium">
                        D
                    </div>
                    <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-500 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                       href="#">+9</a>
                </div>
            </div>

            <div className={"mt-2"}>
                <Popover>
                    <PopoverTrigger>{onClick &&

                        <button onClick={() => onClick && onClick()} className="white-button ml-auto text-gray-500">
                            menu <TbDotsVertical size={12}/>
                        </button>}
                    </PopoverTrigger>
                    <PopoverContent className={"w-40 p-1"}>
                        <Link to={`role-details/${roleId}`}><MenuIcon label={"View"} Icon={TbEye}/></Link>
                        <Link to={`role-details/${roleId}`}><MenuIcon label={"Edit"} Icon={TbPencil}/></Link>
                        <Divider />
                        <MenuIcon label={"Delete"} Icon={TbTrash} />
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}

export default RoleCard