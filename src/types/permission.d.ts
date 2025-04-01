
export interface IPermission {
    id: string;
    name: string;
    path: string;
    httpMethod: string;
    permissionStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPermissionForm {
    name: string;
    path: string;
    httpMethod: string;
}