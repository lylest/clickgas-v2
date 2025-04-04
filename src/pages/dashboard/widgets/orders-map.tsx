import { FC, useMemo, } from "react";
import { GoogleMap, useLoadScript, OverlayViewF,OverlayView} from "@react-google-maps/api";
import { containerStyle, mapStyles } from "@/utils/map-helper";
import DeviceMarker from "@/components/map/device-marker";
import {IOrder} from "@/types/order";
import MainLoader from "@/components/loaders/main-loader.tsx";



interface OrdersMapProps {
    orders: IOrder[];
}

const libraries: ["places"] = ["places"];

const OrdersMap: FC<OrdersMapProps> = ({ orders }) => {
    const { isLoaded } = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
        libraries,
    });

    const mapCenter = useMemo(() => {
        if (!orders || orders.length === 0) {
            return { lat: 0, lng: 0 };
        }

        // Calculate the average of all coordinates
        const validDevices = orders.filter(order =>
            order.Device &&
            order.Device.gpsCoordinates &&
            order.Device.gpsCoordinates.latitude &&
            order.Device.gpsCoordinates.longitude
        );

        if (validDevices.length === 0) {
            return { lat: 0, lng: 0 }; // Default center if no valid coordinates
        }

        const totalLat = validDevices.reduce((sum, order) =>
            sum + order.Device.gpsCoordinates.latitude, 0);
        const totalLng = validDevices.reduce((sum, order) =>
            sum + order.Device.gpsCoordinates.longitude, 0);

        return {
            lat: totalLat / validDevices.length,
            lng: totalLng / validDevices.length
        };
    }, [orders]);


    if (!isLoaded) {
        return <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <MainLoader
                size="medium"
                fullScreen={false}
                message="Loading map..."
            />
        </div>;
    }

    return (
        <div className="w-full h-96 relative rounded-lg">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={5}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: true,
                    scrollwheel: true,
                }}
            >
                {orders.map(order => (
                    order.Device && order.Device.gpsCoordinates && (
                        <OverlayViewF
                            key={order.id}
                            position={{
                                lat: order.Device.gpsCoordinates.latitude,
                                lng: order.Device.gpsCoordinates.longitude
                            }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                                <DeviceMarker
                                    device={order.Device}
                                    customer={order.customer}
                                    //status={order.orderStatus}
                                />
                        </OverlayViewF>
                    )
                ))}
            </GoogleMap>
        </div>
    );
};

export default OrdersMap;