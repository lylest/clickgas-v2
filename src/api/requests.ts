import {isFormData} from "@/utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const FILES_BASE_URL = import.meta.env.VITE_API_BASE_URL+"/assets";

type TRequestProps = {
    method: string;
    credentials?: any;
    headers?: {
        "Content-Type"?: string;
    };
    body?: any;
};


export const request = async (type: string, endpoint: string, data?: any) => {
    const requestProps: TRequestProps = {
        method: type,
        body:data,
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (data) {
        if (isFormData(data)) {
            requestProps.body = data;
            delete requestProps.headers?.["Content-Type"];
        } else requestProps.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, requestProps);
    const responseData = await response.json();
    if (!response.ok) throw  responseData;
    return responseData;
};

export const get = async (endpoint: string) => {
    return await request("get", endpoint, null);
};

export const put = async (endpoint: string, data: string) => {
    return await request("put", endpoint, data);
};

export const post = async (endpoint: string, data: any) => {
    return await request("post", endpoint, data);
};

export const patch = async (endpoint: string, data: any) => {
    return await request("PATCH", endpoint, data);
};

export const remove = async (endpoint: string) => {
    return await request("delete", endpoint, null);
};
