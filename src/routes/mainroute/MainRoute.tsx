import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements, Navigate
} from "react-router-dom";

import MainLayout from "@/layout/MainLayout.tsx";
import ErrorPage from "@/components/ui/ErrorPage.tsx";
import {VscBracketError, VscRefresh} from "react-icons/vsc";
import NotFound from "@/components/general/NotFound.tsx";
import DashboardRoutes from "@/pages/dashboard/routes/dashboard-routes.tsx";
import CustomerRoutes from "@/pages/customers/routes/customer-routes.tsx";
import SupplierRoutes from "@/pages/suppliers/routes/supplier-routes.tsx";
import DeviceRoutes from "@/pages/devices/routes/device-routes.tsx";
import OrderRoutes from "@/pages/orders/routes/order-routes.tsx";
import PaymentRoutes from "@/pages/payments/routes/payment-routes.tsx";
import PriceRoutes from "@/pages/prices/routes/price-routes.tsx";
import SettingRoutes from "@/pages/settings/routes/setting-routes.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout/>} errorElement={<ErrorPage
            buttonLabel={"Retry"}
            onClick={() => window.location.reload()}
            subText={"Page Rendering Failed. Please refresh the page or try again later. If the issue persists, contact support."}
            text={"Error loading data"}
            ButtonIcon={VscRefresh}
            Icon={VscBracketError}
        />}>

            <Route path={"/"} element={<Navigate to={"dashboard"}/>}/>
            <Route path={"dashboard"} element={<DashboardRoutes/>}/>
            <Route path={"customers/*"} element={<CustomerRoutes/>}/>
            <Route path={"suppliers/*"} element={<SupplierRoutes/>}/>
            <Route path={"devices/*"} element={<DeviceRoutes/>}/>
            <Route path={"orders/*"} element={<OrderRoutes/>}/>
            <Route path={"payments/*"} element={<PaymentRoutes/>}/>
            <Route path={"prices/*"} element={<PriceRoutes/>}/>
            <Route path={"settings/*"} element={<SettingRoutes />} />
            <Route path="*" element={<NotFound/>}/>
        </Route>
    )
)

const MainRoute = () => {
    return (<RouterProvider router={router}/>)
}

export default MainRoute
