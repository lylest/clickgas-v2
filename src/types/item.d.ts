import {IShop} from "@/types/shop";
import {IUser} from "@/types/auth/auth";

export  interface ItemForm {
    name: string;
    price: number;
    pieces: number;
    emoji: string | null;
    shopId: string;
}

export interface ItemDetails {
    id: string;
    name: string;
    price: number;
    pieces: number;
    emoji: string | null;
    shopId: string;
    shop: IShop;
    itemStatus: string;
    createdBy: string;
    createdByUser: IUser;
    createdAt: string;
    updatedAt: string;
}