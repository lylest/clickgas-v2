import {Outlet, useNavigate, useParams} from "react-router-dom";
import {
    useCancelOrder, useChangeOrderStatus,
    useConfirmOrder,
    useGetOrderDetails,
    useUpdateDistanceEta
} from "@/pages/orders/order-queries.ts";
import { IOrder } from "@/types/order";
import { GoogleMap, useLoadScript, OverlayViewF, OverlayView, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { containerStyle, mapStyles } from "@/utils/map-helper.ts";
import { useState, useCallback, useEffect, useRef } from "react";
import MainLoader from "@/components/loaders/main-loader.tsx";
import DeviceMarker from "@/components/map/device-marker.tsx";
import SupplierMarker from "@/components/map/supplier-marker.tsx";
import BadgeStatus from "@/components/badge-status.tsx";
import {LucideCreditCard, LucideMapPin, LucideShoppingBag, LucideUser} from "lucide-react";
import {formatCurrency, formatSecondsToDuration} from "@/utils/time-utils.ts";
import {formatDate} from "@/utils";
import OrderActions from "@/components/form-control/button/order-actions.tsx";
import {AlertContainer, useAlerts} from "@/Providers/Alert";



const libraries: ("places")[] = ["places"];

type LatLng = {
    lat: number;
    lng: number;
};

type RouteEndpoints = {
    origin: LatLng | null;
    destination: LatLng | null;
};

const OrderDetails = () => {
    const { orderId } = useParams();
    const { confirm } = useAlerts();
    const navigate = useNavigate();
    const { data: orderRes, isLoading } = useGetOrderDetails(orderId!, { enabled: !!orderId });
    const order: IOrder | undefined = orderRes?.data;

    const { isLoaded } = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
        libraries,
    });

    // Store the actual route points for marker placement
    const [routeEndpoints, setRouteEndpoints] = useState<RouteEndpoints>({
        origin: null,
        destination: null
    });

    const [directions, setDirections] = useState(null);
    const [travelTime, setTravelTime] = useState("");
    const [travelDistance, setTravelDistance] = useState("");
    const directionsRequestedRef = useRef(false);

    // Initial coordinates from order data (may be slightly different from actual route points)
    const supplierCoordinates = {
        lat: order?.supplier?.gpsCoordinates?.latitude ?? -6.822298,
        lng: order?.supplier?.gpsCoordinates?.longitude ?? 39.229850
    };

    const deviceCoordinates = {
        lat: order?.Device?.gpsCoordinates?.latitude ?? -6.822298,
        lng: order?.Device?.gpsCoordinates?.longitude ?? 39.229850
    };

    // Use callback to process directions response and extract route endpoints
    const directionsCallback = useCallback((response:any) => {
        if (response !== null && response.status === 'OK') {
            setDirections(response);

            const route = response.routes[0];
            if (route && route.legs && route.legs[0]) {
                setTravelTime(route.legs[0].duration.text);
                setTravelDistance(route.legs[0].distance.text);

                updateDistanceEtaMutation({
                    orderId:orderId ?? "",
                    distance:route.legs[0].distance.value / 1000,
                    eta:route.legs[0].duration.value,
                })

                const startLocation = route.legs[0].start_location;
                const endLocation = route.legs[0].end_location;

                setRouteEndpoints({
                    origin: { lat: startLocation?.lat(), lng: startLocation?.lng() },
                    destination: { lat: endLocation?.lat(), lng: endLocation.lng() }
                });
            }

            directionsRequestedRef.current = true;
        }
    }, []);

    // Request directions once when component mounts or order data changes
    useEffect(() => {
        if (order && isLoaded && !directionsRequestedRef.current) {
            directionsRequestedRef.current = true;
        }
    }, [order, isLoaded]);


    const handleOrderConfirmation = async () => {
        const confirmed = await confirm({
            title: "Confirm order",
            message: `Please make sure you want to confirm/accept this order? tracking number : #${order?.trackingNo}?`,
            type: "success"
        });
        if (confirmed) {
            confirmOrderMutation(orderId ?? "")
        }
    };

    const handleOrderCancellation = async () => {
        const confirmed = await confirm({
            title: "Cancel order",
            message: `Please make sure you want to cancel this order? tracking number : #${order?.trackingNo}?`,
            type: "danger"
        });
        if (confirmed) {
            cancelOrderMutation(orderId ?? "")
        }
    };

    const handleChangeOrderStatus = async (newStatus:string) => {
        const confirmed = await confirm({
            title: `Change  order status to ${newStatus.toUpperCase()}`,
            message: `Please make sure you want to change this order status? tracking number : #${order?.trackingNo}
             into new status called ${newStatus}?`,
            type: "warning"
        });
        if (confirmed) {
            changeOrderStatusMutation({
                orderId:orderId ?? "",
                newStatus:newStatus,
            })
        }
    };

    const { mutate:confirmOrderMutation }= useConfirmOrder()
    const { mutate:cancelOrderMutation }= useCancelOrder()
    const {  mutate:updateDistanceEtaMutation } = useUpdateDistanceEta()
    const { mutate:changeOrderStatusMutation } = useChangeOrderStatus()


    return (
        <>
            <Outlet />
            <AlertContainer />
            {isLoading ? (
                <MainLoader size={"large"} />
            ) : (
                order && (
                    <div className="grid grid-cols-1 md:grid-cols-5 bg-white h-screen">
                        {/* Order Details Section - Left Side */}
                        <div className="col-span-1 md:col-span-2 p-6 overflow-y-auto border-r border-gray-200 h-screen">
                            {/* Order details content remains the same */}
                            <div className="space-y-8">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Order #{order.trackingNo}</h1>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Created on {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <BadgeStatus status={order.orderStatus} />
                                    </div>
                                </div>

                                <OrderActions
                                    onChangeStatus={(value) => handleChangeOrderStatus(value)}
                                    onCancel={handleOrderCancellation}
                                    onConfirm={() => handleOrderConfirmation()}
                                    order={order}/>
                                {/* Route Information */}
                                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                                    <h2 className="font-semibold text-amber-800 flex items-center">
                                        <LucideMapPin className="h-5 w-5 mr-2"/>
                                        Delivery Information
                                    </h2>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Distance:</span>
                                            <span className="font-medium">
                                                {travelDistance || `${order.distance} ${order.distanceUnit}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Estimated Travel Time:</span>
                                            <span className="font-medium">{travelTime || "Calculating..."}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Delivery Await Time:</span>
                                            <span className="font-medium">
                                                {formatSecondsToDuration(order.deliveryAwaitTime)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Other sections remain the same */}
                                {/* Customer Information */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h2 className="font-semibold text-gray-900 flex items-center">
                                        <LucideUser className="h-5 w-5 mr-2" />
                                        Customer Details
                                    </h2>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-medium">
                                                {order.customer?.firstName} {order.customer?.middleName} {order.customer?.lastName}
                                            </span>
                                            <span className="text-gray-600 text-sm">{order.customer?.email}</span>
                                            <span className="text-gray-600 text-sm">{order.customer?.phone}</span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-gray-600 text-sm">
                                                {order.customer?.address}, {order.customer?.region}, {order.customer?.country}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Information */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h2 className="font-semibold text-gray-900 flex items-center">
                                        <LucideShoppingBag className="h-5 w-5 mr-2" />
                                        Order Details
                                    </h2>
                                    <div className="mt-3 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Gas Brand:</span>
                                            <span className="font-medium">{order.Price?.gasBrand}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Weight:</span>
                                            <span className="font-medium">{order.Price?.weight} {order.Price?.weightUnit}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Serial Number:</span>
                                            <span className="font-medium">{order.Device?.serialNumber}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Total Amount:</span>
                                                <span className="font-semibold">{formatCurrency(order.amount, order.currency)}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-gray-600">Paid Amount:</span>
                                                <span className="font-medium">{formatCurrency(order.paidAmount, order.currency)}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-gray-600">Pending Amount:</span>
                                                <span className="font-medium text-red-600">{formatCurrency(order.pendingAmount, order.currency)}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-gray-600">Payment Status:</span>
                                            <BadgeStatus status={order.paymentStatus} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map and Payments Section - Right Side */}
                        <div className="col-span-1 md:col-span-3 h-screen  flex flex-col">
                            {/* Map container with fixed height */}
                            <div className="h-4/6 min-h-[300px]">
                                {isLoaded ? (
                                    <>
                                        <GoogleMap
                                            mapContainerStyle={{...containerStyle, height: '100%'}}
                                            center={deviceCoordinates}
                                            zoom={10}
                                            options={{
                                                styles: mapStyles,
                                                disableDefaultUI: true,
                                                scrollwheel: true,
                                            }}
                                        >
                                            {/* Request directions */}
                                            {!directionsRequestedRef.current && (
                                                <DirectionsService
                                                    options={{
                                                        destination: deviceCoordinates,
                                                        origin: supplierCoordinates,
                                                        travelMode: window.google.maps.TravelMode.DRIVING
                                                    }}
                                                    callback={directionsCallback}
                                                />
                                            )}

                                            {/* Render the route */}
                                            {directions && (
                                                <DirectionsRenderer
                                                    options={{
                                                        directions: directions,
                                                        suppressMarkers: true, // Hide default A and B markers
                                                        preserveViewport: true,
                                                        polylineOptions: {
                                                            strokeColor: '#FFDD00',
                                                            strokeWeight: 4,
                                                            strokeOpacity: 0.8,
                                                            geodesic: true,
                                                            icons: [{
                                                                icon: {
                                                                    path: 'M 0,-1 0,1',
                                                                    strokeOpacity: 1,
                                                                    scale: 3,
                                                                },
                                                                offset: '0',
                                                                repeat: '15px'
                                                            }]
                                                        }
                                                    }}
                                                />
                                            )}

                                            {/* Device Marker - use route endpoint if available */}
                                            <OverlayViewF
                                                position={routeEndpoints.destination || deviceCoordinates}
                                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                            >
                                                <DeviceMarker device={order?.Device} customer={order?.customer} />
                                            </OverlayViewF>

                                            {/* Supplier Marker - use route endpoint if available */}
                                            <OverlayViewF
                                                position={routeEndpoints.origin || supplierCoordinates}
                                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                            >
                                                <SupplierMarker supplier={order?.supplier} />
                                            </OverlayViewF>
                                        </GoogleMap>

                                        {/* Travel information overlay */}
                                        {travelTime && travelDistance && (
                                            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10 max-w-xs">
                                                <h3 className="font-bold text-gray-900 flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    Route Details
                                                </h3>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Distance:</span>
                                                        <span className="font-medium">{travelDistance}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Travel Time:</span>
                                                        <span className="font-medium">{travelTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <MainLoader
                                        size="medium"
                                        fullScreen={false}
                                        message="Loading map..."
                                    />
                                )}
                            </div>

                            {/* Payments Section - With scrollable container */}
                            <div className="flex-1 bg-gray-50 py-6  px-4 overflow-hidden flex flex-col">
                                <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="font-semibold text-gray-900 flex items-center">
                                            <LucideCreditCard className="h-5 w-5 mr-2" />
                                            Payment History
                                        </h2>
                                        <div className={"flex gap-2 items-center"}>
                                            <button onClick={() => navigate(`payments`)}
                                                    className={"px-3 py-1.5 white-button"}>
                                                Payment history
                                            </button>
                                            <button
                                                onClick={() => navigate(`payment-form`)}
                                                className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                                            >
                                                Add Payment
                                            </button>
                                        </div>
                                    </div>

                                    {/* Payment Summary */}
                                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                        <div className="grid grid-cols-3 gap-3 text-sm">
                                            <div>
                                                <p className="text-gray-500">Total Amount</p>
                                                <p className="font-semibold">{formatCurrency(order.amount, order.currency)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Paid Amount</p>
                                                <p className="font-semibold text-green-600">{formatCurrency(order.paidAmount, order.currency)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Pending Amount</p>
                                                <p className="font-semibold text-red-600">{formatCurrency(order.pendingAmount, order.currency)}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default OrderDetails;