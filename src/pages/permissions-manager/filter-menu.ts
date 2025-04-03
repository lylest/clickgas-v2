import checkPermission from "@/pages/permissions-manager/check-permission.ts";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";


export function useFilteredMenus<T extends { permission?: string }>(menus: T[]): T[] {
    const { state } = useGlobalContextHook();
    const user = state.currentUser;
    const userPermissions = user?.permissions ?? [];

    return menus.filter((menu) =>
        menu.permission ? checkPermission(menu.permission, userPermissions) : true
    );
}
