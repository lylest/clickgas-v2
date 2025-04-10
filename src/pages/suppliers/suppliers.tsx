import { Link, Outlet, useNavigate } from "react-router-dom";
import { AlertContainer, useAlerts } from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import { TextInput } from "@/components/form-control";
import PageFit from "@/components/general/PageFit.tsx";
import { useState } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton.tsx";
import { IHiHeader } from "@/types/hitable";
import HiTable from "@/components/hi-table/hi-table.tsx";
import {LucideEdit, LucideEye, LucideStore, LucideTrash2, Plus, Search} from "lucide-react";
import BadgeStatus from "@/components/badge-status.tsx";
import { format } from "date-fns";
import EmptyState from "@/components/general/empty-state.tsx";
import { useGetSuppliers, useRemoveSupplier } from "@/pages/suppliers/supplier-queries.ts"; // Adjusted import
import { ISupplierDetails } from "@/types/supplier";
import {localStorageKeys, saveValueToLocalStorage} from "@/utils/local-storage.ts";
import SupplierAvatar from "@/components/cards/supplier-avatar.tsx";
import {IAction} from "@/types/permission";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import {useFilterActionsByPermission} from "@/pages/permissions-manager/filter-action-permissions.tsx";
import Can from "@/pages/permissions-manager/can.tsx"; // Adjusted import

const Suppliers = () => {
    const { confirm } = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();

    const {
        data: suppliers,
        isLoading
    } = useGetSuppliers(pageNumber, pageSize, keyword); // Removed activeShop logic
    const { mutate: removeSupplierMutation } = useRemoveSupplier();

    function handleEditSupplier(row: ISupplierDetails) {
           const basicDetails = {
               supplierId:row.id,
               firstName: row.firstName,
               lastName: row.lastName,
               middleName:row?.middleName ?? null,
               phone: row.phone,
           }

           const locationDetails = {
               country: row.country,
               region: row.region,
               address: row.address,
               latitude: row.gpsCoordinates.latitude,
               longitude: row.gpsCoordinates.longitude,
               coordinates: {
                   lat: row.gpsCoordinates.latitude,
                   lng: row.gpsCoordinates.longitude,
               },

           }

           const idDetails = {
               idType: row.idType,
               idImage: row.idImage,
               idNumber: row.idNumber,
               Image:row.Image,
           }
           console.log(locationDetails)
        saveValueToLocalStorage(localStorageKeys.supplier_form?.BASIC_SUPPLIER_DETAILS,basicDetails)
        saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_LOCATION_DETAILS, locationDetails);
        saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_ID_DETAILS, idDetails);
        navigate("form/edit");
    }

    const  actions:IAction<ISupplierDetails>[] = [
        {
            icon: <LucideEye className={"text-gray-500 size-4"} />,
            onClick: (row: ISupplierDetails) => {
                navigate(`details/${row.id}`, { state: row });
            },
            permission:permissions.SUPPLIER_DETAILS
        },
        {
            icon: <LucideEdit className={"text-gray-500 size-4"} />,
            onClick: (row: ISupplierDetails) => {
                 handleEditSupplier(row)
            },
            permission:permissions.UPDATE_SUPPLIER
        },
        {
            icon: <LucideTrash2 className={"text-red-500 size-4"} />,
            onClick: (row: ISupplierDetails) => {
                handleDeleteSupplier(row);
            },
            permission:permissions.DELETE_SUPPLIER
        },
    ];

    const headers: IHiHeader<ISupplierDetails>[] = [
        {
            key: "firstName",
            label: "Name",
            template: (row) => (
                <Link to={`details/${row.id}`}>
                   <SupplierAvatar supplier={row} />
                </Link>
            )
        },
        {
            key: "address",
            label: "Address",
            template: (row) => <p>{row.address}</p>
        },
        {
            key: "idType",
            label: "ID Type",
            template: (row) => <p>{row.idType}</p>
        },
        {
            key: "idNumber",
            label: "ID Number",
            template: (row) => <p>{row.idNumber}</p>
        },
        {
            key: "supplierStatus",
            label: "Status",
            template: (row) => <BadgeStatus status={row.supplierStatus} />
        },
        {
            key: "createdAt",
            label: "Created At",
            template: (row) => <p>{format(new Date(row.createdAt), "MMM d, yyyy")}</p>
        },
    ];

    const handleDeleteSupplier = async (supplier: ISupplierDetails) => {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this supplier: ${supplier?.firstName} ${supplier?.lastName}?`,
            type: "danger"
        });
        if (confirmed) {
            removeSupplierMutation(supplier?.id);
        }
    };

    const filteredActions = useFilterActionsByPermission(actions)

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
                                    <LucideStore className="text-primary-500 dark:text-primary-400" size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Suppliers</h1>
                                        <Badge label={`${suppliers?.metadata.total?.toLocaleString() ?? "0"} total`}
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
                                    placeholder="Search supplier..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="pl-10 bg-gray-50 dark:bg-neutral-800 rounded-lg border-gray-300 shadow-none dark:border-neutral-700"
                                />
                            </div>
                            <Can permission={permissions.ADD_SUPPLIER} messageScreen={false}>
                            <Link to="form/add">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                                >
                                    <Plus size={16} />
                                    <span>Add supplier</span>
                                </button>
                            </Link>
                            </Can>
                        </div>
                    </div>
                </header>
                <div className={"py-4"}>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : suppliers?.data?.length ?? 0 > 0 ? (
                        <HiTable
                            selectable={false}
                            headers={headers}
                            rows={suppliers?.data ?? []}
                            actions={filteredActions}
                            onRowClick={(row) => navigate(`details/${row.id}`)}
                            pagination={{
                                setPage: setPageNumber,
                                totalPages: suppliers?.metadata?.totalPages,
                                page: pageNumber,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                showPagesList: true
                            }}
                        />
                    ) : (
                        <EmptyState
                            title={"No suppliers found."}
                            message={"There are no suppliers to display at the moment, click button below to add"}
                            actionLabel={"Add supplier"}
                            actionLink={"form/add"}
                        />
                    )}
                </div>
            </PageFit>
        </>
    );
}

export default Suppliers;