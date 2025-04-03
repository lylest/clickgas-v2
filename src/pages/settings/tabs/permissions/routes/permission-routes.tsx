import {Route, Routes} from "react-router-dom";
import Permissions from "@/pages/settings/tabs/permissions/permissions.tsx";
import PermissionForm from "@/pages/settings/tabs/permissions/form/permission-form.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const PermissionRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_PERMISSIONS}>
                    <Permissions/>
                </Can>
            }>
                <Route path={"form/:action"} element={
                    <Can permission={permissions.ADD_PERMISSION}>
                        <PermissionForm/>
                    </Can>
                }/>
            </Route>
        </Routes>
    )
}

export default PermissionRoutes;