import {IOrder} from "@/types/order";
import {ICustomer} from "@/types/customer";
import {ISupplierDetails} from "@/types/supplier";

export interface IPaymentForm {
    orderId: string;
    customerId: string;
    supplierId: string;
    amount: number;
    totalAmount: number;
    paymentMethod: string;
}

export interface IPayment {
    id: string;
    orderId: string;
    order: IOrder;
    customerId: string;
    customer: ICustomer;
    supplierId: string;
    supplier: ISupplierDetails;
    amount: number;
    totalAmount: number;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    paymentMethod: string;
}


