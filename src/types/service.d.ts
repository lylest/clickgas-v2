import {IShop} from "@/types/shop";
import {IUser} from "@/types/auth/auth";
import {IFileDetails} from "@/types/file";


export interface IServiceForm {
    name: string;
    code: string;
    shopId: string;
    coverId: string;
}


interface IService {
    id: string;
    name: string;
    code: string;
    shopId: string;
    shop: IShop;
    coverId: string;
    cover:IFileDetails;
    serviceStatus: string;
    createdBy: string;
    createdByUser: IUser;
    createdAt: string;
    updatedAt: string;
}