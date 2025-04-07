import {ISupplierDetails} from "@/types/supplier";
import {IUser} from "@/types/role";
import {ICustomer} from "@/types/customer";
import {IPrice} from "@/types/price";

interface GPSCoordinates {
    latitude: number;
    longitude: number;
}

export interface IDeviceForm {
    gpsCoordinates: GPSCoordinates;
    serialNumber: string;
}

export interface IDevice {
    id: string;
    gpsCoordinates: GPSCoordinates;
    serialNumber: string;
    deviceStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface IDeviceReading {
    id: string;
    deviceId: string;
    amount: number;
    battery: number;
    createdAt: string;
}

export interface ISupplierDevice {
    id: string;
    supplierId: string;
    supplier: ISupplierDetails;
    deviceId: string;
    Device: IDevice;
    assignedDate: string;
    assignedBy: string;
    User: IUser;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISupplierDeviceAssignment {
    devices: {
        supplierId: string;
        deviceId: string;
    }[];
}

// Main interface
export  interface ICustomerDevice {
    id: string;
    customerId: string;
    customer: ICustomer;
    supplierId: string;
    supplier: ISupplierDetails;
    deviceId: string;
    Device: IDevice;
    priceId: string;
    Price: IPrice;
    assignedBy: string;
    User: IUser;
    status: string;
    assignedDate: string;
    createdAt: string;
    updatedAt: string;
}