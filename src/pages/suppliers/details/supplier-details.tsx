import {FC, Fragment, useState} from 'react';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal";
import SlideOver from "@/components/sideover";
import {useGetSupplierDetails} from "@/pages/suppliers/supplier-queries";
import BadgeStatus from "@/components/badge-status";
import {
    LucideChevronLeft,
    LucidePhone,
    LucideMapPin,
    LucideCalendar,
    LucideEdit,
    LucideMail,
    LucideMap,
    LucideIdCard,
    LucideDownload
} from "lucide-react";
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
import {LongLat} from "@/types/map-typed.ts";
import {containerStyle} from "@/utils/map-helper.ts";
import MainLoader from "@/components/loaders/main-loader.tsx";
import {ISupplierDetails} from "@/types/supplier";
import {localStorageKeys, saveValueToLocalStorage} from "@/utils/local-storage.ts";

const libraries: ("places")[] = ["places"];

const SupplierDetails: FC = () => {
    const {supplierId} = useParams();
    const navigate = useNavigate();
    const {state: routeState} = useLocation();
    const baseUrl = routeState?.goBackTo ?? '/suppliers';

    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const {data: supplier, isLoading} = useGetSupplierDetails(supplierId!, {enabled: !!supplierId});

    // Format full name function
    const getFullName = () => {
        if (!supplier?.data) return '-';
        const {firstName, middleName, lastName} = supplier.data;
        return [firstName, middleName, lastName].filter(Boolean).join(' ');
    };

    // Format address function
    const getFormattedAddress = () => {
        if (!supplier?.data) return '-';
        const {address, region, country} = supplier.data;
        return [address, region, country].filter(Boolean).join(', ');
    };

    // Handle image download
    const handleDownloadImage = () => {
        if (supplier?.data?.Image?.bucketUrl) {
            const link = document.createElement('a');
            link.href = supplier.data.Image.bucketUrl;
            link.download = supplier.data.Image.name || `${getFullName()}-ID.${supplier.data.Image.ext || 'jpg'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const [coordinates, ] = useState<LongLat>({
        lat: supplier?.data?.gpsCoordinates?.latitude ?? -6.822298,
        lng: supplier?.data?.gpsCoordinates?.longitude ?? 39.229850
    });

    const {isLoaded} = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
        libraries,
    });

    function handleEditSupplier(row: ISupplierDetails) {
        const basicDetails = {
            supplierId:row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            middleName:row?.middleName ?? null,
            phone: row.phone,
        }

        const locationDetails = {
            country: row.country,
            region: row.region,
            address: row.address,
            latitude: row.gpsCoordinates.latitude,
            longitude: row.gpsCoordinates.longitude,
            coordinates: {
                lat: row.gpsCoordinates.latitude,
                lng: row.gpsCoordinates.longitude,
            },

        }

        const idDetails = {
            idType: row.idType,
            idImage: row.idImage,
            idNumber: row.idNumber,
            Image:row.Image,
        }
        console.log(locationDetails)
        saveValueToLocalStorage(localStorageKeys.supplier_form?.BASIC_SUPPLIER_DETAILS,basicDetails)
        saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_LOCATION_DETAILS, locationDetails);
        saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_ID_DETAILS, idDetails);
        navigate("/suppliers/form/edit");
    }

    return (
        <Fragment>
            <SlideOver open={open} onClose={closeModal}>
                <div className="flex flex-col w-full lg:w-[32rem] h-full bg-white dark:bg-neutral-800 overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500 dark:text-gray-400">Loading supplier details...</p>
                        </div>
                    ) : (
                        <>
                            {/* Hero section with supplier image */}
                            <div className="relative h-48 bg-gradient-to-r from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-700 overflow-hidden">
                                {supplier?.data?.Image?.bucketUrl && (
                                    <div className="absolute inset-0">
                                        <img
                                            src={supplier.data.Image.bucketUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                        {/* Gradient overlay for better text visibility */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                )}

                                {/* Back button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
                                >
                                    <LucideChevronLeft className="h-5 w-5"/>
                                </button>

                                {/* Supplier info positioned at bottom */}
                                <div className="absolute bottom-4 left-6 right-6">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <BadgeStatus status={supplier?.data?.supplierStatus ?? ""}/>
                                            <h1 className="text-2xl font-bold text-white mt-1">{getFullName()}</h1>
                                            <div className="flex items-center mt-1 text-white/80">
                                                <LucideIdCard className="h-4 w-4 mr-1.5 flex-shrink-0"/>
                                                <span className="text-sm">{supplier?.data?.idNumber || 'No ID'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Supplier details content */}
                            <div className="flex-1 px-6 py-6 overflow-y-auto">
                                {/* Contact information card */}
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-900/30 mb-6">
                                    <h3 className="text-sm font-medium text-green-900 dark:text-green-200 mb-4">
                                        Contact Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-lg bg-green-100 dark:bg-green-800/40 flex items-center justify-center mr-3.5">
                                                <LucidePhone className="h-4.5 w-4.5 text-green-600 dark:text-green-300"/>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
                                                    {supplier?.data?.phone || 'Not provided'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-lg bg-green-100 dark:bg-green-800/40 flex items-center justify-center mr-3.5">
                                                <LucideMail className="h-4.5 w-4.5 text-green-600 dark:text-green-300"/>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
                                                    {supplier?.data?.email || 'Not provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location information */}
                                <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700 mb-6">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-neutral-100 mb-4 flex items-center">
                                        <LucideMapPin className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400"/>
                                        Location Details
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Address</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {getFormattedAddress()}
                                            </p>
                                        </div>

                                        {supplier?.data?.gpsCoordinates && (
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 flex items-center">
                                                    <LucideMap className="h-3 w-3 mr-1.5"/>
                                                    GPS Coordinates
                                                </p>
                                                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3.5 border border-gray-200 dark:border-neutral-700">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Latitude</p>
                                                            <p className="text-sm font-mono text-gray-900 dark:text-white mt-0.5">
                                                                {supplier.data.gpsCoordinates.latitude}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Longitude</p>
                                                            <p className="text-sm font-mono text-gray-900 dark:text-white mt-0.5">
                                                                {supplier.data.gpsCoordinates.longitude}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Google map */}
                                                <div className="mt-4 bg-white h-60 w-full dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 overflow-hidden">
                                                    {isLoaded ? (
                                                        <GoogleMap
                                                            mapContainerStyle={containerStyle}
                                                            center={coordinates}
                                                            zoom={10}
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
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ID information */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                                        <p className="text-xs text-gray-500 dark:text-neutral-500 mb-1.5 flex items-center">
                                            <LucideIdCard className="h-3 w-3 mr-1.5"/>
                                            ID Type
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {supplier?.data?.idType || '-'}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                                        <p className="text-xs text-gray-500 dark:text-neutral-500 mb-1.5 flex items-center">
                                            <LucideIdCard className="h-3 w-3 mr-1.5"/>
                                            ID Number
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {supplier?.data?.idNumber || '-'}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                                        <p className="text-xs text-gray-500 dark:text-neutral-500 mb-1.5 flex items-center">
                                            <LucideCalendar className="h-3 w-3 mr-1.5"/>
                                            Created On
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {supplier?.data?.createdAt
                                                ? new Date(supplier.data.createdAt).toLocaleDateString()
                                                : '-'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* ID Image section with download button */}
                                {supplier?.data?.Image?.bucketUrl && (
                                    <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700 mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-neutral-100">
                                                ID Document
                                            </h3>
                                            <button
                                                onClick={handleDownloadImage}
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 dark:text-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-colors"
                                            >
                                                <LucideDownload className="h-3.5 w-3.5 mr-1.5"/>
                                                Download
                                            </button>
                                        </div>

                                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                                            <div>
                                                <p>File: {supplier?.data?.Image?.name || '-'}</p>
                                                <p className="mt-1">Size: {supplier?.data?.Image?.size ? `${Math.round(supplier?.data?.Image?.size / 1024)} KB` : '-'}</p>
                                            </div>
                                            <button
                                                onClick={handleDownloadImage}
                                                className="flex items-center justify-center h-9 w-9 rounded-lg bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors"
                                                title="Download ID Image"
                                            >
                                                <LucideDownload className="h-4 w-4 text-gray-600 dark:text-gray-300"/>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="flex-none p-6 border-t border-gray-200 dark:border-neutral-700">
                                <div className="flex gap-4">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-neutral-200 bg-gray-100 dark:bg-neutral-700 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-neutral-800"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() =>   supplier?.data ? handleEditSupplier(supplier.data): console.log("no supplier details")}
                                        className="flex-1 px-4 py-3 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-neutral-800 transition-all duration-200 flex items-center justify-center"
                                    >
                                        <LucideEdit className="h-4 w-4 mr-2"/>
                                        Edit Supplier
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </SlideOver>
        </Fragment>
    );
};

export default SupplierDetails;