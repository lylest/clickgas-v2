import {Route, Routes} from "react-router-dom";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import SupplierDevicesList from "@/pages/suppliers/details/tabs/devices-tab/supplier-devices-list.tsx";
import AssignDevices from "@/pages/suppliers/details/tabs/devices-tab/forms/assign-devices.tsx";

const DeviceTabRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_SUPPLIER_DEVICES}>
                    <SupplierDevicesList />
                </Can>
            }>
                <Route path={"assign-device"} element={
                    <Can permission={permissions.ADD_SUPPLIER_DEVICE}>
                        <AssignDevices/>
                    </Can>
                }/>
            </Route>
        </Routes>
    )
}
export default DeviceTabRoutes