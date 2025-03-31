import {Route, Routes} from "react-router-dom";
import Customer from "@/pages/customers/customer.tsx";
import CustomerForm from "@/pages/customers/forms/customer-form.tsx";
import CustomerDetails from "@/pages/customers/details/customer-details.tsx";

const CustomerRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Customer />}>
                <Route path={"form/:action"} element={<CustomerForm />} />
                <Route path={"details/:customerId"} element={<CustomerDetails />} />
            </Route>
        </Routes>
    )
}
export  default CustomerRoutes