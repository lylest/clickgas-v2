import {Link, Outlet, useNavigate} from "react-router-dom";
import {AlertContainer, useAlerts} from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import {TextInput} from "@/components/form-control";
import {TbEdit, TbEye, TbTrash} from "react-icons/tb";
import PageFit from "@/components/general/PageFit.tsx";
import {useContext, useState} from "react";
import {useGetCustomers, useRemoveCustomer} from "@/pages/customers/customer-queries.ts";
import {ICustomer} from "@/types/customer";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import {IHiHeader} from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {GlobalContext} from "@/context/GlobalContext.tsx";
import {LucideUsers2, Plus, Search} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import {format} from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";


const Customer = () => {
    const {confirm} = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();
    const {state} = useContext(GlobalContext);
    const {activeShop} = state

    const {
        data: customers,
        isLoading
    } = useGetCustomers(activeShop?.id ?? ""!, pageNumber, pageSize, keyword, {enabled: !!activeShop?.id})
    const {mutate: removeCustomerMutation} = useRemoveCustomer()

    const actions = [
        {
            icon: <TbEye className={"text-gray-500"}/>,
            onClick: (row: ICustomer) => {
                navigate(`details/${row.id}`);
            },
        },
        {
            icon: <TbEdit className={"text-gray-500"}/>,
            onClick: (row: ICustomer) => {
                navigate(`form/edit`, {state: row});
            },
        },
        {
            icon: <TbTrash className={"text-red-500"}/>,
            onClick: (row: ICustomer) => {
                handleDeleteCustomer(row)
            },
        },
    ];


    const headers: IHiHeader<ICustomer>[] = [
        {
            key: "userName",
            label: "Name",
            template: (row) => (
                <Link to={`details/${row.id}`}>
                    <div className={"block"}>{row.userName}</div>
                </Link>
            )
        },
        {key: "phone", label: "Phone"},
        {key: "address", label: "Address"},
        {
            key: "shopId",
            label: "Shop",
            template: (row) => (
                <div className={"block"}>{row.Shop?.name || "N/A"}</div>
            )
        },
        {
            key: "customerStatus",
            label: "Status",
            template: (row) => <BadgeStatus status={row.customerStatus}/>
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>,
        }
    ];

    function handleRowClick(row: ICustomer) {
        navigate(`details/${row.id}`);
    }

    const handleDeleteCustomer = async (customer: ICustomer) => {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this customer: ${customer?.userName}?`,
            type: "danger"
        });
        if (confirmed) {
            removeCustomerMutation(customer?.id)
        }
    };

    return (
        <>
            <Outlet/>
            <PageFit>
                <AlertContainer/>

                <header className="mb-4 pt-6">
                    {/* Upper section with title and actions */}
                    <div
                        className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                        {/* Left: Title and badge */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-10 flex items-center justify-center rounded-lg  border border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                                    <LucideUsers2 className="text-primary-500 dark:text-primary-400" size={20}/>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Customers</h1>
                                        <Badge label={`${customers?.metadata.total?.toLocaleString() ?? "0"} total`}
                                               type="secondary"/>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                        Manage, create, edit and delete
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Search and action buttons */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400"/>
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
                                    <Plus size={16}/>
                                    <span>Add customer</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className={"py-4"}>
                    {isLoading ? (
                        <TableSkeleton/>
                    ) : customers?.data?.length ?? 0 > 0 ? (
                        <HiTable
                            selectable={false}
                            headers={headers}
                            onRowClick={(row) => handleRowClick(row)}
                            rows={customers?.data ?? []}
                            actions={actions}
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
                            message={"There are no items to display at the moment,click button below to add"}
                            actionLabel={"Add customer"}
                            actionLink={"form/add"}
                        />
                    )}
                </div>
            </PageFit>
        </>
    )
}

export default Customer;