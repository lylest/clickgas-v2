import {Outlet, useParams} from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import {Fragment, useState} from "react";
import {useGetOrderPayments} from "@/pages/payments/payment-queries.ts";
import SlideOver from "@/components/sideover";
import MainLoader from "@/components/loaders/main-loader.tsx";
import PaymentCard from "@/components/cards/payment-card.tsx";
import EmptyState from "@/components/general/empty-state.tsx";
import Pagination from "@/components/pagination.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const OrderPayments = () => {

    const {orderId} = useParams();
    const baseUrl = `/orders/details/${orderId}`;
    const [keyword, /*setKeyword*/] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);

    const {data: payments, isLoading: loadingPayments} = useGetOrderPayments(orderId!, pageNumber, pageSize, keyword)

    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });
    return (
        <>
            <Fragment>
                <SlideOver open={open} onClose={closeModal}>
                    <Outlet/>
                    <div
                        className="flex flex-col w-full lg:w-[40rem] h-full bg-gray-50 dark:bg-neutral-800 overflow-hidden">
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Order payments</h2>
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
                        <div className="flex-1 overflow-y-auto px-6">
                            {loadingPayments ? (
                                <MainLoader size={"medium"}/>
                            ) : payments?.data?.length ?? 0 > 0 ? (
                                <Can permission={permissions.GET_PAYMENTS}>
                                    <div className="py-4 space-y-2">
                                        {payments?.data?.map((payment) => (
                                            <PaymentCard payment={payment} key={payment.id}/>
                                        ))}
                                    </div>
                                </Can>
                            ) : (
                                <EmptyState
                                    title={"No payments added yet."}
                                    actionLabel={"Add payment"}
                                    actionLink={`/orders/details/${orderId}/payment-form`}
                                />
                            )}
                        </div>

                        {/* Fixed footer for pagination and add button */}
                        <div className="mt-4 pt-2 border-t border-gray-200">
                            <Pagination
                                showPageSizeSelector={false}
                                showPagesList={true}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                page={pageNumber}
                                setPage={setPageNumber}
                                totalPages={payments?.metadata?.totalPages}
                            />
                        </div>
                    </div>
                </SlideOver>
            </Fragment>
        </>
    )
}

export default OrderPayments;