
import { IApiResponse, QueryOptions } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IMetaData } from "@/types/pagination";
import toast from "react-hot-toast";
import {addPayment, getOrderPayments, getPaymentDetails,} from "@/api/payments.ts";
import {IPayment} from "@/types/payments";

const paymentQueryKeys = {
    order: (orderId:string, page: number, pageSize: number, keyword: string) =>
        ["payments", { orderId, page, pageSize, keyword }] as const,
    details: (paymentId: string) => ["payments", { paymentId }] as const,
}

export const useGetOrderPayments = (
    orderId:string,
    page: number,
    pageSize: number,
    keyword: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IPayment[], metadata: IMetaData }>({
        queryKey: paymentQueryKeys.order(orderId,page, pageSize, keyword),
        queryFn: () => getOrderPayments(orderId,page, pageSize, keyword),
        ...options
    });
};

export const useGetPaymentDetails = (
    paymentId: string,
    options?: QueryOptions
) => {
    return useQuery<{ data: IPayment, metaData: IMetaData }>({
        queryKey: paymentQueryKeys.details(paymentId),
        queryFn: () => getPaymentDetails(paymentId),
        ...options
    });
};

export const useAddPayment = (options?: QueryOptions) => {
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
        mutationFn: addPayment,
        onSuccess: handleSuccess,
        onError: handleError
    });
};

