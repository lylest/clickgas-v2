import {generateQueryParams} from "@/utils";
import {get, patch, post, remove} from "@/api/requests.ts";
import {ICustomerForm} from "@/types/customer";


export const getCustomers = (shopId:string,page:number, pageSize:number,keyword:string) => {
    const queryParams = generateQueryParams({  page, pageSize, keyword });
    return get(`/customers/${shopId}?${queryParams}`);
}

export const getCustomerDetails = (customerId:string) => {
    return get(`/customer/${customerId}`);
}

export const addCustomer = (data:ICustomerForm) => {
    return post("/customer/signup",data );
}

export const updateCustomer = (payload:{data: ICustomerForm, customerId:string}) => {
    return patch(`/customer/${payload.customerId}`, payload.data );
}

export const removeCustomer = (customerId:string) => {
    return remove(`/customer/${customerId}`);
}