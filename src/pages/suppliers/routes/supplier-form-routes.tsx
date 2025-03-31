import {Navigate, Route, Routes} from "react-router-dom";
import SupplierForm from "@/pages/suppliers/form/supplier-form.tsx";
import SupplierBasicDetails from "@/pages/suppliers/form/steps/supplier-basic-details.tsx";
import SupplierLocationDetails from "@/pages/suppliers/form/steps/supplier-location-details.tsx";
import SupplierIDDetails from "@/pages/suppliers/form/steps/supplier_id_details.tsx";

const SupplierFormRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<SupplierForm/>}>
                <Route index element={<Navigate to={"basic-supplier-details"}/>}/>
                <Route path={"basic-supplier-details"} element={<SupplierBasicDetails/>}/>
                <Route path={"supplier-location-details"} element={<SupplierLocationDetails/>}/>
                <Route path={"supplier-id-details"} element={<SupplierIDDetails />}/>
            </Route>
        </Routes>
    )
}

export default SupplierFormRoutes