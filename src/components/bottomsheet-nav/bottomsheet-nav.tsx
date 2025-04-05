import logo from "../../assets/logo.svg"
import {RxCross1} from "react-icons/rx";
import {FC} from "react";
import {ScrollArea} from "../ui/scroll-area";
import MenuItem from "../menuitem/MenuItem";
import {useSider} from "../sidernav/useSider";
import { useNavigate} from "react-router-dom";
import FullDivider from "@/components/divider/FullDivider.tsx";
import Avatar from "@/components/avatar";
import {DEFAULT_IMG} from "@/utils";
import MenuIcon from "@/components/menuitem/MenuIcon.tsx";
import { TbSettings, TbUser} from "react-icons/tb";
import {useTheme} from "@/app/useTheme.ts";

interface ISheet {
    onClick: () => void
}

const BottomsheetNav: FC<ISheet> = ({onClick}) => {
    const {  filteredMenuList:menuList} = useSider()
    const navigate = useNavigate()
    const {  isDarkMode, toggleTheme } = useTheme()

    return (
        <div style={{ zIndex: 999999999 }}
            className={"px-6 py-3 h-screen w-[95%] ml-[2%] space-y-8 bg-neutral-50 dark:bg-neutral-800 rounded-tl-2xl  rounded-tr-2xl"}>
            <div className={"flex gap-2 px-1 py-4"}>
                <img src={logo} alt={"brand-logo"} className={"h-8 w-8"}/>
                <div className={"-mt-[6px]"}>
                    <h1 className={"font-bold text-xl text-primary"}>Huduma<span
                        className={"text-sm text-yellow-500"}>SMS</span></h1>
                    <p className={"text-[9px] tracking-[5.5px] dark:text-gray-400"}>TUMEKUFIKIA</p>
                </div>
                <div className={"ml-auto "}>
                    <button type="button" onClick={() => onClick()}
                            className="lg:hidden flex flex-shrink-0 justify-center items-center gap-2 size-[46px] dark:hover:bg-neutral-700 text-sm font-semibold rounded-full border border-gray-50/10  text-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        <RxCross1 size={25}
                                  color={localStorage.theme === 'dark' || (!('theme' in localStorage)) ? "#666" : "#666"}/>
                    </button>
                </div>
            </div>

            <div className={""}>
                <ScrollArea style={{height: "70vh"}}>
                    {
                        menuList.map((item, index) => (
                            <MenuItem onClick={() => {
                                navigate(item.path);
                                onClick()
                            }} pattern={item.pattern} key={index}
                                      label={item.name} Icon={item.icon}/>
                        ))
                    }

                    <FullDivider className={"mt-4"}/>
                    <div className={"px-4 space-y-2  py-4"}>
                        <div className="flex gap-2 w-full">
                            <div className={""}  onClick={() => {
                                navigate("/settings/account");
                                onClick()
                            }}>
                                <Avatar  imageUrl={DEFAULT_IMG}/>
                            </div>

                            <div className="w-7/12">
                                <p className="text-sm font-medium  text-slate-600 dark:text-neutral-100">{"Fake user"}</p>
                                <p className="text-xs font-normal text-slate-500 dark:text-neutral-400 ">{"fake@gmail.com"}</p>
                            </div>
                        </div>
                    </div>
                    <FullDivider/>
                    <div className={"px-2 py-4"}>
                            <MenuIcon onClick={() => {
                                navigate("/settings/account");
                                onClick()
                            }} className={"px-2"} label={"My account"} Icon={TbUser}/>
                            <MenuIcon onClick={() => {
                                navigate("/settings/account");
                                onClick()
                            }} className={"px-2"} label={"Settings"} Icon={TbSettings}/>
                    </div>
                    <FullDivider />

                    <label className="flex justify-between px-4 items-center cursor-pointer py-3">
                        <span className="font-normal text-sm text-slate-600 dark:text-neutral-300">Dark mode</span>
                        <input onChange={() => toggleTheme()} type="checkbox" checked={isDarkMode} value=""
                               className="sr-only peer"/>
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </ScrollArea>
            </div>
        </div>
    )
}

export default BottomsheetNav;
