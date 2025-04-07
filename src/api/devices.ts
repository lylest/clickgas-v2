import { generateQueryParams } from "@/utils";
import { get, patch, post, remove } from "@/api/requests.ts";
import {IDeviceForm, ISupplierDeviceAssignment} from "@/types/device";
import {ICustomerDeviceForm} from "@/types/customer-device"; // Assuming Device interfaces are defined

export const getDevices = (page: number, pageSize: number, keyword: string) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword });
    return get(`/devices?${queryParams}`);
}

export const getDeviceDetails = (deviceId: string) => {
    return get(`/device/${deviceId}`);
}

export const addDevice = (data: IDeviceForm) => {
    return post("/device", data);
}

export const updateDevice = (payload: { data: IDeviceForm, deviceId: string }) => {
    return patch(`/device/${payload.deviceId}`, payload.data);
}

export const removeDevice = (deviceId: string) => {
    return remove(`/device/${deviceId}`);
}

export const getDeviceReadings = (deviceId:string, page: number, pageSize: number) => {
    const queryParams = generateQueryParams({ page, pageSize });
    return get(`/readings/${deviceId}?${queryParams}`);
}

export const getSupplierDevices = (supplierId: string, page: number, pageSize: number, keyword: string) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword });
    return get(`/supplier-devices/${supplierId}?${queryParams}`);
}

export const assignSupplierDevices = (data: ISupplierDeviceAssignment) => {
    return post("/supplier-devices", data);
}

export const removeSupplierDevice = (deviceId: string) => {
    return remove(`/supplier-device/${deviceId}`);
}

export const getCustomerDevices = (customerId: string, page: number, pageSize: number, keyword: string) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword });
    return get(`/customer-devices/${customerId}?${queryParams}`);
}

export const addCustomerDevice = (data: ICustomerDeviceForm) => {
    return post("/customer-device", data);
}