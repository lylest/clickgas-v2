import {Route, Routes} from "react-router-dom";
import Customer from "@/pages/customers/customer.tsx";
import CustomerForm from "@/pages/customers/forms/customer-form.tsx";
import CustomerDetails from "@/pages/customers/details/customer-details.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import MoreCustomerDetailsRoutes from "@/pages/customers/routes/more-customer-details-routes.tsx";

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_CUSTOMERS}>
                    <Customer/>
                </Can>
            }>

                <Route path={"form/:action"} element={
                    <Can permission={permissions.SIGN_UP_CUSTOMER}>
                        <CustomerForm/>
                    </Can>
                }/>

                <Route path={"details/:customerId"} element={
                    <Can permission={permissions.GET_CUSTOMER_DETAILS}>
                        <CustomerDetails/>
                    </Can>
                }/>
            </Route>

            <Route path={"/more-details/:customerId/*"} element={
                <Can permission={permissions.GET_CUSTOMER_DETAILS}>
                    <MoreCustomerDetailsRoutes />
                </Can>
            }/>
        </Routes>
    )
}
export default CustomerRoutes