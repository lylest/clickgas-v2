import { Fragment, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
    User, Phone, Mail, MapPin, Calendar,
    ShoppingBag, Shield, ChevronRight, Edit, LucideWashingMachine
} from "lucide-react";
import SlideOver from "@/components/sideover";
import useRouteModal from "@/hook/useRouteModal.tsx";
import { useGetCustomerDetails } from "@/pages/customers/customer-queries.ts";
import BadgeStatus from "@/components/badge-status.tsx";
import SlideOverSkeleton from "@/components/skeletons/slide-over-skeleton.tsx";

const CustomerDetails = () => {
    const { customerId } = useParams();
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/customers`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const { data: customer, isLoading } = useGetCustomerDetails(customerId!, { enabled: !!customerId });
    const [activeTab, setActiveTab] = useState("info");

    // Format timestamp to readable date
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "LLL dd, yyyy");
        } catch {
            return "N/A";
        }
    };

    // Get initial letters for avatar
    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <>
            <Fragment>
                <SlideOver open={open} onClose={closeModal}>
                    <Outlet />
                    <div className="flex flex-col w-[32rem] h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
                        {/* Header */}
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Details</h2>
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
                                {/* Customer Profile Section */}
                                <div className="bg-white dark:bg-gray-800 px-6 py-5">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                                                {getInitials(customer?.data?.userName || "")}
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {customer?.data?.userName || "Unnamed Customer"}
                                                </h3>
                                                <BadgeStatus status={customer?.data?.customerStatus || ""} />
                                            </div>
                                            <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Mail className="h-4 w-4 mr-1" />
                                                <span>{customer?.data?.email || "No email"}</span>
                                            </div>
                                            <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Phone className="h-4 w-4 mr-1" />
                                                <span>{customer?.data?.phone || "No phone"}</span>
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                                <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                                                    <Edit className="h-3 w-3 inline mr-1" />
                                                    Edit
                                                </button>
                                                <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                                    <ShoppingBag className="h-3 w-3 inline mr-1" />
                                                    Orders
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tab Navigation */}
                                <div className="bg-white  dark:bg-gray-800  border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex">
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${
                                                activeTab === "info"
                                                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                            }`}
                                            onClick={() => setActiveTab("info")}
                                        >
                                            Customer Information
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${
                                                activeTab === "shop"
                                                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                            }`}
                                            onClick={() => setActiveTab("shop")}
                                        >
                                            Shop Details
                                        </button>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto">
                                    {activeTab === "info" ? (
                                        <div className="bg-white dark:bg-gray-800 p-6 space-y-6">
                                            {/* Basic Information Section */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">BASIC INFORMATION</h4>
                                                <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750">
                                                        <User className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">User Name</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.data?.userName || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Email Address</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.data?.email || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Phone Number</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.data?.phone || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Address</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.data?.address || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Added Date</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {formatDate(customer?.data?.Shop?.createdAt || "")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Shield className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Status</div>
                                                            <div className="text-sm">
                                                                <BadgeStatus status={customer?.data?.customerStatus || ""} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Created By Section */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">CREATED BY</h4>
                                                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                            {getInitials(customer?.data?.userData?.userName || "")}
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {customer?.data?.userData?.userName || "Unknown"}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {customer?.data?.userData?.email || "No email"}
                                                            </div>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white dark:bg-gray-800 p-6 space-y-6">
                                            {/* Shop Information */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">SHOP INFORMATION</h4>
                                                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center mb-4">
                                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br bg-primary-50  border border-primary-200 flex items-center justify-center text-primary-700">
                                                            <LucideWashingMachine className="h-6 w-6" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-base font-medium text-gray-900 dark:text-white">
                                                                {customer?.data?.Shop?.name || "Unknown Shop"}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                Added on {formatDate(customer?.data?.Shop?.createdAt || "")}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 mt-4">
                                                        <div className="text-sm">
                                                            <span className="text-gray-500 dark:text-gray-400">Description:</span>
                                                            <p className="text-gray-900 dark:text-white mt-1">
                                                                {customer?.data?.Shop?.description || "No description"}
                                                            </p>
                                                        </div>

                                                        <div className="text-sm">
                                                            <span className="text-gray-500 dark:text-gray-400">Address:</span>
                                                            <p className="text-gray-900 dark:text-white mt-1">
                                                                {customer?.data?.Shop?.address || "No address"}
                                                            </p>
                                                        </div>

                                                        <div className="text-sm">
                                                            <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                                            <div className="mt-1">
                                                                <BadgeStatus status={customer?.data?.Shop?.shopStatus || ""} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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

export default CustomerDetails;