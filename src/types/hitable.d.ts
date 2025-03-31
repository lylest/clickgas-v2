import {ReactNode} from "react";
import {IPagination} from "@/types/pagination";

export interface IHiTable<T> {
    headers: IHiHeader<T>[];
    rows: T[];
    actions?: IHiAction<T>[];
    pagination?:IPagination<T>;
    selectable?: boolean;
    selectedItems?:any[];
    selectAll?:()=> void
    onSelect?:(row:T) => void
    onRowClick?:(row:T) => void
    selectField?:string
    link?:string
}

export interface IHiHeader<T> {
    key: keyof T;
    label: string;
    defaultValue?:string;
    headerClass?: string;
    template?: (row: T) => JSX.Element;
}

export interface IHiAction<T> {
    label?: string;
    icon?: ReactNode;
    onClick?: (row: T) => void;
}
