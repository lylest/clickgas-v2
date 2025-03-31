import {TbSearch, TbSettings, TbUser} from "react-icons/tb";
import {useState} from "react";
import Avatar from "@/components/avatar";
import {DEFAULT_IMG} from "@/utils";
import {Link} from "react-router-dom";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import FullDivider from "@/components/divider/FullDivider.tsx";
import MenuIcon from "@/components/menuitem/MenuIcon.tsx";
import {useAppHook} from "@/app/useAppHook.tsx";



const PageBar =()=> {
    const [keyword, setKeyword] = useState<string>("");
    const {  isDarkMode,  switchTheme } = useAppHook()


    return (
        <div className="hidden lg:flex w-full  border-b-[1px] border-gray-200 dark:border-neutral-800 justify-between bg-white dark:bg-neutral-800 h-14 px-6 py-3 ">
         <div></div>
            <div
                className="w-[32rem] hidden  items-center h-8 bg-gray-50 dark:bg-neutral-800 border border-gray-200 rounded-lg dark:border-neutral-600 px-4 py-2">
                <TbSearch className="text-gray-400  dark:text-neutral-400 mr-2" size={20}/>
                <input type="text" placeholder="Search for anything here" value={keyword}
                       onChange={(e) => setKeyword((e.target.value))}
                       className="text-neutral-800 text-sm py-1 dark:text-neutral-100 flex-grow outline-none focus:outline-none bg-inherit"/>
            </div>

            <div className="flex">
                <div className="flex gap-2 space-y-0">
                    <div className="border-t sm:border-t-0 sm:border-s border-gray-200 dark:border-neutral-700"></div>
                    <Popover>
                        <PopoverTrigger>
                            <div className={""}>
                                <Avatar imageUrl={DEFAULT_IMG} className={"size-8"}/>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className={"w-[15rem] dark:bg-neutral-800 mr-4 rounded-xl"}>
                            <div className={"px-4 space-y-2  py-4"}>
                                <div className="flex gap-2 w-full">
                                    <div className={""}>
                                        <Avatar imageUrl={DEFAULT_IMG}/>
                                    </div>

                                    <div className="w-7/12">
                                        <p className="text-sm font-medium  text-slate-600 dark:text-neutral-100">{"Fake user"}</p>
                                        <p className="text-xs font-normal text-slate-500 dark:text-neutral-400 ">{"Fake user"}</p>
                                    </div>
                                </div>
                            </div>
                            <FullDivider/>
                            <div className={"px-2 py-4"}>
                                <Link to={"/settings/account"}>
                                    <MenuIcon className={"px-2"} label={"My account"} Icon={TbUser}/>
                                </Link>
                                <Link to={"/settings"}>
                                    <MenuIcon className={"px-2"} label={"Settings"} Icon={TbSettings}/>
                                </Link>
                            </div>
                            <FullDivider/>

                            <label className="flex justify-between px-4 items-center cursor-pointer py-3">
                                <span className="font-normal text-sm text-slate-600 dark:text-neutral-300">Dark mode</span>
                                <input onChange={() => switchTheme()} type="checkbox" checked={isDarkMode} value=""
                                       className="sr-only peer"/>
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>

                            <FullDivider/>
                            <div className={"px-2 py-4"}>
                                <MenuIcon onClick={() => { console.log("hello")}} className={"px-2"} label={"Logout"}/>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default PageBar;
