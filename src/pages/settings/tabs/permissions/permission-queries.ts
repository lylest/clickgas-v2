import {IApiResponse, QueryOptions} from "@/utils/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {IMetaData} from "@/types/pagination";
import {addPermission, getPermissions, removePermission, updatePermission} from "@/api/permissions.ts";
import {IPermission} from "@/types/permission";

const permissionQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["permissions", {page: page, pageSize: pageSize, keyword}] as const,
}

export const useGetPermissions = (
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions) => {
    return useQuery<{ data: IPermission[], metadata: IMetaData }>({
        queryKey: permissionQueryKeys.list(page, pageSize, keyword),
        queryFn: () => getPermissions(page, pageSize, keyword),
        ...options
    });
};

export const useAddPermission = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: addPermission,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useUpdatePermission = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: updatePermission,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useRemovePermission = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: removePermission,
        onSuccess: handleSuccess,
        onError: handleError
    })
};