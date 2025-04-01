import {IDevice} from "@/types/device";
import {IUser} from "@/types/auth/auth";
import {ISupplierDetails} from "@/types/supplier";

export interface ISupplierDevice {
        id: string;
        supplierId: string;
        supplier: ISupplierDetails;
        deviceId: string;
        Device: IDevice
        assignedDate: string;
        assignedBy: string;
        User: IUser;
        status: string;
        createdAt: string;
        updatedAt: string;
}