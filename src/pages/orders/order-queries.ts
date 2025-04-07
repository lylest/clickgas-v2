import {IApiResponse, QueryOptions} from "@/utils/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {IMetaData} from "@/types/pagination";
import {IOrder} from "@/types/order"; // Adjusted import
import {
    cancelOrder,
    changeOrderStatus,
    confirmOrder,
    getOrderDetails,
    getOrders, getSupplierOrders,
    updateDistanceETA
} from "@/api/orders.ts";
import toast from "react-hot-toast";

const orderQueryKeys = {
    list: (
        page: number,
        pageSize: number,
        keyword: string,
        fromDate: string,
        toDate: string,
        orderStatus?: string,
        paymentStatus?: string
    ) =>
        ["orders", {
            page,
            pageSize,
            keyword,
            fromDate,
            toDate,
            orderStatus,
            paymentStatus
        }] as const,
    supplierId: (
        supplierId: string,
        page: number,
        pageSize: number,
        keyword: string,
        fromDate: string,
        toDate: string,
        orderStatus?: string,
        paymentStatus?: string
    ) =>
        ["supplier-orders", {
            supplierId,
            page,
            pageSize,
            keyword,
            fromDate,
            toDate,
            orderStatus,
            paymentStatus
        }] as const,
    details: (orderId: string) => ["orders", {orderId}] as const,
}

export const useGetOrders = (
    page: number,
    pageSize: number,
    keyword: string,
    fromDate: string,
    toDate: string,
    orderStatus?: string,
    paymentStatus?: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IOrder[], metadata: IMetaData }>({
        queryKey: orderQueryKeys.list(
            page,
            pageSize,
            keyword,
            fromDate,
            toDate,
            orderStatus,
            paymentStatus
        ),
        queryFn: () => getOrders(
            page,
            pageSize,
            keyword,
            fromDate,
            toDate,
            orderStatus,
            paymentStatus
        ),
        ...options
    });
};

export const useGetSupplierOrders = (
    supplierId: string,
    page: number,
    pageSize: number,
    keyword: string,
    fromDate: string,
    toDate: string,
    orderStatus?: string,
    paymentStatus?: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IOrder[], metadata: IMetaData }>({
        queryKey: orderQueryKeys.supplierId(
            supplierId,
            page,
            pageSize,
            keyword,
            fromDate,
            toDate,
            orderStatus,
            paymentStatus
        ),
        queryFn: () => getSupplierOrders(
            supplierId,
            page,
            pageSize,
            keyword,
            fromDate,
            toDate,
            orderStatus,
            paymentStatus
        ),
        ...options
    });
};

export const useGetOrderDetails = (
    orderId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IOrder, metaData: IMetaData }>({
        queryKey: orderQueryKeys.details(orderId),
        queryFn: () => getOrderDetails(orderId),
        ...options
    });
};

export const useUpdateDistanceEta = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        await queryClient.invalidateQueries({});
        options?.onSuccess?.(apiResponse);
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message);
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: updateDistanceETA,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useConfirmOrder = (options?: QueryOptions) => {
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
        mutationFn: confirmOrder,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useCancelOrder = (options?: QueryOptions) => {
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
        mutationFn: cancelOrder,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

export const useChangeOrderStatus = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IApiResponse) => {
        toast.success(apiResponse.message);
        await queryClient.invalidateQueries({});
        options?.onSuccess?.(apiResponse);
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message);
        toast.error(response.error);
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: changeOrderStatus,
        onSuccess: handleSuccess,
        onError: handleError
    });
};