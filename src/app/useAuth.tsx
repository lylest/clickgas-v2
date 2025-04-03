import { useState, useEffect } from 'react';
import { useGlobalContextHook } from '@/hook/useGlobalContextHook';
import { get } from '@/api/requests';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export const useAuth = () => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
    const { dispatch } = useGlobalContextHook();

    const checkAuthStatus = async () => {
        let isAuthenticated = false;

        // Make separate API calls and handle them individually
        try {
            const userResponse = await get("/auth-status");
            if (userResponse?.data) {
                dispatch({ type: "SET_CURRENT_USER", payload: userResponse.data });
                isAuthenticated = true;
            }
        } catch (userErr) {
            console.log("User auth check failed:", userErr);
        }

        try {
            const supplierResponse = await get("/supplier/auth-status");
            if (supplierResponse?.data) {
                dispatch({ type: "SET_CURRENT_USER", payload: supplierResponse.data });
                isAuthenticated = true;
            }
        } catch (supplierErr) {
            console.log("Supplier auth check failed:", supplierErr);
        }

        if (isAuthenticated) {
            setAuthStatus('authenticated');
        } else {
            setAuthStatus('unauthenticated');
        }
    };


    useEffect(() => {
        checkAuthStatus();
    }, []);

    return {
        authStatus,
        isLoading: authStatus === 'loading',
        isAuthenticated: authStatus === 'authenticated',
        checkAuthStatus,
    };
};