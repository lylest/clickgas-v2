import {QueryOptions} from "@/utils/types";
import {useQuery} from "@tanstack/react-query";
import {IDashboardStats, IOrderStats, IRevenueStats, ITopSupplier} from "@/types/dashboard";
import {getDashboardStats, getDeliveryStats, getRevenueProfit, getTopSuppliers} from "@/api/dashboard.ts";

const dashboardQueryKeys = {
    stats: (fromDate:string, toDate:string) =>
        ["dashboard-stats", {fromDate, toDate}] as const,
    revenueStats: (fromDate:string, toDate:string) =>
        ["dashboard-revenue-stats", {fromDate, toDate}] as const,
    deliveryStats: (fromDate:string, toDate:string) =>
        ["delivery-stats", {fromDate, toDate}] as const,
    supplierStats: (fromDate:string, toDate:string) =>
        ["top-customers", {fromDate, toDate}] as const,
}

export const useGetDashboardStats = (
    fromDate:string,
    toDate:string,
    options?: QueryOptions) => {
    return useQuery<{ data: IDashboardStats }>({
        queryKey: dashboardQueryKeys.stats(fromDate, toDate),
        queryFn: () => getDashboardStats(fromDate,toDate),
        ...options
    });
};

export const useGetRevenueStats = (
    fromDate:string,
    toDate:string,
    options?: QueryOptions) => {
    return useQuery<{ data: IRevenueStats[] }>({
        queryKey: dashboardQueryKeys.revenueStats(fromDate, toDate),
        queryFn: () => getRevenueProfit(fromDate,toDate),
        ...options
    });
};

export const useGetTopSuppliers = (
    fromDate:string,
    toDate:string,
    options?: QueryOptions) => {
    return useQuery<{ data: ITopSupplier[] }>({
        queryKey: dashboardQueryKeys.supplierStats(fromDate, toDate),
        queryFn: () => getTopSuppliers(fromDate,toDate),
        ...options
    });
};

export const useGetDeliveryStats = (
    fromDate:string,
    toDate:string,
    options?: QueryOptions) => {
    return useQuery<{ data: IOrderStats }>({
        queryKey: dashboardQueryKeys.deliveryStats(fromDate, toDate),
        queryFn: () => getDeliveryStats(fromDate,toDate),
        ...options
    });
};