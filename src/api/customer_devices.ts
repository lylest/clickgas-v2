
import {get} from "@/api/requests.ts";

export const getCustomerDeviceByDeviceId = (deviceId: string) => {
    return get(`/customer-device/device/${deviceId}`);
}