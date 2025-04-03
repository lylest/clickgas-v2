import {Navigate, Route, Routes} from "react-router-dom";
import Account from "@/pages/settings/tabs/account/account.tsx";
import Settings from "@/pages/settings/settings.tsx";
import PermissionRoutes from "@/pages/settings/tabs/permissions/routes/permission-routes.tsx";
import RoleRoutes from "@/pages/settings/tabs/roles/routes/role-routes.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const SettingRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Settings/>}>
                <Route index element={<Navigate to={"account"}/>}/>
                <Route path={"account/*"} element={<Account/>}/>
                <Route path={"roles/*"} element={
                    <Can permission={permissions.GET_ROLES}>
                        <RoleRoutes/>
                    </Can>
                }/>
                <Route path={"permissions/*"} element={
                    <Can permission={permissions.GET_PERMISSIONS}>
                        <PermissionRoutes/>
                    </Can>
                }/>
            </Route>
        </Routes>
    )
}

export default SettingRoutes