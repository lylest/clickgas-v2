import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import React, { FC } from "react";
import SkeletonLoader from "@/components/general/SkeletonLoader.tsx";


export interface ITabLink {
    activeClassName?: string;
    count?: number;
    name: string;
    onClick?: () => void;
    pattern: RegExp;
    url: string;
}

const SoftTabLinks: FC<{
    tabs: ITabLink[];
    activeClassName?: string;
    wrapperClassName?: string;
    containerClassName?: string;
    loading?: boolean;
}> = ({
          tabs,
          activeClassName,
           containerClassName,
          wrapperClassName,
          loading,
      }) => {
    if (loading) return <TabLoading totalTabs={tabs.length} />;
    return (
        <div className={twMerge("w-full px-2 grid place-items-center", containerClassName)}>
            <div
                className={twMerge("pr-2 py-1  mt-4 bg-gray-200/60 dark:bg-neutral-900 rounded-xl relative text-[14.5px]", wrapperClassName)}
                tabIndex={1}
            >
                <div
                    className={
                        "absolute bottom-0  inset-0  pointer-events-none"
                    }></div>
                {tabs.map((tab) => (
                    <TabLink key={tab.name} tab={{...tab, activeClassName}}/>
                ))}
            </div>
        </div>
    );
};

export default SoftTabLinks;

const TabLink: React.FC<{ tab: ITabLink }> = ({tab}) => {
    const {pathname} = useLocation();
    const isActive = tab.pattern.test(pathname);

    const handleClick = () => {
        tab.onClick && tab.onClick();
    };
    return (
        <Link
            className={`p-[8px] inline-flex text-xs lg:text-sm cursor-pointer rounded-lg  relative px-6 border-b-[0px]  ${
                isActive
                    ? twMerge(
                        "bg-white dark:bg-neutral-600 drop-shadow-sm  text-primary dark:text-neutral-50 transition duration-100 ease-out transform translate-x-1",
                        tab.activeClassName,
                    )
                    : "text-[#080808] dark:text-neutral-400"
            } `}
            onClick={handleClick}
            key={tab.name}
            to={tab.url}
        >
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
