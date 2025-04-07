import {Route, Routes} from "react-router-dom";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import SupplierCustomers from "@/pages/suppliers/details/tabs/supplier-customers/supplier-customers.tsx";
import CustomerDetails from "@/pages/customers/details/customer-details.tsx";

const SupplierCustomersRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.UPDATE_SUPPLIER}>
                    <SupplierCustomers />
                </Can>
            }>
                <Route path={"/details/:customerId"} element={
                    <Can permission={permissions.GET_CUSTOMER_DETAILS}>
                        <CustomerDetails />
                    </Can>
                }>
                </Route>
            </Route>
        </Routes>
    )
}
export default SupplierCustomersRoutes