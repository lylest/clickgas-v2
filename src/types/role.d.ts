import {IPermission} from "@/types/permission";

export  interface  IRoleForm {
     name:string;
     description:string;
}

export interface IRole {
     id: string;
     name: string;
     description: string;
     roleStatus: string;
     createdAt: string;
     updatedAt: string;
}

export interface IRolePermission {
     id: string;
     roleId: string;
     permissionId: string;
     Permission: IPermission;
     grantedAt: string;
     grantedBy: string;
     user: IUser;
     status: string;
}

export interface IUser {
     id: string;
     userName: string;
     email: string;
     phone: string;
     region: string;
     role: string;
     country: string;
     notificationToken: string;
     password: string;
     userStatus: string;
     createdAt: string;
     updatedAt: string;
}

export interface IAddPermissionForm {
     roleId: string;
     permissionIds: string[];
}