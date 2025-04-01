import { IApiResponse, QueryOptions } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IMetaData } from "@/types/pagination";
import toast from "react-hot-toast";
import { IPrice } from "@/types/price"; // Adjusted import
import { addPrice, getPriceDetails, getPrices, removePrice, updatePrice } from "@/api/prices.ts"; // Adjusted import

const priceQueryKeys = {
    list: (page: number, pageSize: number, keyword: string) =>
        ["prices", { page, pageSize, keyword }] as const,
    details: (priceId: string) => ["prices", { priceId }] as const,
}

export const useGetPrices = (
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IPrice[], metadata: IMetaData }>({
        queryKey: priceQueryKeys.list(page, pageSize, keyword),
        queryFn: () => getPrices(page, pageSize, keyword),
        ...options
    });
};

export const useGetPriceDetails = (
    priceId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IPrice, metaData: IMetaData }>({
        queryKey: priceQueryKeys.details(priceId),
        queryFn: () => getPriceDetails(priceId),
        ...options
    });
};

export const useAddPrice = (options?: QueryOptions) => {
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
        mutationFn: addPrice,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useUpdatePrice = (options?: QueryOptions) => {
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
        mutationFn: updatePrice,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useRemovePrice = (options?: QueryOptions) => {
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
        mutationFn: removePrice,
        onSuccess: handleSuccess,
        onError: handleError
    });
};