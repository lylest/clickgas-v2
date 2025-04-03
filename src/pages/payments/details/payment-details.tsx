import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useGetPaymentDetails } from "@/pages/payments/payment-queries.ts";
import useRouteModal from "@/hook/useRouteModal.tsx";
import SlideOver from "@/components/sideover";
import { formatDate } from "@/utils";
import { formatCurrency } from "@/utils/time-utils.ts";
import {
    LucideArrowLeft,
    LucideUser,
    LucideCreditCard,
    LucideCalendar,
    LucideCheckCircle,
    LucideXCircle,
    LucideShoppingBag
} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import MainLoader from "@/components/loaders/main-loader.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const PaymentDetails = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const baseUrl = `/payments`;

    const { data: paymentResponse, isLoading } = useGetPaymentDetails(paymentId!, {
        enabled: !!paymentId
    });

    const payment = paymentResponse?.data;

    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const getPaymentMethodIcon = (method:string) => {
        switch (method?.toLowerCase()) {
            case 'cash':
                return (
                    <div className="bg-green-50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'card':
                return (
                    <div className="bg-blue-50 rounded-full p-2">
                        <LucideCreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                );
            case 'mobile_money':
                return (
                    <div className="bg-purple-50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="bg-gray-50 rounded-full p-2">
                        <LucideCreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                );
        }
    };

    const navigateToOrder = () => {
        if (payment?.orderId) {
            navigate(`/orders/details/${payment.orderId}`);
        }
    };

    return (
        <>
            <Fragment>
                <SlideOver open={open} onClose={closeModal}>
                    <Outlet />
                    <div className="flex flex-col w-full lg:w-[40rem] h-full bg-gray-50 dark:bg-neutral-800 overflow-hidden">
                        {/* Header */}
                        <Can permission={permissions.GET_PAYMENT_DETAILS} messageScreen={true}>
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <LucideArrowLeft className="h-5 w-5" />
                                    </button>
                                    <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Payment Details</h2>
                                </div>
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

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <MainLoader size="medium" />
                                </div>
                            ) : payment ? (

                                <div className="space-y-8">
                                    {/* Payment Amount Card */}
                                    <div className="bg-white border border-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6">
                                            <div className="flex flex-col items-center justify-center text-white">
                                                <p className="text-white/80 text-sm font-medium mb-2">Payment Amount</p>
                                                <h1 className="text-3xl font-bold">{formatCurrency(payment.amount, payment?.order?.currency || 'TZS')}</h1>
                                                <div className="mt-4 flex items-center space-x-2">
                                                    {payment.paymentStatus === 'success' ? (
                                                        <LucideCheckCircle className="h-5 w-5 text-green-300" />
                                                    ) : (
                                                        <LucideXCircle className="h-5 w-5 text-red-300" />
                                                    )}
                                                    <span className="text-sm">
                            {payment.paymentStatus === 'success' ? 'Payment Successful' : 'Payment Failed'}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center">
                                                    {getPaymentMethodIcon(payment.paymentMethod)}
                                                    <span className="ml-3 font-medium capitalize">
                            {payment.paymentMethod?.replace('_', ' ') || 'Unknown Method'}
                          </span>
                                                </div>
                                                <BadgeStatus status={payment.paymentStatus} />
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center">
                                                    <LucideCalendar className="h-4 w-4 mr-2" />
                                                    <span>{formatDate(payment.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="bg-white border border-gray-200 dark:bg-gray-800 rounded-xl shadow-sm p-6">
                                        <h3 className="text-lg font-medium mb-4 flex items-center">
                                            <LucideShoppingBag className="h-5 w-5 mr-2 text-primary-500" />
                                            Order Information
                                        </h3>

                                        <div className="space-y-4">
                                            <button
                                                onClick={navigateToOrder}
                                                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-primary-50 dark:bg-primary-900/30 rounded-full p-2">
                                                        <LucideShoppingBag className="h-5 w-5 text-primary-500" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="font-medium">Order #{payment?.order?.trackingNo}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(payment?.order?.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <BadgeStatus status={payment?.order?.orderStatus} />
                                            </button>

                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                                                    <p className="font-medium">{formatCurrency(payment?.order?.amount, payment?.order?.currency)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                                                    <BadgeStatus status={payment?.order?.paymentStatus} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Paid Amount</p>
                                                    <p className="font-medium text-green-600 dark:text-green-400">
                                                        {formatCurrency(payment?.order?.paidAmount, payment?.order?.currency)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending Amount</p>
                                                    <p className="font-medium text-amber-600 dark:text-amber-400">
                                                        {formatCurrency(payment?.order?.pendingAmount, payment?.order?.currency)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="bg-white border border-gray-200 dark:bg-gray-800 rounded-xl shadow-sm p-6">
                                        <h3 className="text-lg font-medium mb-4 flex items-center">
                                            <LucideUser className="h-5 w-5 mr-2 text-primary-500" />
                                            Customer Information
                                        </h3>

                                        <div className="flex items-start">
                                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {payment?.customer?.firstName?.charAt(0) || ''}{payment?.customer?.lastName?.charAt(0) || ''}
                        </span>
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium">
                                                    {payment?.customer?.firstName} {payment?.customer?.middleName} {payment?.customer?.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{payment?.customer?.email}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{payment?.customer?.phone}</p>
                                                {payment?.customer?.address && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                        {payment.customer.address}{payment?.customer?.region ? `, ${payment.customer.region}` : ''}
                                                        {payment?.customer?.country ? `, ${payment.customer.country}` : ''}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Supplier Info */}
                                    <div className="bg-white border border-gray-200  dark:bg-gray-800 rounded-xl shadow-sm p-6">
                                        <h3 className="text-lg font-medium mb-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Supplier Information
                                        </h3>

                                        <div className="flex items-start">
                                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {payment?.supplier?.firstName?.charAt(0) || ''}{payment?.supplier?.lastName?.charAt(0) || ''}
                        </span>
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium">
                                                    {payment?.supplier?.firstName} {payment?.supplier?.middleName} {payment?.supplier?.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{payment?.supplier?.email || 'No email provided'}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{payment?.supplier?.phone}</p>
                                                {payment?.supplier?.address && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                        {payment.supplier.address}{payment?.supplier?.region ? `, ${payment.supplier.region}` : ''}
                                                        {payment?.supplier?.country ? `, ${payment.supplier.country}` : ''}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Not Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">The payment details you're looking for could not be found.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer action buttons */}
                        {payment && (
                            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sticky bottom-0">
                                <div className="flex space-x-3">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Close
                                    </button>
                                    <Can permission={permissions.GET_ORDER_DETAILS} messageScreen={false}>
                                    <button
                                        onClick={navigateToOrder}
                                        className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                                    >
                                        View Order
                                    </button>
                                    </Can>
                                </div>
                            </div>
                        )}
                        </Can>
                    </div>
                </SlideOver>
            </Fragment>
        </>
    );
};

export default PaymentDetails;