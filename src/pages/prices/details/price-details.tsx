import {Outlet, useNavigate, useParams} from "react-router-dom";
import {Fragment} from "react";
import {useGetPriceDetails} from "@/pages/prices/price-queries.ts";
import useRouteModal from "@/hook/useRouteModal.tsx";
import SlideOver from "@/components/sideover";
import {formatDate} from "@/utils";
import {formatCurrency} from "@/utils/time-utils.ts";
import {
    LucideAlertCircle,
    LucideArrowLeft,
    LucideCalendar,
    LucideEdit3,
    LucidePackage,
    LucideScale,
    LucideTag,
} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import MainLoader from "@/components/loaders/main-loader.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const PriceDetails = () => {
    const {priceId} = useParams();
    const navigate = useNavigate();
    const baseUrl = `/prices`;

    const {data: priceResponse, isLoading} = useGetPriceDetails(priceId!, {
        enabled: !!priceId
    });

    const price = priceResponse?.data;

    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const navigateToSupplier = () => {
        if (price?.supplierId) {
            navigate(`/suppliers/${price.supplierId}`);
            closeModal();
        }
    };

    const navigateToEdit = () => {
        if (priceId) {
            navigate(`/prices/${priceId}/edit`);
            closeModal();
        }
    };

    // Calculate profit margin
    const calculateProfitMargin = () => {
        if (!price?.buyingPrice || !price?.sellingPrice) return "N/A";
        const profit = price.sellingPrice - price.buyingPrice;
        const margin = (profit / price.buyingPrice) * 100;
        return margin.toFixed(2) + "%";
    };

    const getBrandIcon = (brand: string) => {
        if (!brand) return null;


        const colorClass = "bg-gray-50 text-gray-600";

        return (
            <div className={`rounded-full p-2 ${colorClass}`}>
                <LucidePackage className="h-5 w-5"/>
            </div>
        );
    };

    return (
        <>
            <Fragment>
                <SlideOver open={open} onClose={closeModal}>
                    <Outlet/>
                    <div
                        className="flex flex-col w-full lg:w-[40rem] h-full bg-gray-50 dark:bg-neutral-800 overflow-hidden">
                        {/* Header */}
                        <Can permission={permissions.GET_PRICE_DETAILS} messageScreen={true}>
                            <div
                                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                                <div className="px-6 py-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={closeModal}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            <LucideArrowLeft className="h-5 w-5"/>
                                        </button>
                                        <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Price
                                            Details</h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <MainLoader size="medium"/>
                                    </div>
                                ) : price ? (
                                    <div className="space-y-8">
                                        {/* Price Card */}
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                                            <div className="bg-gradient-to-r from-indigo-600 bg-blue-600 p-6">
                                                <div className="flex flex-col items-center justify-center text-white">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        {getBrandIcon(price.gasBrand)}
                                                        <p className="text-white/80 text-sm font-medium">{price.gasBrand} Gas</p>
                                                    </div>
                                                    <h1 className="text-3xl font-bold">{formatCurrency(price.sellingPrice, price.currency)}</h1>
                                                    <div className="mt-2 text-white/80 text-sm">
                                                        {price.weight} {price.weightUnit}
                                                    </div>
                                                    <div className="mt-4 flex items-center space-x-2">
                                                        <BadgeStatus status={price.status}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Buying
                                                            Price</p>
                                                        <p className="font-medium">{formatCurrency(price.buyingPrice, price.currency)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Selling
                                                            Price</p>
                                                        <p className="font-medium">{formatCurrency(price.sellingPrice, price.currency)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>
                                                        <p className="font-medium text-green-600 dark:text-green-400">
                                                            {formatCurrency(price.sellingPrice - price.buyingPrice, price.currency)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Margin</p>
                                                        <p className="font-medium text-green-600 dark:text-green-400">
                                                            {calculateProfitMargin()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center">
                                                        <LucideCalendar className="h-4 w-4 mr-2"/>
                                                        <span>Last updated: {formatDate(price.updatedAt)}</span>
                                                    </div>
                                                    <span>ID: {priceId?.substring(0, 8)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Information */}
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <LucidePackage className="h-5 w-5 mr-2 tebg-blue-500"/>
                                                Product Information
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                        <div className="flex items-center mb-2">
                                                            <LucideTag className="h-4 w-4 text-blue-500 mr-2"/>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Brand</p>
                                                        </div>
                                                        <p className="font-medium">{price.gasBrand || 'Unknown'}</p>
                                                    </div>

                                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                        <div className="flex items-center mb-2">
                                                            <LucideScale className="h-4 w-4 text-blue-500 mr-2"/>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                                                        </div>
                                                        <p className="font-medium">{price.weight} {price.weightUnit}</p>
                                                    </div>
                                                </div>

                                                {price.notes && (
                                                    <div
                                                        className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                                                        <div className="flex">
                                                            <LucideAlertCircle
                                                                className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5"/>
                                                            <div>
                                                                <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">Notes</p>
                                                                <p className="text-sm text-amber-700 dark:text-amber-300">{price.notes}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Supplier Info */}
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="h-5 w-5 mr-2 tebg-blue-500" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                </svg>
                                                Supplier Information
                                            </h3>

                                            <button
                                                onClick={navigateToSupplier}
                                                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className="bg-blue-50 dark:bg-blue-900/30 rounded-full h-10 w-10 flex items-center justify-center">
                          <span className="tebg-blue-600 dark:tebg-blue-300 font-medium">
                            {price?.Supplier?.firstName?.charAt(0) || ''}{price?.Supplier?.lastName?.charAt(0) || ''}
                          </span>
                                                    </div>
                                                    <div className="ml-4 text-left">
                                                        <p className="font-medium">
                                                            {price?.Supplier?.firstName} {price?.Supplier?.middleName} {price?.Supplier?.lastName}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{price?.Supplier?.phone}</p>
                                                    </div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                                     fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </button>

                                            {price?.Supplier?.address && (
                                                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <p className="mb-1">Address:</p>
                                                    <p>
                                                        {price.Supplier.address}
                                                        {price?.Supplier?.region ? `, ${price.Supplier.region}` : ''}
                                                        {price?.Supplier?.country ? `, ${price.Supplier.country}` : ''}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Historical Data Visualization Placeholder */}
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="h-5 w-5 mr-2 tebg-blue-500" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                                </svg>
                                                Price History
                                            </h3>

                                            <div
                                                className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    Historical price data visualization would appear here
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Price Not
                                            Found</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">The price details you're
                                            looking for could not be found.</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer action buttons */}
                            {price && (
                                <div
                                    className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sticky bottom-0">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={closeModal}
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Close
                                        </button>
                                        <Can permission={permissions.ADD_PRICE} messageScreen={false}>
                                        <button
                                            onClick={navigateToEdit}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <LucideEdit3 className="h-4 w-4 mr-2"/>
                                            Edit Price
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

export default PriceDetails;