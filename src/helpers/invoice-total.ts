/*
import {IProductOrder} from "@/types/order";
import {transformProductsIntoInvoiceItems} from "@/helpers/transform-items.ts";

interface IInvoiceTotals {
    subTotal: number;
    totalDiscount: number;
    finalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    totalPurchasePrice: number;
}

export const calculateInvoiceTotals = (
    products: IProductOrder[],
    amountPaid: number = 0,
    customer: string,
    user: string,
    shopId: string
): IInvoiceTotals => {
    const invoiceItems = transformProductsIntoInvoiceItems(products,customer, user, shopId);

    const subTotal = invoiceItems.reduce((sum, item) => sum + item.subTotal, 0);
    const totalPurchasePrice = products.reduce((sum, item) => sum + item.purchasePrice * item.Quantity, 0)

    const totalDiscount = invoiceItems.reduce((sum, item) => {
        const discountAmount = item.subTotal * (item.discount / 100);
        return sum + discountAmount;
    }, 0);

    const finalAmount = subTotal - totalDiscount;
    const paidAmount = Math.min(amountPaid, finalAmount);
    const remainingAmount = Math.max(finalAmount - paidAmount, 0);

    return {
        subTotal,
        totalDiscount,
        finalAmount,
        paidAmount,
        remainingAmount,
        totalPurchasePrice
    };
};*/
