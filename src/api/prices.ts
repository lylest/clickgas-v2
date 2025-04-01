
import { generateQueryParams } from "@/utils";
import { get, patch, post, remove } from "@/api/requests.ts";
import { IPriceForm } from "@/types/price"; // Adjusted to use IPriceForm

export const getPrices = (page: number, pageSize: number, keyword: string) => {
    const queryParams = generateQueryParams({ page, pageSize, keyword });
    return get(`/prices?${queryParams}`);
}

export const getPriceDetails = (priceId: string) => {
    return get(`/price/${priceId}`);
}

export const addPrice = (data: IPriceForm) => {
    return post("/price", data);
}

export const updatePrice = (payload: { data: IPriceForm, priceId: string }) => {
    return patch(`/price/${payload.priceId}`, payload.data);
}

export const removePrice = (priceId: string) => {
    return remove(`/price/${priceId}`);
}