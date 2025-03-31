import {Route, Routes} from "react-router-dom";
import Dashboard from "@/pages/dashboard/dashboard.tsx";

const DashboardRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Dashboard />}>
            </Route>
        </Routes>
    )
}
export  default DashboardRoutes