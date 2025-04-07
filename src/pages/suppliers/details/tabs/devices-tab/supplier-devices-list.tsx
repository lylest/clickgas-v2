import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {AlertContainer, useAlerts} from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import { TextInput } from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import { useState } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import { IHiHeader } from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {LucideEye, LucideCpu, Search, Plus, LucideTrash2} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import { format } from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import {useGetSupplierDevices, useRemoveSupplierDevice} from "@/pages/devices/device-queries.ts";
import { ISupplierDevice} from "@/types/device"; // Assuming this is where the interfaces are defined
import { IAction } from "@/types/permission";
import { permissions } from "@/pages/permissions-manager/check-permission.ts";
import { useFilterActionsByPermission } from "@/pages/permissions-manager/filter-action-permissions.tsx";
import Can from "@/pages/permissions-manager/can.tsx";

const SupplierDevicesList = () => {
    const { confirm } = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const { supplierId } = useParams();
    const navigate = useNavigate();

    const {
        data: supplierDevices,
        isLoading
    } = useGetSupplierDevices(supplierId!, pageNumber, pageSize, keyword, { enabled: !!supplierId });

    const actions: IAction<ISupplierDevice>[] = [
        {
            icon: <LucideEye className={"text-gray-500 size-4"} />,
            onClick: (row: ISupplierDevice) => {
                navigate(`details/${row.id}`, { state: row });
            },
            permission: permissions.GET_SUPPLIER_DEVICE_DETAILS
        },
        {
            icon: <LucideTrash2 className={"text-red-500 size-4"} />,
            onClick: (row: ISupplierDevice) => {
                handleDeleteDevice(row);
            },
            permission:permissions.DELETE_SUPPLIER_DEVICE
        },
    ];

    const handleDeleteDevice = async (device: ISupplierDevice) => {
        const confirmed = await confirm({
            title: "Confirm unassignment",
            message: `Please make sure you want to unassign this device: ${device.Device.serialNumber} from supplier?`,
            type: "danger"
        });
        if (confirmed) {
            removeSupplierDeviceMutation(device.id);
        }
    };

    const headers: IHiHeader<ISupplierDevice>[] = [
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
            key: "status",
            label: "Status",
            template: (row) => <BadgeStatus status={row.Device.deviceStatus} />
        },
        {
            key: "assignedDate",
            label: "Assigned Date",
            template: (row) => <p>{format(new Date(row.assignedDate), "MMM d, yyyy")}</p>
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>
        },
    ];

    const filteredActions = useFilterActionsByPermission(actions);
    const { mutate:removeSupplierDeviceMutation } = useRemoveSupplierDevice()

    return (
        <PageFit>
            <Outlet />
            <AlertContainer />

            <header className="mb-4 pt-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                    <div className="flex items-center">
                        <div className="flex items-center gap-3">
                            <div className="size-10 flex items-center justify-center rounded-lg border border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                                <LucideCpu className="text-primary-500 dark:text-primary-400" size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Supplier Devices</h1>
                                    <Badge label={`${supplierDevices?.metadata.total?.toLocaleString() ?? "0"} total`}
                                           type="secondary" />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    View supplier assigned devices
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
                                placeholder="Search device..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="pl-10 bg-gray-50 dark:bg-neutral-800 rounded-lg border-gray-300 shadow-none dark:border-neutral-700"
                            />
                        </div>
                        <Can permission={permissions.ADD_SUPPLIER_DEVICE} messageScreen={false}>
                            <Link to="assign-device">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                                >
                                    <Plus size={16} />
                                    <span>Assign device</span>
                                </button>
                            </Link>
                        </Can>
                    </div>
                </div>
            </header>

            <div className={"py-4"}>
                {isLoading ? (
                    <TableSkeleton />
                ) : supplierDevices?.data?.length ?? 0 > 0 ? (
                    <Can permission={permissions.GET_DEVICES} messageScreen={true}>
                        <HiTable
                            selectable={false}
                            headers={headers}
                            rows={supplierDevices?.data ?? []}
                            actions={filteredActions}
                            onRowClick={(row) => navigate(`details/${row.id}`)}
                            pagination={{
                                setPage: setPageNumber,
                                totalPages: supplierDevices?.metadata?.totalPages,
                                page: pageNumber,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                showPagesList: true
                            }}
                        />
                    </Can>
                ) : (
                    <EmptyState
                        title={"No supplier devices found."}
                        message={"There are no devices assigned to this supplier at the moment"}
                    />
                )}
            </div>
        </PageFit>
    );
}
export default SupplierDevicesList;