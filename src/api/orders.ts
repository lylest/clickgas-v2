import {generateQueryParams} from "@/utils";
import {get, patch} from "@/api/requests.ts";


export const getOrders = (
    page: number,
    pageSize: number,
    keyword: string,
    fromDate: string,
    toDate: string,
    orderStatus?: string,
    paymentStatus?: string
) => {
    const queryParams = generateQueryParams({page, pageSize, keyword, fromDate, toDate, orderStatus, paymentStatus});
    return get(`/orders?${queryParams}`);
}

export const getOrderDetails = (orderId: string) => {
    return get(`/order/${orderId}`);
}


export const updateDistanceETA =(payload:{orderId:string, distance:number, eta:number})=> {
     const { orderId, distance, eta } = payload;
     const queryParams = generateQueryParams({distance,eta});
    return patch(`/order/distance-eta/${orderId}?${queryParams}`,{})
}

export const confirmOrder = (orderId: string) => {
    return patch(`/order/confirm/${orderId}`,{})
}

export const cancelOrder = (orderId: string) => {
    return patch(`/order/cancel/${orderId}`,{})
}

export const changeOrderStatus = (payload:{ orderId: string, newStatus:string}) => {
    const { orderId, newStatus } = payload;
    return patch(`/order/status/${orderId}/${newStatus}`,{})
}

export const getSupplierOrders = (
    supplierId: string,
    page: number,
    pageSize: number,
    keyword: string,
    fromDate: string,
    toDate: string,
    orderStatus?: string,
    paymentStatus?: string
) => {
    const queryParams = generateQueryParams({page, pageSize, keyword, fromDate, toDate, orderStatus, paymentStatus});
    return get(`/supplier-orders/${supplierId}?${queryParams}`);
}