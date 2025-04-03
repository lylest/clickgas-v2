import {Route, Routes} from "react-router-dom";
import Orders from "@/pages/orders/orders.tsx";
import OrderDetails from "@/pages/orders/details/order-details.tsx";
import PaymentForm from "@/pages/orders/forms/payment-form.tsx";
import OrderPayments from "@/pages/orders/details/order-payments.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const OrderRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_ORDERS}>
                    <Orders/>
                </Can>
            }/>

            <Route path={"details/:orderId"} element={
                <Can permission={permissions.GET_ORDER_DETAILS}>
                    <OrderDetails/>
                </Can>
            }>

                <Route path={"payment-form"} element={
                    <Can permission={permissions.ADD_PAYMENT}>
                        <PaymentForm/>
                    </Can>
                }/>

                <Route path={"payments"} element={
                    <Can permission={permissions.GET_PAYMENTS}>
                        <OrderPayments/>
                    </Can>
                }/>

            </Route>
        </Routes>
    )
}
export default OrderRoutes