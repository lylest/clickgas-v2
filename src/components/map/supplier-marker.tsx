import { FC, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Store, User, Phone } from "lucide-react";
import { ISupplierDetails } from "@/types/supplier";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
    supplier: ISupplierDetails;
    isSelected?: boolean;
}

const SupplierMarker: FC<Props> = ({ supplier, isSelected = false }) => {
    const [isHovered, ] = useState(false);

    // Primary color for supplier markers
    const primaryColor = "#F59E0B"; // amber-500/yellow

    // Format GPS coordinates to be more readable
    const formatCoordinates = (coords: { latitude: number; longitude: number }) => {
        return {
            lat: coords.latitude.toFixed(6),
            lng: coords.longitude.toFixed(6)
        };
    };

    // Get supplier full name
    const getSupplierName = () => {
        if (!supplier) return "Unknown Supplier";

        let name = supplier.firstName;
        if (supplier.middleName) name += ` ${supplier.middleName}`;
        name += ` ${supplier.lastName}`;

        return name;
    };

    // First pulse ring animation
    const primaryPulseVariants = {
        pulse: {
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.1, 0.2],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Secondary pulse ring animation (slightly delayed)
    const secondaryPulseVariants = {
        pulse: {
            scale: [1, 2.2, 1],
            opacity: [0.15, 0.05, 0.15],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5 // Offset from primary ring
            }
        }
    };

    // Bubble animation
    const bubbleVariants = {
        initial: { opacity: 0, y: 10, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 500, damping: 30 }
        },
        hide: {
            opacity: 0,
            y: 10,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className="relative cursor-pointer group"
                >
                    <motion.div
                        className="absolute -top-24 left-1/2 transform -translate-x-1/2 p-4 rounded-lg bg-white shadow-md z-20 whitespace-nowrap border border-gray-200 w-64"
                        initial="initial"
                        animate={(isHovered || isSelected) ? "show" : "hide"}
                        variants={bubbleVariants}
                    >
                        <div className="text-sm font-medium text-gray-900 mb-1">
                            Supplier: {getSupplierName()}
                        </div>
                        <div className="text-xs text-gray-600">
                            {supplier?.address}
                        </div>
                        <div
                            className="absolute h-3 w-3 bg-white border-r border-b border-gray-200 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                    </motion.div>

                    {/* Primary pulse ring effect */}
                    <motion.div
                        variants={primaryPulseVariants}
                        animate="pulse"
                        className="absolute rounded-full"
                        style={{
                            backgroundColor: primaryColor,
                            opacity: 0.2,
                            width: "34px",
                            height: "34px",
                            left: "-1px",
                            top: "-1px",
                            zIndex: 1
                        }}
                    />

                    {/* Secondary pulse ring effect */}
                    <motion.div
                        variants={secondaryPulseVariants}
                        animate="pulse"
                        className="absolute rounded-full"
                        style={{
                            backgroundColor: primaryColor,
                            opacity: 0.15,
                            width: "34px",
                            height: "34px",
                            left: "-1px",
                            top: "-1px",
                            zIndex: 0
                        }}
                    />

                    {/* Marker circle */}
                    <div className="relative z-10">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{backgroundColor: primaryColor}}
                        >
                            <Store className="w-4 h-4 text-white"/>
                        </div>
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent
                className="w-80 p-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col">
                    {/* Header */}
                    <div
                        className="p-4 rounded-t-lg flex items-center gap-3"
                        style={{backgroundColor: `${primaryColor}15`}} // 15% opacity of the primary color
                    >
                        <div
                            className="p-2 rounded-full"
                            style={{backgroundColor: `${primaryColor}30` }} // 30% opacity of the primary color
                        >
                            <Store className="h-5 w-5" style={{ color: primaryColor }} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                                {getSupplierName()}
                            </h3>
                            <div
                                className="text-xs mt-1 px-2 py-0.5 rounded-full inline-flex items-center"
                                style={{
                                    backgroundColor: `${primaryColor}20`, // 20% opacity
                                    color: primaryColor
                                }}
                            >
                                {supplier.supplierStatus || "Active"}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                        {/* Location */}
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Location</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {supplier.address}, {supplier.region}, {supplier.country}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                    {supplier.gpsCoordinates
                                        ? `${formatCoordinates(supplier.gpsCoordinates).lat}, ${formatCoordinates(supplier.gpsCoordinates).lng}`
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Contact</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {supplier.email || "No email provided"}
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        {supplier?.phone && (
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {supplier.phone}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ID Info */}
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                    <circle cx="9" cy="10" r="2" />
                                    <path d="M15 8h2" />
                                    <path d="M15 12h2" />
                                    <path d="M7 16h10" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">ID Information</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {supplier.idType}: {supplier.idNumber}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                        <button
                            className="w-full px-3 py-2 text-sm rounded-md text-white transition-colors"
                            style={{ backgroundColor: primaryColor }}
                        >
                            View Supplier Details
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SupplierMarker;