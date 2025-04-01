import { FC, useState } from "react";
import { motion } from "framer-motion";
import {MapPin, Cpu, User, Phone, LucideCpu} from "lucide-react";
import { IDevice } from "@/types/device";
import { ICustomer } from "@/types/customer";
import {
     Popover,
     PopoverContent,
     PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
     device: IDevice;
     customer: ICustomer;
}

const DeviceMarker: FC<Props> = ({ device, customer }) => {
     const [, setIsHovered] = useState(false);

     // Primary color for the marker (based on device status)
     const getMarkerColor = (status: string) => {
          switch (status?.toLowerCase()) {
               case "active":
                    return "#6067f4"; // blue
               case "inactive":
                    return "#6b7280"; // gray
               case "error":
                    return "#dc2626"; // red
               default:
                    return "#0891b2"; // cyan (default)
          }
     };

     const primaryColor = getMarkerColor(device.deviceStatus);

     // Format GPS coordinates to be more readable
     const formatCoordinates = (coords: { latitude: number; longitude: number }) => {
          return {
               lat: coords.latitude.toFixed(6),
               lng: coords.longitude.toFixed(6)
          };
     };

     // Get customer full name
     const getCustomerName = () => {
          if (!customer) return "No Customer";

          let name = customer.firstName;
          if (customer.middleName) name += ` ${customer.middleName}`;
          name += ` ${customer.lastName}`;

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


     return (
         <Popover>
              <PopoverTrigger asChild>
                   <div className="relative cursor-pointer">
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


                        {/* Marker - no motion variants applied */}
                        <div className="relative z-10">
                             <div
                                 className="w-8 h-8 rounded-full flex items-center justify-center"
                                 style={{ backgroundColor: primaryColor }}
                                 onMouseEnter={() => setIsHovered(true)}
                                 onMouseLeave={() => setIsHovered(false)}
                             >
                                  <LucideCpu className={"w-4 h-4 text-white"} />
                             </div>
                        </div>
                   </div>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                   <div className="flex flex-col">
                        {/* Header */}
                        <div
                            className="p-4 rounded-t-lg flex items-center gap-3"
                            style={{ backgroundColor: `${primaryColor}15` }} // 15% opacity of the primary color
                        >
                             <div
                                 className="p-2 rounded-full"
                                 style={{ backgroundColor: `${primaryColor}30` }} // 30% opacity of the primary color
                             >
                                  <Cpu className="h-5 w-5" style={{ color: primaryColor }} />
                             </div>
                             <div>
                                  <h3 className="font-medium text-gray-900 dark:text-white">
                                       {device.serialNumber}
                                  </h3>
                                  <div
                                      className="text-xs mt-1 px-2 py-0.5 rounded-full inline-flex items-center"
                                      style={{
                                           backgroundColor: `${primaryColor}20`, // 20% opacity
                                           color: primaryColor
                                      }}
                                  >
                                       {device.deviceStatus}
                                  </div>
                             </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                             {/* Device location */}
                             <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                       <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                       <div className="text-xs text-gray-500 dark:text-gray-400">Location (GPS)</div>
                                       <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {device.gpsCoordinates
                                                ? `${formatCoordinates(device.gpsCoordinates).lat}, ${formatCoordinates(device.gpsCoordinates).lng}`
                                                : "No location data"
                                            }
                                       </div>
                                  </div>
                             </div>

                             {/* Customer info */}
                             <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                       <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                       <div className="text-xs text-gray-500 dark:text-gray-400">Customer</div>
                                       <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {getCustomerName()}
                                       </div>
                                  </div>
                             </div>

                             {/* Customer phone */}
                             {customer?.phone && (
                                 <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 mt-0.5">
                                           <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                      </div>
                                      <div>
                                           <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                                           <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {customer.phone}
                                           </div>
                                      </div>
                                 </div>
                             )}

                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                             <button
                                 className="w-full px-3 py-2 text-sm rounded-md text-white transition-colors"
                                 style={{ backgroundColor: primaryColor }}
                             >
                                  View Details
                             </button>
                        </div>
                   </div>
              </PopoverContent>
         </Popover>
     );
};

export default DeviceMarker;