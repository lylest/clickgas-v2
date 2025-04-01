import {IApiResponse, QueryOptions} from "@/utils/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    addRole,
    addRolePermissions,
    getRoleDetails,
    getRolePermissions,
    getRoles,
    removeRole, removeRolePermission,
    updateRole
} from "@/api/roles.ts";
import {IMetaData} from "@/types/pagination";
import {IRole, IRolePermission} from "@/types/role";

const roleQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["roles", {page: page, pageSize: pageSize, keyword}] as const,
    list_role_permissions: (
        page: number,
        pageSize: number,
        keyword: string,
        roleId: string
    ) =>
        ["role-permissions", {
            page: page,
            pageSize: pageSize,
            keyword,
            roleId
        }] as const,
    details: (roleId: string) => ["roles", {roleId}] as const,

}

export const useGetRoles = (
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions) => {
    return useQuery<{ data: IRole[], metadata: IMetaData }>({
        queryKey: roleQueryKeys.list(page, pageSize, keyword),
        queryFn: () => getRoles(page, pageSize, keyword),
        ...options
    });
};

export const useGetRolePermissions = (
    page: number,
    pageSize: number,
    keyword: string,
    roleId: string,
    options?: QueryOptions) => {
    return useQuery<{ data: IRolePermission[], metadata: IMetaData }>({
        queryKey: roleQueryKeys.list_role_permissions(page, pageSize, keyword, roleId),
        queryFn: () => getRolePermissions(page, pageSize, keyword, roleId),
        ...options
    });
};

export const useGetRoleDetails = (
    roleId: string,
    options?: QueryOptions) => {
    return useQuery<{ data: IRole }>({
        queryKey: roleQueryKeys.details(roleId),
        queryFn: () => getRoleDetails(roleId),
        ...options
    });
};


export const useAddRole = (options?: QueryOptions) => {
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
        mutationFn: addRole,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useUpdateRole = (options?: QueryOptions) => {
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
        mutationFn: updateRole,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useRemoveRole = (options?: QueryOptions) => {
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
        mutationFn: removeRole,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useAddRolePermissions = (options?: QueryOptions) => {
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
        mutationFn: addRolePermissions,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useRemoveRolePermission = (options?: QueryOptions) => {
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
        mutationFn: removeRolePermission,
        onSuccess: handleSuccess,
        onError: handleError
    })
};