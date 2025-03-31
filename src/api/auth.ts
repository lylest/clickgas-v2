import {get, post} from "@/api/requests.ts";
import {ILoginForm, ISignupForm} from "@/types/auth/auth";


export const login = (payload: ILoginForm ) => {
    return post("/login", payload);
}

export const signup = (payload: ISignupForm ) => {
    return post("/sign-up", payload);
}

export const logout = ( ) => {
    return post("/logout", null);
}
