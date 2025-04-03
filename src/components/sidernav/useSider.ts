import {
    TbLine,
} from "react-icons/tb";
import { LuUsers,} from "react-icons/lu";

import {
    LucideCircleDollarSign, LucideCpu, LucideFileSliders, LucideLayoutDashboard,
    LucideSettings, LucideShoppingBag,
    LucideStore
} from "lucide-react";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import {useFilteredMenus} from "@/pages/permissions-manager/filter-menu.ts";


export const useSider = () => {
    const menuList = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LucideLayoutDashboard,
            pattern: new RegExp("^/dashboard"),
            permission:permissions.GET_ORDERS,
        },
        {
            name: 'Suppliers',
            path: "/suppliers",
            icon: LucideStore,
            pattern: new RegExp("^/suppliers/*"),
            permission:permissions.LIST_SUPPLIERS,
        },
        {
            name: 'Customers',
            path: "/customers",
            icon: LuUsers,
            pattern: new RegExp("^/customers/*"),
            permission:permissions.GET_CUSTOMERS,
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
            permission:permissions.GET_DEVICES,
        },
        {
            name: 'Orders',
            path: "/orders",
            icon: LucideShoppingBag,
            pattern: new RegExp("^/orders/*"),
            permission:permissions.GET_ORDERS,
        },
        {
            name: 'Payments',
            path: "/payments",
            icon: LucideCircleDollarSign,
            pattern: new RegExp("^/payments/*"),
            permission:permissions.GET_PAYMENTS,
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
            permission:permissions.GET_PAYMENTS,
        },
        {
            name: 'Settings',
            path: "/settings",
            icon: LucideSettings,
            pattern: new RegExp("^/settings/*"),
            permission: permissions.GET_ORDERS
        },
    ]

    const filteredMenuList = useFilteredMenus(menuList);
    return {
        filteredMenuList
    }
}
