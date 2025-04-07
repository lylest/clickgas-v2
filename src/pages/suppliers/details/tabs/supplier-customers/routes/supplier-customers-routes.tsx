import {Route, Routes} from "react-router-dom";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import SupplierCustomers from "@/pages/suppliers/details/tabs/supplier-customers/supplier-customers.tsx";
import SupplierCustomerDetails
    from "@/pages/suppliers/details/tabs/supplier-customers/details/supplier-customer-details.tsx";

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
                        <SupplierCustomerDetails />
                    </Can>
                }>
                </Route>
            </Route>
        </Routes>
    )
}
export default SupplierCustomersRoutes