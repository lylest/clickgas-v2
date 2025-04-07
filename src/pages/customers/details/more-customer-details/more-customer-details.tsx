import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import TabLinks, { ITabLink } from "@/components/general/Tab.tsx";
import { permissions } from "@/pages/permissions-manager/check-permission.ts";
import { useFilteredTabs } from "@/pages/permissions-manager/filter-tabs.ts";
import { useGetCustomerDetails } from "@/pages/customers/customer-queries.ts";
import {
    ChevronLeft,
    User,
    Phone,
    Mail,
    MapPin,
    Clock,
    Globe
} from "lucide-react";
import BadgeStatus from "@/components/badge-status";
import PageFit from "@/components/general/PageFit.tsx";

const CustomerDetailsScreen = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/customers`;

    const { data: customerResponse, isLoading } = useGetCustomerDetails(customerId!, {
        enabled: !!customerId
    });

    const customer = customerResponse?.data;

    // Format full name function
    const getFullName = () => {
        if (!customer) return '-';
        const { firstName, middleName, lastName } = customer;
        return [firstName, middleName, lastName].filter(Boolean).join(' ');
    };

    // Format address function
    const getFormattedAddress = () => {
        if (!customer) return '-';
        const { address, houseNo, region, country } = customer;
        return [houseNo, address, region, country].filter(Boolean).join(', ');
    };

    const handleBackNavigation = () => {
        navigate(baseUrl);
    };

    const getTabs = (): ITabLink[] => [
        {
            name: "Devices",
            url: `/customers/more-details/${customerId}/devices`,
            pattern: new RegExp(`^/customers/more-details/${customerId}/devices*`),
            permission: permissions.GET_CUSTOMER_DEVICE_DETAILS,
        },
        {
            name: "Orders",
            url: `/customers/more-details/${customerId}/orders`,
            pattern: new RegExp(`^/customers/more-details/${customerId}/orders*`),
            permission: permissions.GET_ORDERS,
        },
    ];

    const filteredTabs = useFilteredTabs(getTabs());

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-neutral-800 shadow-sm rounded-lg p-8 animate-pulse">
                <div className="h-8 w-64 bg-gray-200 dark:bg-neutral-700 rounded mb-8"></div>
                <div className="h-24 w-full bg-gray-200 dark:bg-neutral-700 rounded mb-6"></div>
                <div className="h-12 w-full bg-gray-200 dark:bg-neutral-700 rounded"></div>
            </div>
        );
    }

    return (
        <PageFit>
            <br />
            <div className="bg-white dark:bg-neutral-800 shadow-sm rounded-lg overflow-hidden">
                {/* Header with navigation and customer name */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5">
                    <button
                        onClick={handleBackNavigation}
                        className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1"/>
                        <span className="text-sm font-medium">Back to Customers</span>
                    </button>

                    <div className="flex items-start justify-between">
                        <div className="flex items-center">
                            <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                <User className="h-7 w-7 text-white"/>
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-white">{getFullName()}</h1>
                                <div className="mt-1">
                                    <BadgeStatus status={customer?.customerStatus || ""}/>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
            <span className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
              <Clock className="h-3 w-3 inline-block mr-1"/>
                {customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
            </span>
                        </div>
                    </div>
                </div>

                {/* Customer information cards */}
                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Contact Information */}
                        <div
                            className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-4">
                                Contact Information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mr-4">
                                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-300"/>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
                                            {customer?.phone || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div
                                        className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mr-4">
                                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-300"/>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
                                            {customer?.email || 'Not provided'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div
                            className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-neutral-200 mb-4 flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400"/>
                                Location Details
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Address</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {getFormattedAddress()}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-gray-200 dark:border-neutral-700">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                                            <Globe className="h-3 w-3 mr-1"/>
                                            Country
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {customer?.country || '-'}
                                        </p>
                                    </div>

                                    <div
                                        className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-gray-200 dark:border-neutral-700">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                                            <MapPin className="h-3 w-3 mr-1"/>
                                            Region
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {customer?.region || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Tabs and Content */}
                    <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
                        <div className=" dark:bg-neutral-900 rounded-xl p-2">
                            <TabLinks tabs={filteredTabs}/>
                        </div>

                        <div className="">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </PageFit>
    );
};

export default CustomerDetailsScreen;