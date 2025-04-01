import {Route, Routes} from "react-router-dom";
import Orders from "@/pages/orders/orders.tsx";
import OrderDetails from "@/pages/orders/details/order-details.tsx";
import PaymentForm from "@/pages/orders/forms/payment-form.tsx";
import OrderPayments from "@/pages/orders/details/order-payments.tsx";

const OrderRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Orders/>}>
            </Route>
            <Route path={"details/:orderId"} element={<OrderDetails/>}>
                <Route path={"payment-form"} element={<PaymentForm/>}/>
                <Route path={"payments"} element={<OrderPayments/>}/>
            </Route>
        </Routes>
    )
}
export default OrderRoutes