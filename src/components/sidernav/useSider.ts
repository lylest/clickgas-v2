import {
    TbLine,
} from "react-icons/tb";
import {LuShirt, LuUsers,} from "react-icons/lu";

import {
    LucideCircleDollarSign, LucideCpu, LucideLayoutDashboard,
    LucideSettings, LucideShoppingBag,
    LucideStore
} from "lucide-react";


export const useSider = () => {
    const menuList = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LucideLayoutDashboard,
            pattern: new RegExp("^/dashboard"),
        },
        {
            name: 'Suppliers',
            path: "/suppliers",
            icon: LucideStore,
            pattern: new RegExp("^/suppliers/*"),
        },
        {
            name: 'Customers',
            path: "/customers",
            icon: LuUsers,
            pattern: new RegExp("^/customers/*"),
        },
        {
            name: "line",
            path: "/line",
            icon: TbLine,
            pattern: new RegExp("^/line"),
        },
        {
            name: 'Devices',
            path: "/devices",
            icon: LucideCpu,
            pattern: new RegExp("^/devices/*"),
        },
        {
            name: 'Items',
            path: "/items",
            icon: LuShirt,
            pattern: new RegExp("^/items/*"),
        },
        {
            name: 'Orders',
            path: "/orders",
            icon: LucideShoppingBag,
            pattern: new RegExp("^/orders/*"),
        },
        {
            name: "line",
            path: "/line",
            icon: TbLine,
            pattern: new RegExp("^/line"),
        },
        {
            name: 'Sales',
            path: "/sales",
            icon: LucideCircleDollarSign,
            pattern: new RegExp("^/sales/*"),
        },
        {
            name: 'Settings',
            path: "/settings",
            icon: LucideSettings,
            pattern: new RegExp("^/settings/*"),
        },
    ]

    return {
        menuList
    }
}
