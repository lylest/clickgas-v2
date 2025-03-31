import { generateQueryParams } from "@/utils";
import { get, patch, post, remove } from "@/api/requests.ts";
import { ISupplierForm } from "@/types/supplier"; // Assuming Supplier interface is defined

export const getSuppliers = ( page: number, pageSize: number, keyword: string) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword });
    return get(`/suppliers?${queryParams}`);
}

export const getSupplierDetails = (supplierId: string) => {
    return get(`/supplier/${supplierId}`);
}

export const addSupplier = (data: ISupplierForm) => {
    return post("/supplier", data);
}

export const updateSupplier = (payload: { data: ISupplierForm, supplierId: string }) => {
    return patch(`/supplier/${payload.supplierId}`, payload.data);
}

export const removeSupplier = (supplierId: string) => {
    return remove(`/supplier/${supplierId}`);
}