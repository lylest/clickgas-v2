import {generateQueryParams} from "@/utils";
import {get, patch, post, remove} from "@/api/requests.ts";
import {ICustomerForm, ICustomerUpdateForm} from "@/types/customer";


export const getCustomers = (page:number, pageSize:number,keyword:string) => {
    const queryParams = generateQueryParams({  page, pageSize, keyword });
    return get(`/customers?${queryParams}`);
}

export const getCustomerDetails = (customerId:string) => {
    return get(`/customer/${customerId}`);
}

export const addCustomer = (data:ICustomerForm) => {
    return post("/customer",data );
}

export const updateCustomer = (payload:{data: ICustomerUpdateForm, customerId:string}) => {
    return patch(`/customer/${payload.customerId}`, payload.data );
}

export const removeCustomer = (customerId:string) => {
    return remove(`/customer/${customerId}`);
}