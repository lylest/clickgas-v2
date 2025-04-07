import {Route, Routes} from "react-router-dom";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import SupplierDevices from "@/pages/suppliers/details/tabs/devices-tab/supplier-devices-list.tsx";
import AssignDevices from "@/pages/suppliers/details/tabs/devices-tab/forms/assign-devices.tsx";
import DeviceDetails from "@/pages/devices/details/device-details.tsx";

const DeviceTabRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_SUPPLIER_DEVICES}>
                    <SupplierDevices />
                </Can>
            }>
                <Route path={"assign-device"} element={
                    <Can permission={permissions.ADD_SUPPLIER_DEVICE}>
                        <AssignDevices/>
                    </Can>
                }/>
                <Route path={"details/:deviceId"} element={
                    <Can permission={permissions.ADD_SUPPLIER_DEVICE}>
                        <DeviceDetails/>
                    </Can>
                }/>
            </Route>
        </Routes>
    )
}
export default DeviceTabRoutes