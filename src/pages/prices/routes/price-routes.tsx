
import {Route, Routes} from "react-router-dom";
import Prices from "@/pages/prices/prices.tsx";
import PriceDetails from "@/pages/prices/details/price-details.tsx";
import PriceForm from "@/pages/prices/forms/price-form.tsx";

const PriceRoutes =()=> {
    return (
        <Routes>
            <Route path={"/"} element={<Prices />}>
                <Route path={"details/:priceId"} element={<PriceDetails />} />
                <Route path={"price-from/:action"} element={<PriceForm />} />
            </Route>
        </Routes>
    )
}
export  default PriceRoutes
