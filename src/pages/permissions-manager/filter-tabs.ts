import checkPermission from "@/pages/permissions-manager/check-permission.ts";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";
import {ITabLink} from "@/components/general/Tab.tsx";


export function useFilteredTabs(tabs: ITabLink[]): ITabLink[] {
    const { state } = useGlobalContextHook();
    const user = state.currentUser;
    const userPermissions = user?.permissions ?? [];

    return tabs.filter((tab) =>
        tab.permission ? checkPermission(tab.permission, userPermissions) : true // Keep tabs without permissions
    );
}
