import { IApiResponse, QueryOptions } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IMetaData } from "@/types/pagination";
import toast from "react-hot-toast";
import {  ISupplierDetails } from "@/types/supplier"; // Adjusted import
import { addSupplier, getSupplierDetails, getSuppliers, removeSupplier, updateSupplier } from "@/api/suppliers.ts"; // Adjusted import

const supplierQueryKeys = {
    list: ( page: number, pageSize: number, keyword: string) =>
        ["suppliers", {  page, pageSize, keyword }] as const,
    details: (supplierId: string) => ["suppliers", { supplierId }] as const,
}

export const useGetSuppliers = (
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: ISupplierDetails[], metadata: IMetaData }>({
        queryKey: supplierQueryKeys.list( page, pageSize, keyword),
        queryFn: () => getSuppliers( page, pageSize, keyword),
        ...options
    });
};

export const useGetSupplierDetails = (
    supplierId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: ISupplierDetails, metaData: IMetaData }>({
        queryKey: supplierQueryKeys.details(supplierId),
        queryFn: () => getSupplierDetails(supplierId),
        ...options
    });
};

export const useAddSupplier = (options?: QueryOptions) => {
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
        mutationFn: addSupplier,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useUpdateSupplier = (options?: QueryOptions) => {
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
        mutationFn: updateSupplier,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useRemoveSupplier = (options?: QueryOptions) => {
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
        mutationFn: removeSupplier,
        onSuccess: handleSuccess,
        onError: handleError
    });
};