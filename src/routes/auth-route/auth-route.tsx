import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements, Navigate
} from "react-router-dom";
import {VscBracketError, VscRefresh} from "react-icons/vsc";
import Login from "@/pages/login/login.tsx";
import ErrorPage from "@/components/ui/ErrorPage.tsx";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"}  errorElement={<ErrorPage
            buttonLabel={"Retry"}
            onClick={()=> window.location.reload()}
            subText={"Page Rendering Failed. Please refresh the page or try again later. If the issue persists, contact support."}
            text={"Error loading data"}
            ButtonIcon={VscRefresh}
            Icon={VscBracketError}
        />}>
            <Route path={"/"} element={<Navigate to={"login"} />} />
            <Route path={"login/*"} element={<Login />} />
            <Route path="*" element={<Login />} />
        </Route>
    )
)

const AuthRoute =()=> {
    return (<RouterProvider router={router} />)
}

export default AuthRoute
