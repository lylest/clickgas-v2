

import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {login, logout, supplierLogin} from "@/api/auth.ts";
import {IApiResponse,  QueryOptions} from "@/utils/types";
import {ILoginResponse} from "@/types/auth/auth";

export const useLoginQuery = (options?: QueryOptions) => {

    const handleSuccess = (apiResponse:ILoginResponse) => {
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response:IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return  useMutation({
        mutationFn:login,
        onSuccess: handleSuccess,
        onError:handleError
    })
};

export const useLogout = (options?: QueryOptions) => {

    const handleSuccess = (apiResponse:ILoginResponse) => {
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response:IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return  useMutation({
        mutationFn:logout,
        onSuccess: handleSuccess,
        onError:handleError
    })
};

export const useSupplierLoginQuery = (options?: QueryOptions) => {

    const handleSuccess = (apiResponse:ILoginResponse) => {
        toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response:IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return  useMutation({
        mutationFn:supplierLogin,
        onSuccess: handleSuccess,
        onError:handleError
    })
};