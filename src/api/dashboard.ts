import {generateQueryParams} from "@/utils";
import {get} from "@/api/requests.ts";

export const getDashboardStats = (fromDate:string, toDate:string) => {
    const queryParams = generateQueryParams({  fromDate, toDate });
    return get(`/dashboard/stats?${queryParams}`);
}

export const getRevenueProfit = (fromDate:string, toDate:string) => {
    const queryParams = generateQueryParams({  fromDate, toDate });
    return get(`/dashboard/revenue-profit?${queryParams}`);
}

export const getDeliveryStats = (fromDate:string, toDate:string) => {
    const queryParams = generateQueryParams({  fromDate, toDate });
    return get(`/dashboard/delivery-stats?${queryParams}`);
}

export const getTopSuppliers = (fromDate:string, toDate:string) => {
    const queryParams = generateQueryParams({  fromDate, toDate });
    return get(`/dashboard/top-suppliers?${queryParams}`);
}