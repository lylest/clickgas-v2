import {QueryOptions} from "@/utils/types";
import {useQuery} from "@tanstack/react-query";
import {IMetaData} from "@/types/pagination";
import {ICustomerDevice} from "@/types/customer-device";
import {getCustomerDeviceByDeviceId} from "@/api/customer_devices.ts";

const CustomerDeviceQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["devices", {page, pageSize, keyword}] as const,
    details: (deviceId: string) => ["customer-devices", {deviceId}] as const,
}

export const useGetCustomerDeviceByDeviceId = (
    deviceId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: ICustomerDevice, metaData: IMetaData }>({
        queryKey: CustomerDeviceQueryKeys.details(deviceId),
        queryFn: () => getCustomerDeviceByDeviceId(deviceId),
        ...options
    });
};