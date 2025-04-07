import { Fragment } from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import { format } from "date-fns";
import {
    User, Phone, Mail, MapPin, Calendar,
    Shield, Edit, LucideLink,
} from "lucide-react";
import SlideOver from "@/components/sideover";
import useRouteModal from "@/hook/useRouteModal.tsx";
import { useGetCustomerDetails } from "@/pages/customers/customer-queries.ts";
import BadgeStatus from "@/components/badge-status.tsx";
import SlideOverSkeleton from "@/components/skeletons/slide-over-skeleton.tsx";
import {ICustomer} from "@/types/customer";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";



const CustomerDetails = () => {
    const { customerId } = useParams();
    const navigate = useNavigate()
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/customers`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const { data: customerResponse, isLoading } = useGetCustomerDetails(customerId!, { enabled: !!customerId });

    const customer: ICustomer | undefined = customerResponse?.data;

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "LLL dd, yyyy");
        } catch {
            return "N/A";
        }
    };

    // Get full name from customer data
    const getFullName = (customer?: ICustomer) => {
        if (!customer) return "Unnamed Customer";

        let fullName = customer.firstName;
        if (customer.middleName) fullName += ` ${customer.middleName}`;
        fullName += ` ${customer.lastName}`;

        return fullName;
    };

    // Get initial letters for avatar
    const getInitials = (customer?: ICustomer) => {
        if (!customer) return "??";

        let initials = customer.firstName.charAt(0);
        if (customer.lastName) initials += customer.lastName.charAt(0);

        return initials.toUpperCase();
    };

    // Get full address
    const getFullAddress = (customer?: ICustomer) => {
        if (!customer) return "No address provided";

        let address = customer.address;
        if (customer.houseNo) address = `${customer.houseNo}, ${address}`;
        if (customer.region) address += `, ${customer.region}`;
        if (customer.country) address += `, ${customer.country}`;

        return address;
    };

    return (
        <>
            <Fragment>
                <SlideOver open={open} onClose={closeModal}>
                    <Outlet />
                    <div className="flex flex-col w-full lg:w-[32rem] h-full bg-gray-50 dark:bg-neutral-800 overflow-hidden">
                        {/* Header */}
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Customer Details</h2>
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
                                <div className="bg-white dark:bg-neutral-800 px-6 py-5">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                                                {getInitials(customer)}
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
                                                    {getFullName(customer)}
                                                </h3>
                                                <BadgeStatus status={customer?.customerStatus || ""} />
                                            </div>
                                            <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Mail className="h-4 w-4 mr-1" />
                                                <span>{customer?.email || "No email"}</span>
                                            </div>
                                            <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Phone className="h-4 w-4 mr-1" />
                                                <span>{customer?.phone || "No phone"}</span>
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                                <Can permission={permissions.UPDATE_CUSTOMER} messageScreen={false}>
                                                <button onClick={()=> navigate(`/customers/form/edit`,{ state: customer})} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                                                    <Edit className="h-3 w-3 inline mr-1" />
                                                    Edit
                                                </button>
                                                </Can>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto">
                                        <div className="bg-white dark:bg-gray-800 p-6 space-y-6">
                                            {/* Basic Information Section */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">BASIC INFORMATION</h4>
                                                <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750">
                                                        <User className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Full Name</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{getFullName(customer)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Email Address</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.email || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Phone Number</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.phone || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Address</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{getFullAddress(customer)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Customer Since</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {formatDate(customer?.createdAt || "")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <Shield className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Status</div>
                                                            <div className="text-sm">
                                                                <BadgeStatus status={customer?.customerStatus || ""} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Location Information */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">LOCATION DETAILS</h4>
                                                <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750">
                                                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Country</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.country || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">Region</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.region || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                                                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">House Number</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer?.houseNo || "Not provided"}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end gap-4 items-center">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors"
                                    >
                                        Close
                                    </button>

                                    <Can permission={permissions.GET_CUSTOMER_DETAILS} messageScreen={false}>
                                        <button
                                            onClick={() => navigate(`/customers/more-details/${customerId}`)}
                                            className=" px-4 py-3 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-neutral-800 transition-all duration-200 flex items-center justify-center">
                                            <LucideLink className="h-4 w-4 mr-2"/>
                                            View more
                                        </button>
                                    </Can>
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