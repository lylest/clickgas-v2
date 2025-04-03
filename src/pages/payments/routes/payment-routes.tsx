import {Route, Routes} from "react-router-dom";
import Payments from "@/pages/payments/payments.tsx";
import PaymentDetails from "@/pages/payments/details/payment-details.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const PaymentRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_PAYMENTS}>
                    <Payments/>
                </Can>
            }>
                <Route path={"details/:paymentId"} element={
                    <Can permission={permissions.GET_PAYMENT_DETAILS}>
                        <PaymentDetails/>
                    </Can>
                }/>
            </Route>
        </Routes>
    )
}
export default PaymentRoutes
