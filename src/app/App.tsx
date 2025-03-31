import {useAppHook} from './useAppHook.tsx'
import {Toaster} from "react-hot-toast";
import AlertProvider from "@/Providers/Alert";

import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import MainRoute from "@/routes/mainroute/MainRoute.tsx";
import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import AuthRoute from "@/routes/auth-route/auth-route.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


function App() {
    const { isLoggedIn, checkAuthStatus} = useAppHook()

    const useInitializeQueryClient = (): QueryClient => {
        const errorRef = useRef({hasBeenHandled: false, error: null});

        const handleQueryError = (error: any) => {
            if (!errorRef.current.hasBeenHandled) {
                if (error.status === 400) {
                    // handle unauthorized
                }
                errorRef.current = {hasBeenHandled: true, error};
            }
        };

        // initialize queryClient once
        const [queryClient] = useState(() => {
            return new QueryClient({
                queryCache: new QueryCache({
                    onError: handleQueryError,
                }),
            });
        });

        return queryClient;
    };
    const queryClient = useInitializeQueryClient();

    useEffect(() => {
        checkAuthStatus()
    },[isLoggedIn]);

    return (
            <QueryClientProvider client={queryClient}>
                <AlertProvider>
                    {isLoggedIn === null ? <IosLoader/> :
                        isLoggedIn === true ? <MainRoute/> :
                            isLoggedIn === false ? <AuthRoute/> :
                                <IosLoader/>}
                    <Toaster position={"top-center"}/>
                </AlertProvider>
                <Toaster position={"top-center"}/>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position={"bottom"}
                />
            </QueryClientProvider>
    )
}

export default App
