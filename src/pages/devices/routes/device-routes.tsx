import {Route, Routes} from "react-router-dom";
import Devices from "@/pages/devices/devices.tsx";
import DeviceForm from "@/pages/devices/forms/device-form.tsx";
import DeviceDetails from "@/pages/devices/details/device-details.tsx";

const CustomerRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Devices />}>
                <Route path={"form/:action"} element={<DeviceForm />} />
                <Route path={"details/:customerId"} element={<DeviceDetails />} />
            </Route>
        </Routes>
    )
}
export  default CustomerRoutes