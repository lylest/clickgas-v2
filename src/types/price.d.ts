import {ISupplierDetails} from "@/types/supplier";

export interface IPrice {
    id: string;
    supplierId: string;
    Supplier: ISupplierDetails;
    gasBrand: string;
    weight: number;
    weightUnit: string;
    buyingPrice: number;
    sellingPrice: number;
    currency: string;
    notes: string;
    status: string;
    createdAt: string;
    updatedAt: string;

}


export interface IPriceForm {
    supplierId: string;
    gasBrand: string;
    weight: number;
    buyingPrice: number;
    sellingPrice: number;
    notes: string;
}