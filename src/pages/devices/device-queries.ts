import { IApiResponse, QueryOptions } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IMetaData } from "@/types/pagination";
import toast from "react-hot-toast";
import { IDevice } from "@/types/device"; // Adjusted import
import { addDevice, getDeviceDetails, getDevices, removeDevice, updateDevice } from "@/api/devices.ts"; // Adjusted import

const deviceQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["devices", { page, pageSize, keyword }] as const,
    details: (deviceId: string) => ["devices", { deviceId }] as const,
}

export const useGetDevices = (
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IDevice[], metadata: IMetaData }>({
        queryKey: deviceQueryKeys.list(page, pageSize, keyword),
        queryFn: () => getDevices(page, pageSize, keyword),
        ...options
    });
};

export const useGetDeviceDetails = (
    deviceId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IDevice, metaData: IMetaData }>({
        queryKey: deviceQueryKeys.details(deviceId),
        queryFn: () => getDeviceDetails(deviceId),
        ...options
    });
};

export const useAddDevice = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse);
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message);
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: addDevice,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useUpdateDevice = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse);
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message);
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: updateDevice,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useRemoveDevice = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse);
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message);
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: removeDevice,
        onSuccess: handleSuccess,
        onError: handleError
    });
};