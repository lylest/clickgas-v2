import {Route, Routes} from "react-router-dom";
import Devices from "@/pages/devices/devices.tsx";
import DeviceForm from "@/pages/devices/forms/device-form.tsx";
import DeviceDetails from "@/pages/devices/details/device-details.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const DeviceRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_DEVICES}>
                    <Devices/>
                </Can>
            }>
                <Route path={"form/:action"} element={
                    <Can permission={permissions.CREATE_DEVICE} >
                        <DeviceForm/>
                    </Can>}
                />
                <Route path={"details/:deviceId"} element={
                    <Can permission={permissions.GET_DEVICE_DETAILS}>
                        <DeviceDetails/>
                    </Can>
                }/>

            </Route>
        </Routes>
    )
}
export default DeviceRoutes