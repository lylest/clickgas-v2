import {IPrice} from "@/types/price";
import {GPSCoordinates, IDevice} from "@/types/device";
import {ISupplierDetails} from "@/types/supplier";
import {ICustomer} from "@/types/customer";


export interface IOrder {
        id: string;
        trackingNo: number;
        customerId: string;
        customer: ICustomer;
        supplierId: string;
        supplier:ISupplierDetails;
        deviceId: string;
        Device:IDevice;
        priceId: string;
        Price: IPrice;
        amount: number;
        paidAmount: number;
        pendingAmount: number;
        currency: string;
        confirmedAt: string;
        cancelledAt: string;
        distance: number;
        distanceUnit: string;
        deliveryAwaitTime: number;
        orderStatus: string;
        paymentStatus: string;
        createdAt: string;
        updatedAt: string;
}

