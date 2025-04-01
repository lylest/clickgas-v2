import {QueryOptions} from "@/utils/types";
import {useQuery} from "@tanstack/react-query";
import {IMetaData} from "@/types/pagination";
import {ISupplierDevice} from "@/types/supplier-device";
import {getSupplierDeviceDetails} from "@/api/supplier_devices.ts";

const supplierDeviceQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["devices", {page, pageSize, keyword}] as const,
    details: (deviceId: string) => ["supplier-devices", {deviceId}] as const,
}

export const useGetSupplierDeviceDetails = (
    deviceId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: ISupplierDevice, metaData: IMetaData }>({
        queryKey: supplierDeviceQueryKeys.details(deviceId),
        queryFn: () => getSupplierDeviceDetails(deviceId),
        ...options
    });
};