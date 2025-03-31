import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useGlobalContextHook } from "@/hook/useGlobalContextHook.tsx";
import FullDivider from "@/components/divider/FullDivider.tsx";
import MenuItem from "../menuitem/MenuItem.tsx";
import logo from "../../assets/logo.svg";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {useSider} from "@/components/sidernav/useSider.ts";


const SiderNav = () => {
    const navigate = useNavigate();
    const { menuList } = useSider();
    const { dispatch, state } = useGlobalContextHook();
    const { isSideNavClosed } = state;
    return (
        <aside
            className={cn(
                "fixed top-0 left-0 h-screen z-20 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-900/80 transition-all duration-300 ease-in-out",
                isSideNavClosed ? "w-20 px-2" : "w-64 px-5"
            )}
        >
            {/* Logo and brand */}
            <div className="h-16 flex items-center justify-between my-2">
                <div className="flex items-center gap-3 overflow-hidden">
                    <img src={logo} alt="Drywave logo" className="h-10 w-10 min-w-10" />
                    {!isSideNavClosed && (
                        <h1 className="font-bold text-xl tracking-tight truncate">Click gas</h1>
                    )}
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => dispatch({ type: "TOGGLE_SIDE_NAV", payload: !isSideNavClosed })}
                                className="flex items-center justify-center size-8 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                                aria-label={isSideNavClosed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                {isSideNavClosed ? <TbChevronRight size={18} /> : <TbChevronLeft size={18} />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {isSideNavClosed ? "Expand sidebar" : "Collapse sidebar"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Menu items */}
            <ScrollArea className="h-[calc(100vh-5rem)] pr-3">
                <nav className="flex flex-col gap-1 py-4">
                    {menuList.map((item, index:number) => {
                        if (item.name === "line") {
                            return <FullDivider key={`divider-${index}`} className="my-2 bg-gray-200/50" />;
                        }
                        return (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <MenuItem
                                                onClick={() => navigate(item.path)}
                                                pattern={item.pattern}
                                                label={item.name}
                                                Icon={item.icon}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    {isSideNavClosed && (
                                        <TooltipContent side="right">
                                            {item.name}
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </nav>
            </ScrollArea>

        </aside>
    );
};

export default SiderNav;