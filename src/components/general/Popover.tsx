import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, ReactElement, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

export interface IMenuItem {
    Icon?: ReactElement;
    divider?: boolean;
    description?: string;
    danger?: boolean;
    id?: number;
    name: string;
    onClick: () => void;
}

interface IDropdownMenu {
    menuItems?: IMenuItem[];
    trigger: ReactNode;
    wrapperClass?: string
    children:ReactNode;
}

const Popover: React.FC<IDropdownMenu> = ({ trigger,children, wrapperClass }) => {
    return (
        <Menu as={"div"} className={"relative w-full px-4 "}>
            <Menu.Button onClick={(e) => e.stopPropagation()} className={"w-full"}>
                {trigger}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    as={"ul"}
                    // style={{ bottom: `calc(100% + 5px)` }}
                    style={{
                        position: 'absolute',
                        right: 'calc(100% - 150px)' ,// Position the dropdown above the button
                        top: 'calc(100% - 200px)' // Position the dropdown above the button
                    }}
                    className={twMerge(
                        "py-3 right-1/2 translate-x-1/2 z-50 mt-2  dark:bg-neutral-800  w-fit rounded-xl divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                        wrapperClass
                    )}>
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
export default Popover;
