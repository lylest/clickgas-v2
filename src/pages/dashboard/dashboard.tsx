import React, {useState} from 'react';
import StatCard from "@/components/cards/dashboard-card/stat-card.tsx";
import {DateRange} from "react-day-picker";
import {addDays, format, formatDuration, intervalToDuration} from "date-fns";
import {
    useGetDashboardStats,
    useGetDeliveryStats,
    useGetRevenueStats,
    useGetTopSuppliers
} from "@/pages/dashboard/dashboard-queries.ts";
import {CalendarIcon, LucideShoppingBag, LucideUsers2} from "lucide-react";
import RevenueProfit from "@/pages/dashboard/widgets/revenue-profit.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/utils";
import {Calendar} from "@/components/ui/calendar.tsx";
import DeliveryWidget from "@/pages/dashboard/widgets/delivery-widget.tsx";
import {DeliveryPie} from "@/pages/dashboard/widgets/delivery_pie.tsx";
import {useGetOrders} from "@/pages/orders/order-queries.ts";
import OrdersMap from "@/pages/dashboard/widgets/orders-map.tsx";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {Link, useNavigate} from "react-router-dom";
import {IHiHeader} from "@/types/hitable";
import {IOrder} from "@/types/order";
import BadgeStatus from "@/components/badge-status.tsx";
import TopSupplierCard from "@/components/cards/dashboard-card/top-suppliers.tsx";
import { CardHeader, CardTitle} from "@/components/ui/card.tsx";


const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -14),
        to: addDays(new Date(), 0),
    })

    const startDate = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
    const toDate = date?.to ? format(date.to, 'yyyy-MM-dd') : '';

    const {
        data: orders,
    } = useGetOrders(
        1,
        5,
        "",
        startDate,
        toDate,
        undefined,
        undefined,
    );
    const { data:stats } = useGetDashboardStats(startDate, toDate);
    const { data: revenue } = useGetRevenueStats(startDate, toDate);
    const { data:deliveryStats } = useGetDeliveryStats(startDate, toDate);
    const { data:topSuppliers } = useGetTopSuppliers(startDate, toDate);

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
    return (
        <div className=" dark:bg-neutral-900 p-4 sm:p-6 lg:p-8 min-h-screen transition-colors duration-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
                <h1 className="text-xl sm:text-2xl dark:text-neutral-200 font-bold">Dashboard</h1>
                <div className="w-full sm:w-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    "w-full sm:w-[300px] justify-start text-left font-normal border-gray-300 dark:border-neutral-600 focus:border-primary focus:ring-primary/40 dark:focus:border-neutral-500 dark:focus:ring-primary/40",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
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
                            align="start">
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
            </div>
            {/* Top Row Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
                <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="flex-1 w-full">
                            <StatCard
                                icon={LucideUsers2}
                                label={"Customers"}
                                value={stats?.data?.customers ?? 0}
                                change={stats?.data?.customersChange ?? 0}/>
                        </div>
                        <div className="flex-1 w-full">
                            <StatCard
                                icon={LucideShoppingBag}
                                label={"Orders"}
                                value={stats?.data?.orders ?? 0}
                                change={stats?.data?.orders ?? 0}
                            />
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-neutral-800  border border-gray-200 dark:border-neutral-700 rounded-lg w-full  transition-colors duration-200">
                        <RevenueProfit stats={revenue?.data ?? []}/>
                    </div>
                </div>

                <div
                    className="lg:col-span-2 bg-white dark:bg-neutral-800 min-h-20 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 transition-colors duration-200">
                    {deliveryStats?.data && <DeliveryPie stats={deliveryStats.data}/>}

                    <CardHeader>
                        <CardTitle>Top suppliers</CardTitle>
                    </CardHeader>
                    <div>
                        {topSuppliers?.data?.map(item => (
                            <TopSupplierCard supplier={item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="bg-white dark:bg-neutral-800 mb-6  border border-gray-200 dark:border-neutral-700 rounded-lg w-full  transition-colors duration-200">
                {deliveryStats?.data && <DeliveryWidget stats={deliveryStats.data}/>}
            </div>

            {/* Bottom Row - Demographics and Recent Orders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Customers Demographics */}
                <div
                    className="bg-white dark:bg-neutral-800 rounded-lg p-4 sm:p-6  border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Orders
                                Demographic</h3>
                        </div>
                    </div>

                    <div
                        className=" w-full bg-neutral-50 dark:bg-neutral-850 rounded-lg overflow-hidden transition-colors duration-200"></div>
                    <OrdersMap  orders={orders?.data ?? []} />

                </div>

                {/* Recent Orders */}
                <div
                    className="bg-white dark:bg-neutral-800 rounded-lg p-4 sm:p-6  border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Recent Orders</h3>
                    </div>

                    <HiTable
                        selectable={false}
                        headers={tableHeaders}
                        rows={orders?.data ?? []}
                        onRowClick={(row) => navigate(`/orders/details/${row.id}`)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;