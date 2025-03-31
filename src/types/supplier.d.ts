import {IFileDetails} from "@/types/file";


interface GpsCoordinates {
    latitude: number;
    longitude: number;
}

export interface ISupplierForm {
    firstName: string;
    lastName: string;
    middleName?: string | null;
    phone: string;
    country: string;
    region: string;
    address: string;
    gpsCoordinates: GpsCoordinates;
    idType: string;
    idImage: string;
    idNumber: string;
}


export interface ISupplierDetails {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    phone: string;
    email: string | null;
    country: string;
    region: string;
    address: string;
    gpsCoordinates: GpsCoordinates;
    idType: string;
    idNumber: string;
    idImage: string;
    Image: IFileDetails;
    supplierStatus: string;
    createdAt: string;
    updatedAt: string;
}