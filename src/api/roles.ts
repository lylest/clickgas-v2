import {get, patch, post, remove} from "@/api/requests.ts";
import {IRoleForm} from "@/types/role.d.tsx";
import {generateQueryParams} from "@/utils";
import {IAddPermissionForm} from "@/types/role";


export const addRole = (data:IRoleForm) => {
    return post("/role",data );
}

export const getRoles = (page:number, pageSize:number,keyword:string) => {
    const queryParams = generateQueryParams({  page, pageSize, keyword });
    return get(`/roles?${queryParams}`);
}

export const getRolePermissions = (
    page:number,
    pageSize:number,
    keyword:string,
    roleId:string,
    ) => {
    const queryParams = generateQueryParams({  page, pageSize, keyword });
    return get(`/role-permissions/${roleId}?${queryParams}`);
}

export const getRoleDetails = (roleId:string) => {
    return get(`/role/${roleId}`);
}


export const updateRole = (payload:{data: IRoleForm, roleId:string}) => {
    return patch(`/role/${payload.roleId}`, payload.data );
}

export const removeRole = (roleId:string) => {
    return remove(`/role/${roleId}`);
}

export const addRolePermissions = (data:IAddPermissionForm) => {
    return post("/role-permission",data );
}

export const removeRolePermission = (rolePermissionId:string) => {
    return remove(`/role-permission/${rolePermissionId}`);
}