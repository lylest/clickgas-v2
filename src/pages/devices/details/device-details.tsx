import {Fragment} from "react";
import {Outlet, useParams, Link, useNavigate} from "react-router-dom";
import { format } from "date-fns";
import {
    Cpu, Battery, Calendar, MapPin, Hash,
    Activity, User, Truck, ShoppingBag,
    Edit, AlertTriangle, Clock
} from "lucide-react";
import SlideOver from "@/components/sideover";
import useRouteModal from "@/hook/useRouteModal.tsx";
import { useGetDeviceDetails, useGetDeviceReadings } from "@/pages/devices/device-queries.ts";
import { useGetSupplierDeviceDetails } from "@/pages/supplier_devices/supplier_devices_queries.ts";
import { useGetCustomerDeviceByDeviceId } from "@/pages/customer-devices/customer-devices-queries.ts";
import SlideOverSkeleton from "@/components/skeletons/slide-over-skeleton.tsx";
import { IDevice } from "@/types/device";
import BadgeStatus from "@/components/badge-status.tsx";
import {ICustomer} from "@/types/customer";
import {ISupplierDetails} from "@/types/supplier";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const DeviceDetails = () => {
    const { deviceId } = useParams();
    const baseUrl = '/devices';
    const navigate = useNavigate();

    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const { data: deviceResponse, isLoading } = useGetDeviceDetails(deviceId!, { enabled: !!deviceId });
    const { data: supplier } = useGetSupplierDeviceDetails(deviceId!, { enabled: !!deviceId });
    const { data: readings } = useGetDeviceReadings(deviceId!, 1, 3);
    const { data: customer } = useGetCustomerDeviceByDeviceId(deviceId!, { enabled: !!deviceId });


    const device: IDevice | undefined = deviceResponse?.data;

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "LLL dd, yyyy");
        } catch {
            return "N/A";
        }
    };

    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "LLL dd, yyyy HH:mm");
        } catch {
            return "N/A";
        }
    };

    const getFullName = (person?: ICustomer | ISupplierDetails) => {
        if (!person) return "Not Assigned";

        let fullName = person.firstName || "";
        if (person.middleName) fullName += ` ${person.middleName}`;
        if (person.lastName) fullName += ` ${person.lastName}`;

        return fullName || "Unnamed";
    };

    const getCoordinates = (coords?: { latitude: number; longitude: number }) => {
        if (!coords) return "Not available";
        return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
    };

    const getGoogleMapsUrl = (coords?: { latitude: number; longitude: number }) => {
        if (!coords) return "#";
        return `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    };

    return (
        <>
            <Fragment>
                <SlideOver open={open} onClose={closeModal}>
                    <Outlet />
                    <div className="flex flex-col w-full lg:w-[40rem] h-full bg-gray-50 dark:bg-neutral-800 overflow-hidden">
                        {/* Header */}
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Device Details</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {isLoading ? (
                            <SlideOverSkeleton />
                        ) : (
                            <div className="flex flex-col h-full overflow-hidden">
                                {/* Device Profile Section */}
                                <div className="bg-white dark:bg-neutral-800 px-6 py-5">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                <Cpu className="h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
                                                    {device?.serialNumber || "Unknown Device"}
                                                </h3>
                                                <BadgeStatus status={device?.deviceStatus ?? "active"} />
                                            </div>
                                            <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span>{getCoordinates(device?.gpsCoordinates)}</span>
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                                <Can permission={permissions.UPDATE_DEVICE} messageScreen={false}>
                                                <button onClick={()=>  navigate("/devices/form/edit", { state: device })} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                                                    <Edit className="h-3 w-3 inline mr-1" />
                                                    Edit
                                                </button>
                                                </Can>
                                                <a
                                                    href={getGoogleMapsUrl(device?.gpsCoordinates)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                                                >
                                                    <MapPin className="h-3 w-3 inline mr-1" />
                                                    View on Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="bg-white dark:bg-gray-800 p-6 space-y-6">
                                        {/* Latest Readings Section */}
                                        {readings?.data && readings.data.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">LATEST READINGS</h4>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex flex-col items-center">
                                                        <Activity className="h-6 w-6 text-blue-500 dark:text-blue-400 mb-2" />
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Amount</div>
                                                        <div className="text-lg font-semibold">{readings.data[0]?.amount || "N/A"}</div>
                                                    </div>
                                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex flex-col items-center">
                                                        <Battery className="h-6 w-6 text-green-500 dark:text-green-400 mb-2" />
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Battery</div>
                                                        <div className="text-lg font-semibold">{readings.data[0]?.battery || "N/A"}%</div>
                                                    </div>
                                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex flex-col items-center">
                                                        <Clock className="h-6 w-6 text-purple-500 dark:text-purple-400 mb-2" />
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Last Updated</div>
                                                        <div className="text-sm font-semibold">{formatDate(readings.data[0]?.createdAt || "")}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">READING HISTORY</h5>
                                                    <div className="space-y-2">
                                                        {readings.data.map((reading, index) => (
                                                            <div key={reading.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                                                                <div className="flex-1">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Reading #{index + 1}</div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(reading.createdAt)}</div>
                                                                    </div>
                                                                    <div className="mt-1 grid grid-cols-2 gap-x-4">
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                            Amount: <span className="font-medium text-gray-900 dark:text-white">{reading.amount}</span>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                            Battery: <span className="font-medium text-gray-900 dark:text-white">{reading.battery}%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Device Information Section */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">DEVICE INFORMATION</h4>
                                            <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750">
                                                    <Hash className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Serial Number</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{device?.serialNumber || "Not provided"}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">GPS Coordinates</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{getCoordinates(device?.gpsCoordinates)}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                    <AlertTriangle className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Status</div>
                                                        <div className="text-sm">
                                                            <BadgeStatus status={device?.deviceStatus ?? "active"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Created Date</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(device?.createdAt || "")}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Last Updated</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(device?.updatedAt || "")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Assignment Information */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">ASSIGNMENT INFORMATION</h4>
                                            <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750">
                                                    <User className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Assigned Customer</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {customer?.data?.customer ? getFullName(customer.data.customer) : "No assigned customer"}
                                                        </div>
                                                    </div>
                                                    {customer?.data?.customer && (
                                                        <Link
                                                            to={`/customers/details/${customer.data.customerId}`}
                                                            className="px-3 py-1 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                                                        >
                                                            <User className="h-3 w-3 inline mr-1" />
                                                            View Customer
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                    <Truck className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Assigned Supplier</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {supplier?.data?.supplier ? getFullName(supplier.data.supplier) : "No assigned supplier"}
                                                        </div>
                                                    </div>
                                                    {supplier?.data?.supplier && (
                                                        <Link
                                                            to={`/suppliers/details/${supplier.data.supplierId}`}
                                                            className="px-3 py-1 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                                                        >
                                                            <Truck className="h-3 w-3 inline mr-1" />
                                                            View Supplier
                                                        </Link>
                                                    )}
                                                </div>
                                                {customer?.data?.Price && (
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <ShoppingBag className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Pricing Information</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                <div>Brand: {customer.data.Price.gasBrand}</div>
                                                                <div>Weight: {customer.data.Price.weight} {customer.data.Price.weightUnit}</div>
                                                                <div>Price: {customer.data.Price.sellingPrice} {customer.data.Price.currency}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {customer?.data?.assignedDate && (
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Assignment Date</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {formatDate(customer.data.assignedDate)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {customer?.data?.assignedBy && (
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <User className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Assigned By</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {customer.data.User?.userName || "Unknown"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </SlideOver>
            </Fragment>
        </>
    );
};

export default DeviceDetails;