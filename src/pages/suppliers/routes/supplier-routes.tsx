import {Route, Routes} from "react-router-dom";
import Suppliers from "@/pages/suppliers/suppliers.tsx";
import SupplierDetails from "@/pages/suppliers/details/supplier-details.tsx";
import SupplierFormRoutes from "@/pages/suppliers/routes/supplier-form-routes.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const SupplierRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.LIST_SUPPLIERS}>
                    <Suppliers/>
                </Can>
            }>
                <Route path={"form/:action/*"} element={
                    <Can permission={permissions.ADD_SUPPLIER}>
                        <SupplierFormRoutes/>
                    </Can>
                }/>
                <Route path={"/details/:supplierId"} element={
                    <Can permission={permissions.SUPPLIER_DETAILS}>
                        <SupplierDetails/>
                    </Can>
                }>
                </Route>
            </Route>
        </Routes>
    )
}
export default SupplierRoutes