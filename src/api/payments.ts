
import { generateQueryParams } from "@/utils";
import { get,  post } from "@/api/requests.ts";
import {IPaymentForm} from "@/types/payments";


export const getOrderPayments = (orderId:string,page: number, pageSize: number, keyword: string) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword });
    return get(`/payments/order/${orderId}?${queryParams}`);
}

export const getPaymentDetails = (paymentId: string) => {
    return get(`/payment/${paymentId}`);
}

export const addPayment = (data: IPaymentForm) => {
    return post("/payment", data);
}

export const getPayments = (
    page: number,
    pageSize: number,
    keyword: string,
    fromDate:string,
    toDate:string,
) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword, fromDate, toDate });
    return get(`/payments?${queryParams}`);
}
