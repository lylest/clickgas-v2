import {Route, Routes} from "react-router-dom";
import Prices from "@/pages/prices/prices.tsx";
import PriceDetails from "@/pages/prices/details/price-details.tsx";
import PriceForm from "@/pages/prices/forms/price-form.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const PriceRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <Can permission={permissions.GET_ALL_PRICES}>
                    <Prices/>
                </Can>
            }>
                <Route path={"details/:priceId"} element={
                    <Can permission={permissions.GET_PRICE_DETAILS}>
                        <PriceDetails/>
                    </Can>
                }/>
                <Route path={"form/:action"} element={
                    <Can permission={permissions.ADD_PRICE}>
                        <PriceForm/>
                    </Can>
                }/>
            </Route>
        </Routes>
    )
}
export default PriceRoutes
