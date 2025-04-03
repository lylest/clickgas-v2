import { Link, Outlet, useNavigate } from "react-router-dom";
import Badge from "@/components/general/Badge.tsx";
import { TextInput } from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import { useState } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import { IHiHeader } from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {Search, LucideDollarSign, CalendarIcon} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import {addDays, format} from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import { useGetPayments } from "@/pages/payments/payment-queries.ts";
import {IPayment} from "@/types/payments";
import {DateRange} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Calendar} from "@/components/ui/calendar.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx"; // Adjusted import


const Payments = () => {
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: addDays(new Date(), 0),
    });
    const startDate = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const toDate = date?.to ? format(date.to, "yyyy-MM-dd") : "";

    const {
        data: payments,
        isLoading
    } = useGetPayments(pageNumber, pageSize, keyword,startDate,toDate);


    const headers: IHiHeader<IPayment>[] = [
        {
            key: "orderId",
            label: "Order ID",
            template: (row) => (
                <Link to={`details/${row.id}`}>
                    <div className={"block text-primary-500"}>#{row.order.trackingNo}</div>
                </Link>
            )
        },
        {
            key: "customerId",
            label: "Customer",
            template: (row) => <p>{row.customer.firstName} {row.customer.lastName}</p>
        },
        {
            key: "amount",
            label: "Amount",
            template: (row) => <p>{row.amount.toLocaleString()} {row.order.currency}</p>
        },
        {
            key: "totalAmount",
            label: "Total Amount",
            template: (row) => <p>{row.totalAmount.toLocaleString()} {row.order.currency}</p>
        },
        {
            key: "supplierId",
            label: "Supplier",
            template: (row) => <p>{row.supplier.firstName} {row.supplier.lastName}</p>
        },
        {
            key: "paymentStatus",
            label: "Status",
            template: (row) => <BadgeStatus status={row.paymentStatus} />
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>
        },
    ];


    return (
        <>
            <PageFit>
                <Outlet />
                <header className="mb-4 pt-6">
                    <div
                        className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-10 flex items-center justify-center rounded-lg border border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                                    <LucideDollarSign className="text-primary-500 dark:text-primary-400" size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Payments</h1>
                                        <Badge label={`${payments?.metadata.total?.toLocaleString() ?? "0"} total`}
                                               type="secondary" />
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                        Manage, create, edit and delete
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400" />
                                </div>
                                <TextInput
                                    placeholder="Search payment..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="pl-10 bg-gray-50 dark:bg-neutral-800 rounded-lg border-gray-300 shadow-none dark:border-neutral-700"
                                />
                            </div>
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
                    </div>
                </header>
                <div className={"py-4"}>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : payments?.data?.length ?? 0 > 0 ? (
                        <Can permission={permissions.GET_PAYMENTS}>
                        <HiTable
                            selectable={false}
                            headers={headers}
                            rows={payments?.data ?? []}
                            onRowClick={(row) => navigate(`details/${row.id}`)}
                            pagination={{
                                setPage: setPageNumber,
                                totalPages: payments?.metadata?.totalPages,
                                page: pageNumber,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                showPagesList: true
                            }}
                        />
                        </Can>
                    ) : (
                        <EmptyState
                            title={"No payments found."}
                            message={"There are no payments to display at the moment"}
                        />
                    )}
                </div>
            </PageFit>
        </>
    );
}

export default Payments;