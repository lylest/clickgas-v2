
import {Route, Routes} from "react-router-dom";
import Suppliers from "@/pages/suppliers/suppliers.tsx";
import SupplierDetails from "@/pages/suppliers/details/supplier-details.tsx";
import SupplierFormRoutes from "@/pages/suppliers/routes/supplier-form-routes.tsx";

const SupplierRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Suppliers />}>
                <Route path={"form/:action/*"} element={<SupplierFormRoutes />} />
                <Route path={"/details/:supplierId"} element={<SupplierDetails />} >
                </Route>
            </Route>
        </Routes>
    )
}
export  default SupplierRoutes