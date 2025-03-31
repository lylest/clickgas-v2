import {useState} from "react";
import ChipIcon from "@/components/general/ChipIcon.tsx";
import {LucideMapPinned, PlusCircle} from "lucide-react";
import FormAction from "@/pages/suppliers/form/form-action.tsx";
import {Button} from "@/components/ui/button";
import {LongLat} from "@/types/map-typed.ts";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import { GoogleMap, useLoadScript, MarkerF, Autocomplete} from '@react-google-maps/api';
import {containerStyle} from "@/utils/map-helper.ts";
import MainLoader from "@/components/loaders/main-loader.tsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate, useParams} from "react-router-dom";
import {getValueFromLocalStorage, localStorageKeys, saveValueToLocalStorage} from "@/utils/local-storage.ts";

const libraries: ("places")[] = ["places"];

const SupplierLocationDetails = () => {
    const {action} = useParams();
    const navigate = useNavigate();
    const defaultValues = getValueFromLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_LOCATION_DETAILS);

    const [coordinates, setCoordinates] = useState<LongLat>(defaultValues?.coordinates || {
        lat: -6.822298,
        lng: 39.229850
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const { isLoaded } = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
        libraries,
    });

    const supplierLocationSchema = Yup.object({
        country: Yup.string()
            .required("Country is required")
            .min(2, "Country must be at least 2 characters")
            .max(50, "Country cannot exceed 50 characters"),
        region: Yup.string()
            .required("Region is required")
            .min(2, "Region must be at least 2 characters")
            .max(50, "Region cannot exceed 50 characters"),
        address: Yup.string()
            .required("Address is required")
            .min(5, "Address must be at least 5 characters")
            .max(200, "Address cannot exceed 200 characters"),
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

    type SupplierLocationFormFieldsValues = Yup.InferType<typeof supplierLocationSchema>;

    const {
        formState: {errors},
        register,
        control,
        setValue,
        handleSubmit,
    } = useForm<SupplierLocationFormFieldsValues>({
        resolver: yupResolver(supplierLocationSchema),
        defaultValues: {
            ...defaultValues,
            latitude: defaultValues?.coordinates?.lat ?? "",
            longitude: defaultValues?.coordinates?.lng ??  "",
        },
    });

    // Set latitude and longitude in form when coordinates change
    const updateCoordinateFields = (newCoordinates: LongLat) => {
        setCoordinates(newCoordinates);
        setValue('latitude', newCoordinates.lat);
        setValue('longitude', newCoordinates.lng);
    };

    const handleAddMarker = () => {
        // Get current geolocation if available
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

    const setPickedLocation = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const newCoords = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
            updateCoordinateFields(newCoords);
        }
    };

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

                // Try to extract and set address details
                if (place.address_components) {
                    const addressComponents = place.address_components;

                    // Extract country
                    const country = addressComponents.find(
                        component => component.types.includes("country")
                    );
                    if (country) {
                        setValue('country', country.long_name);
                    }

                    // Extract region/state
                    const region = addressComponents.find(
                        component => component.types.includes("administrative_area_level_1")
                    );
                    if (region) {
                        setValue('region', region.long_name);
                    }

                    // Set full address
                    if (place.formatted_address) {
                        setValue('address', place.formatted_address);
                    }
                }
            }
        }
    };

    const supplierLocationFormFields: IFormField[] = [
        {
            register,
            control,
            name: "country",
            label: "Country",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "e.g., Tanzania",
            type: "text",
            hasError: !!errors.country?.message,
            showErrorMessage: !!errors.country?.message,
            errorMessage: errors.country?.message,
        },
        {
            register,
            control,
            name: "region",
            label: "Region",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "e.g., Dar-es-salaam",
            type: "text",
            hasError: !!errors.region?.message,
            showErrorMessage: !!errors.region?.message,
            errorMessage: errors.region?.message,
        },
        {
            register,
            control,
            name: "address",
            label: "Address",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "e.g., 456 Kimara, Morogoro",
            type: "text",
            hasError: !!errors.address?.message,
            showErrorMessage: !!errors.address?.message,
            errorMessage: errors.address?.message,
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

    const onSubmit = (formValues: SupplierLocationFormFieldsValues) => {
        saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_LOCATION_DETAILS, {
            ...formValues,
            coordinates: {
                lat: formValues.latitude,
                lng: formValues.longitude
            }
        });
        navigate(`/suppliers/form/${action}/supplier-id-details`); // Adjust the next route as needed
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full px-4 py-6 h-[70vh] overflow-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <ChipIcon
                            Icon={<LucideMapPinned className="h-5 w-5 text-slate-500"/>}
                        />
                        <h2 className="text-lg font-medium">Locations Details</h2>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={handleAddMarker}
                    >
                        <PlusCircle className="h-4 w-4"/>
                        <span>Add Current Location</span>
                    </Button>
                </div>

                {/* Map Component */}
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden border">
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
                            message="Processing map..."
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
                                    placeholder="Search supplier address..."
                                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </Autocomplete>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4  ">
                    {supplierLocationFormFields.map((field) => generateFormField(field))}
                </div>
            </div>

            <FormAction
                currentPage={2}
                stepsCount={3}
                hasPrevious={true}
            />
        </form>
    );
};

export default SupplierLocationDetails;