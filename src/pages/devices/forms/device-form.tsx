import {useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {PlusCircle, Smartphone} from "lucide-react";
import {useLocation, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import {capitalizeFirstLetter} from "@/utils";
import Pending from "@/components/loaders/pending/pending.tsx";
import useRouteModal from "@/hook/useRouteModal.tsx";
import Modal from "@/components/modal";
import ChipIcon from "@/components/general/ChipIcon.tsx";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import {GoogleMap, useLoadScript, MarkerF, Autocomplete} from '@react-google-maps/api';
import {containerStyle} from "@/utils/map-helper.ts";
import MainLoader from "@/components/loaders/main-loader.tsx";
import {IDeviceForm} from "@/types/device";
import {useAddDevice, useUpdateDevice} from "@/pages/devices/device-queries.ts";

// For Google Maps Places API
const libraries: ("places")[] = ["places"];

const DeviceForm = () => {
    const {action} = useParams();
    const {state: routeState} = useLocation();
    const baseUrl = "/devices"

    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Form validation schema
    const deviceFormSchema = Yup.object({
        serialNumber: Yup.string()
            .required("Serial number is required")
            .min(5, "Serial number must be at least 5 characters")
            .max(50, "Serial number cannot exceed 50 characters"),
        latitude: Yup.number()
            .typeError("Latitude must be a valid number (e.g., -6.822298)")
            .required("Latitude is required")
            .min(-90, "Latitude must be between -90 and 90")
            .max(90, "Latitude must be between -90 and 90")
            .transform((_value, originalValue) =>
                typeof originalValue === "string" && originalValue === "" ? NaN : Number(originalValue)
            ),
        longitude: Yup.number()
            .typeError("Longitude must be a valid number (e.g., 39.229850)")
            .required("Longitude is required")
            .min(-180, "Longitude must be between -180 and 180")
            .max(180, "Longitude must be between -180 and 180")
            .transform((_value, originalValue) =>
                typeof originalValue === "string" && originalValue === "" ? NaN : Number(originalValue)
            ),
    });

    type DeviceFormFieldsValues = Yup.InferType<typeof deviceFormSchema>;

    // Default coordinates (can be adjusted as needed)
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
        lat: -6.822298,
        lng: 39.229850
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    // Load Google Maps
    const {isLoaded} = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
        libraries,
    });

    const {
        formState: {errors},
        register,
        control,
        setValue,
        handleSubmit,
    } = useForm<DeviceFormFieldsValues>({
        resolver: yupResolver(deviceFormSchema),
        defaultValues: {
            serialNumber: routeState?.serialNumber ?? "",
            latitude: routeState?.gpsCoordinates?.latitude ?? -6.822298,
            longitude: routeState?.gpsCoordinates?.longitude ?? 39.229850,
        },
    });

    // Update coordinates and form values
    const updateCoordinateFields = (newCoordinates: { lat: number; lng: number }) => {
        setCoordinates(newCoordinates);
        setValue('latitude', newCoordinates.lat);
        setValue('longitude', newCoordinates.lng);
    };

    // Get current location
    const handleAddCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    updateCoordinateFields(newCoords);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    };

    // Update marker position on map click
    const setPickedLocation = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const newCoords = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
            updateCoordinateFields(newCoords);
        }
    };

    // Handle Google Places Autocomplete
    const onLoad = (autoC: google.maps.places.Autocomplete) => {
        setAutocomplete(autoC);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
                const newCoords = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                updateCoordinateFields(newCoords);
            }
        }
    };

    // Form fields configuration
    const deviceFormFields: IFormField[] = [
        {
            register,
            control,
            name: "serialNumber",
            label: "Serial Number",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "Enter device serial number",
            type: "text",
            hasError: !!errors.serialNumber?.message,
            showErrorMessage: !!errors.serialNumber?.message,
            errorMessage: errors.serialNumber?.message,
        },
        {
            register,
            control,
            setValue,
            name: "latitude",
            label: "Latitude",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "-6.822298",
            type: "text",
            hasError: !!errors.latitude?.message,
            showErrorMessage: !!errors.latitude?.message,
            errorMessage: errors.latitude?.message,
        },
        {
            register,
            control,
            setValue,
            name: "longitude",
            label: "Longitude",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "39.229850",
            type: "text",
            hasError: !!errors.longitude?.message,
            showErrorMessage: !!errors.longitude?.message,
            errorMessage: errors.longitude?.message,
        },
    ];

    // Form submission handler
    const onSubmit = (formValues: DeviceFormFieldsValues) => {
        const deviceData: IDeviceForm = {
            serialNumber: formValues.serialNumber,
            gpsCoordinates: {
                latitude: formValues.latitude,
                longitude: formValues.longitude
            }
        };

        if (action === "add") {
            addDeviceMutation(deviceData);
        } else {
            updateDeviceMutation({
                data: deviceData,
                deviceId: routeState?.id ?? ""
            })
        }

    };

    const {mutate: addDeviceMutation, isPending} = useAddDevice({onSuccess: closeModal})
    const {mutate: updateDeviceMutation, isPending: isUpdating} = useUpdateDevice({onSuccess: closeModal})
    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[50rem] modal-container flex flex-col"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} Device`}
                    onClose={closeModal}
                />

                <div className="w-full px-4 py-6 overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <ChipIcon
                                Icon={<Smartphone className="h-5 w-5 text-slate-500"/>}
                            />
                            <h2 className="text-lg font-medium">Device Details</h2>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={handleAddCurrentLocation}
                        >
                            <PlusCircle className="h-4 w-4"/>
                            <span>Add Current Location</span>
                        </Button>
                    </div>

                    {/* Map Component */}
                    <div className="w-full h-52 mb-4 rounded-lg overflow-hidden border">
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={coordinates}
                                zoom={10}
                                onClick={setPickedLocation}
                            >
                                <MarkerF
                                    draggable={true}
                                    position={coordinates}
                                    onDragEnd={(e) => setPickedLocation(e)}
                                />
                            </GoogleMap>
                        ) : (
                            <MainLoader
                                size="medium"
                                fullScreen={false}
                                message="Loading map..."
                            />
                        )}
                    </div>

                    {/* Search Location */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Location</label>
                        <div className="relative">
                            {isLoaded && (
                                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                    <input
                                        type="text"
                                        placeholder="Search for device location..."
                                        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </Autocomplete>
                            )}
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        {deviceFormFields.map((field) => generateFormField(field))}
                    </div>
                </div>

                <div
                    className="px-6 py-4 bg-gray-50 dark:bg-neutral-700/40 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={() => closeModal()}
                            className="py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
                        >
                            <Pending isLoading={isPending || isUpdating}/>
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default DeviceForm;