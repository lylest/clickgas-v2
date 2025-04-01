import {Route, Routes} from "react-router-dom";
import Payments from "@/pages/payments/payments.tsx";
import PaymentDetails from "@/pages/payments/details/payment-details.tsx";

const PaymentRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Payments />}>
                <Route path={"details/:paymentId"} element={<PaymentDetails />} />
            </Route>
        </Routes>
    )
}
export  default PaymentRoutes
