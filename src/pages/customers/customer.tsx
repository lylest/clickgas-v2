import { Link, Outlet, useNavigate } from "react-router-dom";
import { AlertContainer, useAlerts } from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import { TextInput } from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import { useState } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import { IHiHeader } from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {LucideEdit, LucideTrash2, Plus, Search, LucideUsers} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import { format } from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import { useGetCustomers, useRemoveCustomer } from "@/pages/customers/customer-queries.ts"; // Adjusted import
import { ICustomer } from "@/types/customer"; // Adjusted import

const Customers = () => {
    const { confirm } = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();

    const {
        data: customers,
        isLoading
    } = useGetCustomers( pageNumber, pageSize, keyword); // Removed activeShop logic
    const { mutate: removeCustomerMutation } = useRemoveCustomer();

    const actions = [
        {
            icon: <LucideEdit className={"text-gray-500 size-4"} />,
            onClick: (row: ICustomer) => {
                navigate(`form/edit`, { state: row });
            },
        },
        {
            icon: <LucideTrash2 className={"text-red-500 size-4"} />,
            onClick: (row: ICustomer) => {
                handleDeleteCustomer(row);
            },
        },
    ];

    const headers: IHiHeader<ICustomer>[] = [
        {
            key: "id",
            label: "Name",
            template: (row) => (
                <Link to={`details/${row.id}`}>
                    <div className={"block"}>
                        {row.firstName} {row.middleName ? `${row.middleName} ` : ""}{row.lastName}
                    </div>
                </Link>
            )
        },
        {
            key: "email",
            label: "Email",
            template: (row) => <p>{row.email}</p>
        },
        {
            key: "phone",
            label: "Phone",
            template: (row) => <p>{row.phone}</p>
        },
        {
            key: "address",
            label: "Address",
            template: (row) => <p>{row.address}</p>
        },
        {
            key: "houseNo",
            label: "House No",
            template: (row) => <p>{row.houseNo || "N/A"}</p>
        },
        {
            key: "customerStatus",
            label: "Status",
            template: (row) => <BadgeStatus status={row.customerStatus} />
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>
        },
    ];

    const handleDeleteCustomer = async (customer: ICustomer) => {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this customer: ${customer.firstName} ${customer.lastName}?`,
            type: "danger"
        });
        if (confirmed) {
            removeCustomerMutation(customer.id);
        }
    };

    return (
        <>
            <Outlet />
            <PageFit>
                <AlertContainer />

                <header className="mb-4 pt-6">
                    <div
                        className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-10 flex items-center justify-center rounded-lg border border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                                    <LucideUsers className="text-primary-500 dark:text-primary-400" size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Customers</h1>
                                        <Badge label={`${customers?.metadata.total?.toLocaleString() ?? "0"} total`}
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
                                    placeholder="Search customer..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="pl-10 bg-gray-50 dark:bg-neutral-800 rounded-lg border-gray-300 shadow-none dark:border-neutral-700"
                                />
                            </div>

                            <Link to="form/add">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                                >
                                    <Plus size={16} />
                                    <span>Add customer</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className={"py-4"}>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : customers?.data?.length ?? 0 > 0 ? (
                        <HiTable
                            selectable={false}
                            headers={headers}
                            rows={customers?.data ?? []}
                            actions={actions}
                            onRowClick={(row) =>  navigate(`details/${row.id}`)}
                            pagination={{
                                setPage: setPageNumber,
                                totalPages: customers?.metadata?.totalPages,
                                page: pageNumber,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                showPagesList: true
                            }}
                        />
                    ) : (
                        <EmptyState
                            title={"No customers found."}
                            message={"There are no customers to display at the moment, click button below to add"}
                            actionLabel={"Add customer"}
                            actionLink={"form/add"}
                        />
                    )}
                </div>
            </PageFit>
        </>
    );
}

export default Customers;