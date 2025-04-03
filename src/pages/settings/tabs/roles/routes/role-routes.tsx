import {Route, Routes} from "react-router-dom";
import Roles from "@/pages/settings/tabs/roles/roles.tsx";
import RoleForm from "@/pages/settings/tabs/roles/forms/role-form.tsx";
import RoleDetails from "@/pages/settings/tabs/roles/details/role-details.tsx";
import AddPermissionForm from "@/pages/settings/tabs/roles/forms/add-permission.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const RoleRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_ROLES}>
                    <Roles/>
                </Can>
            }>
                <Route path={"form/:action"} element={
                    <Can permission={permissions.ADD_ROLE}>
                        <RoleForm/>
                    </Can>
                }/>
                <Route path={"details/:roleId"} element={
                    <Can permission={permissions.GET_ROLE_DETAILS}>
                        <RoleDetails/>
                    </Can>
                }>
                    <Route path={"add-permission"} element={
                        <Can permission={permissions.GET_PERMISSIONS}>
                            <AddPermissionForm/>
                        </Can>
                    }/>
                </Route>
            </Route>
        </Routes>
    )
}
export default RoleRoutes