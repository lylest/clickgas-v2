import { post} from "@/api/requests.ts";
import {ILoginForm, ISignupForm, ISupplierLoginForm} from "@/types/auth/auth";


export const login = (payload: ILoginForm ) => {
    return post("/login", payload);
}

export const signup = (payload: ISignupForm ) => {
    return post("/sign-up", payload);
}

export const logout = ( ) => {
    return post("/logout", null);
}

export const supplierLogin = (payload: ISupplierLoginForm ) => {
    return post("/supplier/login", payload);
}