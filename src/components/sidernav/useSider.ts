import {
    TbLine,
} from "react-icons/tb";
import { LuUsers,} from "react-icons/lu";

import {
    LucideCircleDollarSign, LucideCpu, LucideFileSliders, LucideLayoutDashboard,
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
            name: 'Orders',
            path: "/orders",
            icon: LucideShoppingBag,
            pattern: new RegExp("^/orders/*"),
        },
        {
            name: 'Payments',
            path: "/payments",
            icon: LucideCircleDollarSign,
            pattern: new RegExp("^/payments/*"),
        },
        {
            name: "line",
            path: "/line",
            icon: TbLine,
            pattern: new RegExp("^/line"),
        },
        {
            name: 'Prices',
            path: "/prices",
            icon: LucideFileSliders,
            pattern: new RegExp("^/prices/*"),
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
