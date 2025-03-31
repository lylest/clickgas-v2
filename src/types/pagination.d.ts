import {Dispatch} from "react";

export interface IPagination {
    setPage: Dispatch<number>;
    totalPages?: number;
    page: number;
    pageSize:number;
    setPageSize:Dispatch<number>;
    showPagesList?:boolean
    showPageSizeSelector?:boolean;
    onPageSizeChange?: (pageSize: string) => void //js handles number poorly
}

export interface IMetaData {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
}