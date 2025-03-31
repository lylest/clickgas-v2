import {IApiResponse, QueryOptions} from "@/utils/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {IMetaData} from "@/types/pagination";
import {ICustomer} from "@/types/customer";
import {addCustomer, getCustomerDetails, getCustomers, removeCustomer, updateCustomer} from "@/api/customers.ts";
import toast from "react-hot-toast";


const customersQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["customers", { page: page, records: pageSize, keyword}] as const,
    details: (customerId: string) => ["customers", {customerId}] as const,
}

export const useGetCustomers = (
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions) => {
    return useQuery<{ data: ICustomer[], metadata: IMetaData }>({
        queryKey: customersQueryKeys.list(pageSize, pageSize, keyword),
        queryFn: () => getCustomers(page, pageSize, keyword),
        ...options
    });
};

export const useGetCustomerDetails = (
    customerId: string,
    options?: QueryOptions) => {
    return useQuery<{ data: ICustomer, metaData: IMetaData }>({
        queryKey: customersQueryKeys.details(customerId),
        queryFn: () => getCustomerDetails(customerId),
        ...options
    });
};

export const useAddCustomer = (options?: QueryOptions) => {
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
        mutationFn: addCustomer,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useUpdateCustomer = (options?: QueryOptions) => {
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
        mutationFn: updateCustomer,
        onSuccess: handleSuccess,
        onError: handleError
    })
};

export const useRemoveCustomer = (options?: QueryOptions) => {
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
        mutationFn: removeCustomer,
        onSuccess: handleSuccess,
        onError: handleError
    })
};