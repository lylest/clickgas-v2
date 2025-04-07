import {Navigate, Route, Routes} from "react-router-dom";
import MoreCustomerDetails from "@/pages/customers/details/more-customer-details/more-customer-details.tsx";
import CustomerDeviceRoutes
    from "@/pages/customers/details/more-customer-details/tabs/customer-devices/customer-devices-routes/customer-devices-routes.tsx";
import CustomerOrders from "@/pages/customers/details/more-customer-details/tabs/customer-orders/customer-orders.tsx";

const MoreCustomerDetailsRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<MoreCustomerDetails />}>
                <Route index element={<Navigate to={"devices"}/>}/>
                <Route path={"devices/*"} element={<CustomerDeviceRoutes />}/>
                <Route path={"orders/*"} element={<CustomerOrders />}/>
            </Route>
        </Routes>
    )
}

export default MoreCustomerDetailsRoutes