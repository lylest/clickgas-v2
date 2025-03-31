import {ICustomer} from "@/types/customer";
import {IUser} from "@/types/auth/auth";
import {IShop} from "@/types/shop";
import {IService} from "@/types/service";

interface IOrderForm {
    trackingId: string;
    customerId: string;
    shopId: string;
    serviceId: string;
    dateReceived: string;
    expectedReadyDate: string;
    totalPieces: number;
    subTotal: number;
    totalDiscount: number;
    finalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    pieces: OrderPiece[];
}

interface IOrderPiece {
    itemId: string;
    unitPrice: number;
    unitPieces: number;
    quantity: number;
    totalPiecePrice: number;
    colorCode: string;
    colorName: string;
}

interface IOrderDetails {
    id: string;
    tagNo: number;
    trackingId: string;
    customerId: string;
    customer: ICustomer;
    createdBy: string;
    createdByUser: IUser;
    shopId: string;
    shop: IShop;
    serviceId: string;
    service: IService;
    updatedBy: string | null;
    dateReceived: string;
    expectedReadyDate: string;
    actualReadyDate: string | null;
    totalPieces: number;
    progress: string;
    orderStatus: string;
    paymentStatus: string;
    subTotal: number;
    totalDiscount: number;
    finalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    createdAt: string;
    updatedAt: string;
}