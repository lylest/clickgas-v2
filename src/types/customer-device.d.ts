
import {ICustomer} from "@/types/customer";
import {ISupplierDetails} from "@/types/supplier";
import {IDevice} from "@/types/device";
import {IUser} from "@/types/auth/auth";
import {IPrice} from "@/types/price";

export interface ICustomerDevice  {
    id: string;
    customerId: string;
    customer:ICustomer;
    supplierId: string;
    supplier:ISupplierDetails;
    deviceId: string;
    Device:IDevice;
    priceId: string;
    Price: IPrice;
    assignedBy: string;
    User:IUser;
    status: string;
    assignedDate: string;
    createdAt: string;
    updatedAt: string;
}
