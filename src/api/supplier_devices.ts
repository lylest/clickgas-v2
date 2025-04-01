import {get} from "@/api/requests.ts";

export const getSupplierDeviceDetails = (deviceId: string) => {
    return get(`/supplier-device/${deviceId}`);
}