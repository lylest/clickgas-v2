import {ISupplierDetails} from "@/types/supplier";

export interface IDashboardStats {
    orders: number;
    customers: number;
    ordersChange: number;
    customersChange: number;
}

export  interface IRevenueStats {
    day: string;
    revenue: number;
    profit: number;
}

export  interface IOrderStats {
    totalOrders: number;
    deliveredOrders: number;
    notDeliveredOrders: number;
    cancelledOrders: number;
    deliveryRate: number;
    cancellationRate: number;
    deliveryRateChange: number;
    cancelRateChange: number;
}

export interface ITopSupplier extends ISupplierDetails {
    deliveredOrdersCount: number;
}
