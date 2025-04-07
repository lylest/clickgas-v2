import {Navigate, Route, Routes} from "react-router-dom";
import MoreSupplierDetails from "@/pages/suppliers/details/more-supplier-details.tsx";
import DeviceTabRoutes from "@/pages/suppliers/details/tabs/devices-tab/routes/device-tab-routes.tsx";
import SupplierCustomersRoutes
    from "@/pages/suppliers/details/tabs/supplier-customers/routes/supplier-customers-routes.tsx";

const SupplierDetailsRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<MoreSupplierDetails />}>
                <Route index element={<Navigate to={"devices"}/>}/>
                <Route path={"devices/*"} element={<DeviceTabRoutes />}/>
                <Route path={"customers/*"} element={<SupplierCustomersRoutes />}/>
            </Route>
        </Routes>
    )
}

export default SupplierDetailsRoutes