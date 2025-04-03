

import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";
import {IAction} from "@/types/permission";
import checkPermission from "@/pages/permissions-manager/check-permission.ts";

export function useFilterActionsByPermission<T>(
    actions: IAction<T>[],
): IAction<T>[] {
    const { state } = useGlobalContextHook();
    const user = state.currentUser;
    const userPermissions = user?.permissions ?? [];
    return actions.filter((action) => {
        return checkPermission(action.permission, userPermissions ?? []);
    });
}
