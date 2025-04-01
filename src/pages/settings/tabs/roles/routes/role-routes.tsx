import {Route, Routes} from "react-router-dom";
import Roles from "@/pages/settings/tabs/roles/roles.tsx";
import RoleForm from "@/pages/settings/tabs/roles/forms/role-form.tsx";
import RoleDetails from "@/pages/settings/tabs/roles/details/role-details.tsx";
import AddPermissionForm from "@/pages/settings/tabs/roles/forms/add-permission.tsx";

const RoleRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Roles />}>
                <Route path={"form/:action"} element={<RoleForm />} />
                <Route path={"details/:roleId"} element={<RoleDetails />} >
                    <Route path={"add-permission"} element={<AddPermissionForm />} />
                </Route>
            </Route>
        </Routes>
    )
}
export  default RoleRoutes