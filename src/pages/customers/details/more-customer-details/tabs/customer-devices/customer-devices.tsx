import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {AlertContainer} from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import {TextInput} from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import {useState} from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import {IHiHeader} from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {LucideEye, Search, LucideCpu, Plus} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import {format} from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import {useGetCustomerDevices} from "@/pages/devices/device-queries.ts";
import {IAction} from "@/types/permission";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import {useFilterActionsByPermission} from "@/pages/permissions-manager/filter-action-permissions.tsx";
import Can from "@/pages/permissions-manager/can.tsx";
import {ICustomerDevice} from "@/types/device";

const CustomerDevices = () => {
    const {customerId} = useParams();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();

    const {
        data: devices,
        isLoading
    } = useGetCustomerDevices(customerId!, pageNumber, pageSize, keyword);

    const actions: IAction<ICustomerDevice>[] = [
        {
            icon: <LucideEye className={"text-gray-500 size-4"}/>,
            onClick: (row: ICustomerDevice) => {
                navigate(`details/${row.deviceId}`, {
                    state: {
                            goBackTo: `/customers/more-details/${customerId}/devices`
                        }
                });
            },
            permission: permissions.GET_DEVICES
        },
    ];

    const headers: IHiHeader<ICustomerDevice>[] = [
        {
            key: "deviceId",
            label: "Serial Number",
            template: (row) => (
                <Link to={`details/${row.id}`}>
                    <div className={"block"}>{row.Device.serialNumber}</div>
                </Link>
            )
        },
        {
            key: "deviceId",
            label: "Latitude",
            template: (row) => <p>{row.Device.gpsCoordinates.latitude}</p>
        },
        {
            key: "deviceId",
            label: "Longitude",
            template: (row) => <p>{row.Device.gpsCoordinates.longitude}</p>
        },
        {
            key: "deviceId",
            label: "Device Status",
            template: (row) => <BadgeStatus status={row.Device.deviceStatus}/>
        },
        {
            key: "supplier",
            label: "Supplier",
            template: (row) => <p>{`${row.supplier.firstName} ${row.supplier.lastName}`}</p>
        },
        {
            key: "supplierId",
            label: "Gas Brand",
            template: (row) => <p>{row.Price.gasBrand}</p>
        },
        {
            key: "supplierId",
            label: "Weight",
            template: (row) => <p>{`${row.Price.weight} ${row.Price.weightUnit}`}</p>
        },
        {
            key: "assignedDate",
            label: "Assigned Date",
            template: (row) => <p>{format(new Date(row.assignedDate), "MMM d, yyyy")}</p>
        },
    ];

    const filteredActions = useFilterActionsByPermission(actions);

    return (
        <PageFit>
            <Outlet/>
            <AlertContainer/>

            <header className="mb-4 pt-6">
                <div
                    className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                    <div className="flex items-center">
                        <div className="flex items-center gap-3">
                            <div
                                className="size-10 flex items-center justify-center rounded-lg border border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                                <LucideCpu className="text-primary-500 dark:text-primary-400" size={20}/>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Customer
                                        Devices</h1>
                                    <Badge label={`${devices?.metadata.total?.toLocaleString() ?? "0"} total`}
                                           type="secondary"/>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    View devices assigned to customer
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400"/>
                            </div>
                            <TextInput
                                placeholder="Search devices..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="pl-10 bg-gray-50 dark:bg-neutral-800 rounded-lg border-gray-300 shadow-none dark:border-neutral-700"
                            />
                        </div>
                        <Can permission={permissions.ADD_CUSTOMER_DEVICE} messageScreen={false}>
                        <Link to="assign-customer-device">
                            <button
                                type="button"
                                className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                            >
                                <Plus size={16}/>
                                <span>Assign device</span>
                            </button>
                        </Link>
                    </Can>
                    </div>
                </div>
            </header>

            <div className={"py-4"}>
                {isLoading ? (
                    <TableSkeleton/>
                ) : devices?.data?.length ?? 0 > 0 ? (
                    <Can permission={permissions.GET_DEVICES} messageScreen={true}>
                        <HiTable
                            selectable={false}
                            headers={headers}
                            rows={devices?.data ?? []}
                            actions={filteredActions}
                            onRowClick={(row) => navigate(`details/${row.deviceId}`,{ state:{
                                goBackTo:`/customers/more-details/${customerId}/devices`
                                }})}
                            pagination={{
                                setPage: setPageNumber,
                                totalPages: devices?.metadata?.totalPages,
                                page: pageNumber,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                showPagesList: true
                            }}
                        />
                    </Can>
                ) : (
                    <EmptyState
                        title={"No devices found."}
                        message={"There are no devices assigned to this customer at the moment"}
                    />
                )}
            </div>
        </PageFit>
    );
};

export default CustomerDevices;