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
            <Route path={"customers/*"} element={<CustomerRoutes />} />
            <Route path="*" element={<NotFound/>}/>
        </Route>
    )
)

const MainRoute = () => {
    return (<RouterProvider router={router}/>)
}

export default MainRoute
