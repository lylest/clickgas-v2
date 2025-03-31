import {IShop} from "@/types/shop";


export interface ICustomer {
    id: string;
    userName: string;
    email: string;
    phone: string;
    address: string;
    customerStatus: string;
    createdBy: string;
    createdAt: string;
    userData: {
        id: string;
        userName: string;
        email: string;
        phone: string;
        region: string;
        country: string;
        notificationToken: string;
        password: string;
        userStatus: string;
        createdAt: string;
        updatedAt: string;
    };
    shopId: string;
    Shop: IShop;
}

export  interface ICustomerForm {
    userName: string;
    email?: string | null;
    phone: string;
    address: string;
    password: string;
    authMethod: string;
    shopId: string;
}
