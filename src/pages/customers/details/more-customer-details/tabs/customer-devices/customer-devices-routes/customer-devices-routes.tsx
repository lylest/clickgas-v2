import {Route, Routes} from "react-router-dom";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import CustomerDevices
    from "@/pages/customers/details/more-customer-details/tabs/customer-devices/customer-devices.tsx";
import AssignCustomerDeviceForm
    from "@/pages/customers/details/more-customer-details/tabs/customer-devices/forms/assign-customer-device-form.tsx";
import DeviceDetails from "@/pages/devices/details/device-details.tsx";

const CustomerDeviceRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_CUSTOMERS}>
                    <CustomerDevices/>
                </Can>
            }>
                <Route path={"assign-customer-device"} element={
                    <Can permission={permissions.ADD_CUSTOMER_DEVICE} >
                        <AssignCustomerDeviceForm />
                    </Can>}
                />
                <Route path={"details/:deviceId"} element={
                    <Can permission={permissions.GET_DEVICE_DETAILS} >
                        <DeviceDetails />
                    </Can>}
                />
            </Route>
        </Routes>
    )
}
export default CustomerDeviceRoutes