import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import { AlertContainer } from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import { TextInput } from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import { useState } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import { IHiHeader } from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import { Search, LucideShoppingBag, CalendarIcon} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import {addDays, format, formatDuration, intervalToDuration} from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import { useGetSupplierOrders} from "@/pages/orders/order-queries.ts";
import { IOrder } from "@/types/order";
import {DateRange} from "react-day-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Calendar} from "@/components/ui/calendar.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const SupplierOrders = () => {
   const { supplierId } = useParams();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState<string | undefined>(undefined);
    const [paymentStatus, setPaymentStatus] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: addDays(new Date(), 0),
    });
    const startDate = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const toDate = date?.to ? format(date.to, "yyyy-MM-dd") : "";


    const {
        data: orders,
        isLoading
    } = useGetSupplierOrders(
        supplierId!,
        pageNumber,
        pageSize,
        keyword,
        startDate,
        toDate,
        orderStatus === "all" ? undefined : orderStatus,
        paymentStatus === "all" ? undefined : paymentStatus,
        { enabled: !!supplierId}
    );

    const tableHeaders: IHiHeader<IOrder>[] = [
        {
            key: "trackingNo",
            label: "Tracking No",
            template: (row) => (
                <Link to={`details/${row.id}`} className={"text-primary-500"}>
                    <div className={"block"}>#{row.trackingNo}</div>
                </Link>
            )
        },
        {
            key: "customer",
            label: "Customer",
            template: (row) => <p>{`${row.customer.firstName} ${row.customer.lastName || ""}`}</p>
        },
        {
            key: "supplier",
            label: "Supplier",
            template: (row) => <p>{`${row.supplier.firstName} ${row.supplier.lastName || ""}`}</p>
        },
        {
            key: "deviceId",
            label: "Device",
            template: (row) => <p>{row.Device.serialNumber}</p>
        },
        {
            key: "amount",
            label: "Amount",
            template: (row) => <p>{row.amount?.toLocaleString()} {row.currency}</p>
        },
        {
            key: "orderStatus",
            label: "Order Status",
            template: (row) => <BadgeStatus status={row.orderStatus} />
        },
        {
            key: "paymentStatus",
            label: "Payment Status",
            template: (row) => <BadgeStatus status={row.paymentStatus} />
        },
        {
            key: "distance",
            label: "Distance",
            template: (row) => <p>{row.distance} {row.distanceUnit}</p>
        },
        {
            key: "deliveryAwaitTime",
            label: "Await Time",
            template: (row) => {
                const duration = intervalToDuration({ start: 0, end: row.deliveryAwaitTime * 1000 });
                return <p>{formatDuration(duration, { format: ["hours", "minutes", "seconds"], zero: true }).replace(/(\d+)/g, "$1").replace("hours", "h").replace("minutes", "m").replace("seconds", "s") || "0h 0m 0s"}</p>;
            }
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>
        },
    ];

    // Define possible order and payment statuses (adjust based on your app's domain)
    const orderStatuses = [
        "pending",        // Initial state when order is created
        "confirmed",      // Order has been confirmed by supplier
        "preparing",      // Order is being prepared for delivery
        "on_route",       // Order is in transit
        "delivered",      // Successfully delivered to customer
        "not_delivered",  // Delivery attempt failed
        "cancelled",      // Order cancelled by customer or supplier
        "returned",       // Order was returned after delivery attempt
        //"completed",      // Order fully delivered and confirmed
    ];

    const paymentStatuses = [
        "unpaid",    // No payment received
        "partial",   // Partial payment received
        "paid",      // Full payment received
        "refunded",  // Payment refunded to customer
        "failed"     // Payment attempt failed
    ];


    return (
        <>
            <PageFit>
                <Outlet />
                <AlertContainer />

                <header className="mb-4 pt-6">
                    <div
                        className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-10 flex items-center justify-center rounded-lg border border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                                    <LucideShoppingBag className="text-primary-500 dark:text-primary-400" size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Orders</h1>
                                        <Badge label={`${orders?.metadata.total?.toLocaleString() ?? "0"} total`}
                                               type="secondary" />
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                        Manage, create, edit and delete
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </header>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <div className="relative w-full sm:w-auto">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <TextInput
                            placeholder="Search order..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="pl-10 w-full sm:w-64 bg-gray-50 dark:bg-neutral-800 rounded-lg border-gray-300 shadow-none dark:border-neutral-700"
                        />
                    </div>
                    <Select value={orderStatus} onValueChange={setOrderStatus}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Order Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {orderStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {paymentStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    "w-full sm:w-64 justify-start text-left font-normal border-gray-300 dark:border-neutral-600 focus:border-primary focus:ring-primary/40 dark:focus:border-neutral-500 dark:focus:ring-primary/40",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto p-4 sm:p-8 bg-white ring-gray-200 ring-1 ring-inset z-50 rounded-xl shadow-md"
                            align="start"
                        >
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={window.innerWidth < 640 ? 1 : 2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className={"py-4"}>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : orders?.data?.length ?? 0 > 0 ? (
                        <Can permission={permissions.GET_ORDERS} messageScreen={true}>
                            <HiTable
                                selectable={false}
                                headers={tableHeaders}
                                rows={orders?.data ?? []}
                                onRowClick={(row) => navigate(`/orders/details/${row.id}`)}
                                pagination={{
                                    setPage: setPageNumber,
                                    totalPages: orders?.metadata?.totalPages,
                                    page: pageNumber,
                                    pageSize: pageSize,
                                    setPageSize: setPageSize,
                                    showPagesList: true
                                }}
                            />
                        </Can>
                    ) : (
                        <EmptyState
                            title={"No orders found."}
                            message={"There are no orders to display at the moment, adjust dates and status filters."}
                        />
                    )}
                </div>
            </PageFit>
        </>
    );
}

export default SupplierOrders;