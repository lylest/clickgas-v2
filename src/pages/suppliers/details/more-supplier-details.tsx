
import { useParams, Outlet } from "react-router-dom";
import {
    MapPin, Phone, Mail, Calendar, Hash,
    Globe, MapIcon, FileImage, Shield, Building, LucideDownload
} from 'lucide-react';
import { format } from 'date-fns';

import TabLinks, { ITabLink } from "@/components/general/Tab.tsx";
import { permissions } from "@/pages/permissions-manager/check-permission.ts";
import PageFit from "@/components/general/PageFit.tsx";
import { useFilteredTabs } from "@/pages/permissions-manager/filter-tabs.ts";
import { useGetSupplierDetails } from "@/pages/suppliers/supplier-queries.ts";
import BadgeStatus from "@/components/badge-status.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
import {LongLat} from "@/types/map-typed.ts";
import {containerStyle, mapStyles} from "@/utils/map-helper.ts";
import {useState} from "react";
import MainLoader from "@/components/loaders/main-loader.tsx";

const libraries: ("places")[] = ["places"];

const SupplierDetails = () => {
    const { supplierId } = useParams();
    const { data: supplierResponse, isLoading } = useGetSupplierDetails(supplierId!, { enabled: !!supplierId });
    const supplier = supplierResponse?.data;

    const formatDate = (dateString: string): string => {
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    const getTabs = (): ITabLink[] => [
        {
            name: "Devices",
            url: `/suppliers/more-details/${supplierId}/devices`,
            pattern: new RegExp(`^/suppliers/more-details/${supplierId}/devices*`),
            permission: permissions.GET_SUPPLIER_DEVICES,
        },
        {
            name: "Customers",
            url: `/suppliers/more-details/${supplierId}/customers`,
            pattern: new RegExp(`^/suppliers/more-details/${supplierId}/customers*`),
            permission: permissions.GET_CUSTOMER_DETAILS,
        },
        {
            name: "Orders",
            url: `/suppliers/more-details/${supplierId}/orders`,
            pattern: new RegExp(`^/suppliers/more-details/${supplierId}/orders*`),
            permission: permissions.GET_ORDERS,
        },
    ];

    const filteredTabs = useFilteredTabs(getTabs());

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const [coordinates,] = useState<LongLat>({
        lat: supplier?.gpsCoordinates?.latitude ?? -6.822298,
        lng: supplier?.gpsCoordinates?.longitude ?? 39.229850
    });

    const {isLoaded} = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
        libraries,
    });

    if (isLoading || !supplier) {
        return (
            <PageFit>
                <div className="bg-neutral-50 border border-gray-200  dark:bg-neutral-800 rounded-lg">
                    <div className="px-6 py-4 border-b dark:border-neutral-700">
                        <h1 className="text-xl font-bold dark:text-neutral-50">Supplier Details</h1>
                    </div>
                    <>loading</>
                </div>
            </PageFit>
        );
    }

    // Handle image download
    const handleDownloadImage = () => {
        if (supplier?.Image?.bucketUrl) {
            const link = document.createElement('a');
            link.href = supplier.Image.bucketUrl;
            link.download = supplier.Image.name || `${getFullName()}-ID.${supplier.Image.ext || 'jpg'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Format full name function
    const getFullName = () => {
        if (!supplier) return '-';
        const {firstName, middleName, lastName} = supplier;
        return [firstName, middleName, lastName].filter(Boolean).join(' ');
    };

    return (
        <PageFit>
            <br/>
            <div className="bg-neutral-50 border border-gray-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="px-6 py-4 border-b dark:border-neutral-700 flex justify-between items-center">
                    <h1 className="text-xl font-bold dark:text-neutral-50">Supplier Details</h1>
                    <BadgeStatus status={supplier.supplierStatus || "unknown"}/>
                </div>

                {/* Profile Section */}
                <div className="px-6 py-6 border-b dark:border-neutral-700 flex">
                    <div className="mr-6">
                        <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-neutral-700">
                            {supplier.Image ? (
                                <AvatarImage src={supplier.Image.bucketUrl || "/placeholder.png"}
                                             alt={`${supplier.firstName} ${supplier.lastName}`}/>
                            ) : null}
                            <AvatarFallback
                                className="text-xl bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {getInitials(supplier.firstName, supplier.lastName)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-1 dark:text-white">
                            {`${supplier.firstName} ${supplier?.middleName ?? ""} ${supplier.lastName}`}
                        </h2>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <MapPin className="h-4 w-4 mr-2"/>
                            <span>{`${supplier.address}, ${supplier.region}, ${supplier.country}`}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <Phone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"/>
                                <span>{supplier.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <Mail className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"/>
                                <span>{supplier.email || "No email provided"}</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <Globe className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"/>
                                <span>{supplier.country}</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <Building className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"/>
                                <span>{supplier.region}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="px-6 py-6 border-b dark:border-neutral-700">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Additional Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <Shield className="h-4 w-4 mr-2"/>
                                <span className="text-sm">ID Type</span>
                            </div>
                            <p className="text-sm font-medium dark:text-white">{supplier.idType}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <Hash className="h-4 w-4 mr-2"/>
                                <span className="text-sm">ID Number</span>
                            </div>
                            <p className="text-sm font-medium dark:text-white">{supplier.idNumber}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <Calendar className="h-4 w-4 mr-2"/>
                                <span className="text-sm">Registered On</span>
                            </div>
                            <p className="text-sm font-medium dark:text-white">{formatDate(supplier.createdAt)}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <Calendar className="h-4 w-4 mr-2"/>
                                <span className="text-sm">Last Updated</span>
                            </div>
                            <p className="text-sm font-medium dark:text-white">{formatDate(supplier.updatedAt)}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <FileImage className="h-4 w-4 mr-2"/>
                                <span className="text-sm">ID Document</span>
                            </div>
                            <p className="text-sm font-medium dark:text-white">
                                {supplier.Image ? supplier.Image.name : "Not available"}
                            </p>
                            <button
                                onClick={handleDownloadImage}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 dark:text-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-colors"
                            >
                                <LucideDownload className="h-3.5 w-3.5 mr-1.5"/>
                                Download
                            </button>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <MapIcon className="h-4 w-4 mr-2"/>
                                <span className="text-sm">GPS Coordinates</span>
                            </div>
                            <p className="text-sm font-medium dark:text-white">
                                {supplier.gpsCoordinates ?
                                    `${supplier.gpsCoordinates.latitude}, ${supplier.gpsCoordinates.longitude}` :
                                    "Not available"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Preview (if coordinates are available) */}
                {supplier.gpsCoordinates && (
                    <div className="px-6 h-60 py-6 border-b dark:border-neutral-700">
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={coordinates}
                                zoom={10}
                                options={{
                                    styles: mapStyles,
                                    disableDefaultUI: true,
                                    scrollwheel: true,
                                }}
                            >
                                <MarkerF
                                    draggable={false}
                                    position={coordinates}
                                />
                            </GoogleMap>
                        ) : (
                            <MainLoader
                                size="medium"
                                fullScreen={false}
                                message="Processing map..."
                            />
                        )}
                    </div>
                )}

                {/* Tabs Navigation */}
                <TabLinks tabs={filteredTabs}/>

                {/* Tab Content */}
                <div className="px-6 py-6">
                    <Outlet/>
                </div>
            </div>
        </PageFit>
    );
};

export default SupplierDetails;