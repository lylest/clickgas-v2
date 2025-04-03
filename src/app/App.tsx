import { Toaster } from "react-hot-toast";
import AlertProvider from "@/Providers/Alert";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import MainRoute from "@/routes/mainroute/MainRoute.tsx";
import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import AuthRoute from "@/routes/auth-route/auth-route.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {useAuth} from "@/app/useAuth.tsx";


function App() {
    const { authStatus } = useAuth();

    const useInitializeQueryClient = (): QueryClient => {
        const errorRef = useRef({ hasBeenHandled: false, error: null });

        const handleQueryError = (error: any) => {
            if (!errorRef.current.hasBeenHandled) {
                if (error.status === 400) {
                    // handle unauthorized
                }
                errorRef.current = { hasBeenHandled: true, error };
            }
        };

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

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                {authStatus === 'loading' ? <IosLoader /> :
                    authStatus === 'authenticated' ? <MainRoute /> :
                        <AuthRoute />}
                <Toaster position={"top-center"} />
            </AlertProvider>
            <ReactQueryDevtools
                initialIsOpen={false}
                position={"bottom"}
            />
        </QueryClientProvider>
    );
}

export default App;