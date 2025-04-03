import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconedMenu from "@/components/menuitem/IconedMenu.tsx";
import { useGlobalContextHook } from "@/hook/useGlobalContextHook.tsx";
import { useSider } from "./useSider.ts";
import logo from "../../assets/logo.svg";
import FullDivider from "@/components/divider/FullDivider.tsx";

const MinSideNav = () => {
    const navigate = useNavigate();
    const { filteredMenuList:menuList } = useSider();
    const { dispatch } = useGlobalContextHook();


    return (
        <aside className="fixed top-0 left-0 w-16 h-screen bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-900/80 flex flex-col py-4 z-20">
            {/* Logo area */}
            <div className="flex justify-center mb-6">
                <img
                    src={logo}
                    alt="Brand logo"
                    className="h-8 w-8 transition-transform hover:scale-105"
                />
            </div>

            {/* Menu items */}
            <ScrollArea className="flex-1 px-2">
                <div className="flex flex-col items-center gap-1">
                    {menuList.map((item, index) => {
                        if (item.name === "line") {
                            return <FullDivider key={`divider-${index}`} className="my-2 w-8 bg-gray-200/50" />
                        }
                        return (
                            <TooltipProvider key={index} delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-full">
                                            <IconedMenu
                                                label={item.name}
                                                onClick={() => navigate(item.path)}
                                                pattern={item.pattern}
                                                Icon={item.icon}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        {item.name}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Bottom controls */}
            <div className="mt-auto px-2">
                <FullDivider className="mb-4 mx-auto w-10" />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                <IconedMenu
                                    label="Expand menu"
                                    Icon={TbLayoutSidebarLeftExpand}
                                    onClick={() => dispatch({ type: "TOGGLE_SIDE_NAV", payload: false })}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Expand menu
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </aside>
    );
};

export default MinSideNav;