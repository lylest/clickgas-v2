import {IOrderItem, IProductOrder} from "@/types/order";


export const transformProductsIntoInvoiceItems = (
    products: IProductOrder[],
    customer: string,
    user: string,
    shopId: string
): IOrderItem[] => {
    return products.map(product => {
        const quantity = product.Quantity || 1;
        const unitPrice = product.sellingPrice || 0;
        const subTotal = quantity * unitPrice;
        const discount = product.Discount || 0;
        const finalPrice = subTotal - (subTotal * (discount / 100));
        const discountPrice = subTotal * (discount / 100);
        const purchasePrice = product.PurchasePrice * quantity || 0;

        return {
            customer:customer,
            user:user,
            shopId:shopId,
            productId: product.id,
            unitPrice: unitPrice,
            quantity: quantity,
            subTotal: subTotal,
            discount: discount,
            discountPrice: discountPrice,
            finalAmount: finalPrice,
            purchasePrice: purchasePrice
        };
    });
};