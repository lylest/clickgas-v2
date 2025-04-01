import {Route, Routes} from "react-router-dom";
import Permissions from "@/pages/settings/tabs/permissions/permissions.tsx";
import PermissionForm from "@/pages/settings/tabs/permissions/form/permission-form.tsx";

const PermissionRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Permissions  />}>
                <Route path={"form/:action"} element={<PermissionForm />} />
            </Route>
        </Routes>
    )
}

export default PermissionRoutes;