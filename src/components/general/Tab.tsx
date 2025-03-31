import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import React, {ElementType, FC} from "react";
import SkeletonLoader from "@/components/general/SkeletonLoader.tsx";


export interface ITabLink {
    activeClassName?: string;
    count?: number;
    name: string;
    icon?:ElementType;
    onClick?:() => void;
    pattern: RegExp;
    url: string;
}

const TabLinks: FC<{
    tabs: ITabLink[];
    activeClassName?: string;
    wrapperClassName?: string;
    loading?: boolean;
}> = ({
    tabs,
    activeClassName,

    wrapperClassName,
    loading,
}) => {
    if (loading) return <TabLoading totalTabs={tabs.length} />;
    return (
        <div
            className={twMerge("border-b-[1px] dark:border-neutral-700  w-full  relative text-[14.5px]", wrapperClassName)}
            tabIndex={1}
        >
            <div
                className={
                    "absolute bottom-0  inset-0  pointer-events-none"
                }
            ></div>
            {tabs.map((tab) => (
                <TabLink key={tab.name} tab={{ ...tab, activeClassName }} />
            ))}
        </div>
    );
};

export default TabLinks;

const TabLink: React.FC<{ tab: ITabLink }> = ({ tab }) => {
    const { pathname } = useLocation();
    const isActive = tab.pattern.test(pathname);

    const handleClick = () => {
        tab.onClick && tab.onClick();
    };
    return (
        <Link
            className={`pb-3 pt-2  ml-3 inline-flex text-sm  dark:text-neutral-300 cursor-pointer bg-transparent  space-x-2 relative px-5   ${
                isActive
                    ? twMerge(
                          "text-sm text-primary dark:text-primary-500 transition border-b-[2px] border-primary custom-transition",
                          tab.activeClassName,
                      )
                    : "text-gray-700"
            } `}
            onClick={handleClick}
            key={tab.name}
            to={tab.url}
        >
            { tab.icon && <tab.icon size={20}/>}
            <p>{tab.name}</p>
        </Link>
    );
};

const TabLoading: FC<{ totalTabs: number }> = ({ totalTabs }) => {
    return (
        <div className={"flex items-center space-x-7 border-b pb-4"}>
            {[...Array(totalTabs)].map((_, index) => (
                <SkeletonLoader key={index} className={"w-32 py-1.5"} />
            ))}
        </div>
    );
};
