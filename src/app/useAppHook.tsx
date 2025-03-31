import {useEffect, useState} from "react";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";
import {get} from "@/api/requests.ts";


export const useAppHook = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const {dispatch} = useGlobalContextHook()
    const [isLoggedIn, setIsLoggedIn] = useState<any>(null)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            /*setIsDarkMode(true);
            document.documentElement.classList.add('dark');*/
            setIsDarkMode(false)
            document.documentElement.classList.remove('dark')
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    async function switchTheme() {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }

    const checkAuthStatus = async () => {
        try {
            const responseData = await get("/auth-status")
            dispatch({type: "SET_CURRENT_USER", payload: responseData?.data})
            setIsLoggedIn(true)
        } catch (err) {
            setIsLoggedIn(false)
        }
    }

    return {
        isDarkMode,
        switchTheme,
        isLoggedIn,
        checkAuthStatus
    }
}

