import {Navigate, Route, Routes} from "react-router-dom";
import Account from "@/pages/settings/tabs/account/account.tsx";
import Settings from "@/pages/settings/settings.tsx";
import PermissionRoutes from "@/pages/settings/tabs/permissions/routes/permission-routes.tsx";
import RoleRoutes from "@/pages/settings/tabs/roles/routes/role-routes.tsx";

const SettingRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Settings />}>
                <Route index element={<Navigate to={"account"}/>}/>
                <Route path={"account/*"} element={<Account />} />
                <Route path={"roles/*"} element={<RoleRoutes />} />
                <Route path={"permissions/*"} element={<PermissionRoutes />} />
            </Route>
        </Routes>
    )
}

export default SettingRoutes