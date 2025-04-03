import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import {ReactNode} from "react";

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

export interface IAction<T> {
    icon: ReactNode;
    label?:string;
    onClick: (row: T) => void;
    permission: keyof typeof permissions;
}