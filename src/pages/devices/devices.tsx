import { Link, Outlet, useNavigate } from "react-router-dom";
import { AlertContainer, useAlerts } from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import { TextInput } from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import { useState } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import { IHiHeader } from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import { LucideEdit, LucideEye, LucideTruck, LucideTrash2, Plus, Search } from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import { format } from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import { useGetDevices, useRemoveDevice } from "@/pages/devices/device-queries.ts"; // Adjusted import
import { IDevice } from "@/types/device"; // Adjusted import

const Devices = () => {
    const { confirm } = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();

    const {
        data: devices,
        isLoading
    } = useGetDevices(pageNumber, pageSize, keyword);
    const { mutate: removeDeviceMutation } = useRemoveDevice();

    const actions = [
        {
            icon: <LucideEye className={"text-gray-500 size-4"} />,
            onClick: (row: IDevice) => {
                navigate(`details/${row.id}`, { state: row });
            },
        },
        {
            icon: <LucideEdit className={"text-gray-500 size-4"} />,
            onClick: (row: IDevice) => {
                navigate("form/edit", { state: row });
            },
        },
        {
            icon: <LucideTrash2 className={"text-red-500 size-4"} />,
            onClick: (row: IDevice) => {
                handleDeleteDevice(row);
            },
        },
    ];

    const headers: IHiHeader<IDevice>[] = [
        {
            key: "serialNumber",
            label: "Serial Number",
            template: (row) => (
                <Link to={`details/${row.id}`}>
                    <div className={"block"}>{row.serialNumber}</div>
                </Link>
            )
        },
        {
            key: "gpsCoordinates",
            label: "Latitude",
            template: (row) => <p>{row.gpsCoordinates.latitude}</p>
        },
        {
            key: "gpsCoordinates",
            label: "Longitude",
            template: (row) => <p>{row.gpsCoordinates.longitude}</p>
        },
        {
            key: "deviceStatus",
            label: "Status",
            template: (row) => <BadgeStatus status={row.deviceStatus} />
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>
        },
    ];

    const handleDeleteDevice = async (device: IDevice) => {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this device: ${device.serialNumber}?`,
            type: "danger"
        });
        if (confirmed) {
            removeDeviceMutation(device.id);
        }
    };

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
                                    <LucideTruck className="text-primary-500 dark:text-primary-400" size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Devices</h1>
                                        <Badge label={`${devices?.metadata.total?.toLocaleString() ?? "0"} total`}
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
                                    placeholder="Search device..."
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
                                    <span>Add device</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className={"py-4"}>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : devices?.data?.length ?? 0 > 0 ? (
                        <HiTable
                            selectable={false}
                            headers={headers}
                            rows={devices?.data ?? []}
                            actions={actions}
                            onRowClick={(row) => navigate(`details/${row.id}`)}
                            pagination={{
                                setPage: setPageNumber,
                                totalPages: devices?.metadata?.totalPages,
                                page: pageNumber,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                showPagesList: true
                            }}
                        />
                    ) : (
                        <EmptyState
                            title={"No devices found."}
                            message={"There are no devices to display at the moment, click button below to add"}
                            actionLabel={"Add device"}
                            actionLink={"form/add"}
                        />
                    )}
                </div>
            </PageFit>
        </>
    );
}

export default Devices;