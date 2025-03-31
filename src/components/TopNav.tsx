import {FC, useState} from "react";
import logo from "../assets/logo.svg";
import { Drawer } from 'vaul';
import { TbMenu} from "react-icons/tb";
import BottomsheetNav from "./bottomsheet-nav/bottomsheet-nav";


export interface  ITopNav {
     title?:string
}

const TopNav:FC<ITopNav> =()=> {
    const [ open, setOpen ] = useState(false)

    return (
        <>
            <div
                className={"lg:hidden w-full flex  bg-white border-b-[1px] border-gray-200  dark:bg-neutral-800 dark:border-neutral-800   justify-center items-center absolute top-0"}>
                <div className={"flex gap-2 px-4 py-4"}>
                    <img src={logo} alt={"brand-logo"} className={"h-8 w-8"}/>
                    <div className={"hidden lg:block -mt-[6px]"}>
                        <h1 className={"font-bold text-xl text-primary"}>Huduma<span
                            className={"text-sm text-yellow-500"}>SMS</span></h1>
                        <p className={"text-[9px] tracking-[5.5px] dark:text-gray-400"}>TUMEKUFIKIA</p>
                    </div>
                </div>
                <div className={"ml-auto mr-2"}>
                    <button type="button" onClick={() => setOpen(true)}
                            className="lg:hidden dark:hover:bg-neutral-700  -mt-1 flex flex-shrink-0 justify-center items-center gap-2 size-[46px] text-sm font-semibold rounded-full border border-gray-50/10 dark:border-neutral-50/0  text-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        <TbMenu size={25}
                                color={localStorage.theme === 'dark' || (!('theme' in localStorage)) ? "#666" : "#666"}/>
                    </button>

                    <Drawer.Root shouldScaleBackground direction={"bottom"} open={open}>
                        <Drawer.Trigger asChild>
                        </Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay className="fixed inset-0 bg-black/40 "/>
                            <Drawer.Content style={{ zIndex: 999999999 }}
                                className="flex flex-col   h-[90vh]  fixed bottom-0 left-0 right-0">
                                <BottomsheetNav onClick={() => setOpen(false)}/>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>
            </div>
        </>
    )
}


export default TopNav
