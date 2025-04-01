import {get, patch, post, remove} from "@/api/requests.ts";
import {generateQueryParams} from "@/utils";
import {IPermissionForm} from "@/types/permission";

export const addPermission = (data:IPermissionForm) => {
    return post("/permission",data );
}

export const getPermissions = (page:number, pageSize:number,keyword:string) => {
    const queryParams = generateQueryParams({  page, pageSize, keyword });
    return get(`/permissions?${queryParams}`);
}

export const updatePermission = (payload:{data: IPermissionForm, permissionId:string}) => {
    return patch(`/permission/${payload.permissionId}`, payload.data );
}

export const removePermission = (permissionId:string) => {
    return remove(`/permission/${permissionId}`);
}