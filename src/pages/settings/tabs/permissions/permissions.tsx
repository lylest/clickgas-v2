import {useAlerts} from "@/Providers/Alert";
import {useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useGetPermissions, useRemovePermission} from "@/pages/settings/tabs/permissions/permission-queries.ts";
import {IPermission} from "@/types/permission";
import AlertContainer from "@/Providers/Alert/AlertContainer.tsx";
import PageFit from "@/components/general/PageFit.tsx";
import PermissionCard from "@/components/cards/permission-card.tsx";
import Badge from "@/components/general/Badge.tsx";
import {TextInput} from "@/components/form-control";
import {TbPlus} from "react-icons/tb";
import Pagination from "@/components/pagination.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const Permissions = () => {
    const {confirm} = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();

    const {data: permissionsList} = useGetPermissions(pageNumber, pageSize, keyword);


    async function handleDelete(row: IPermission) {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this permission: ${row.name}?`,
            type: "danger"
        });
        if (confirmed) {
            removePermissionMutation(row.id)
        }
    }

    const {mutate: removePermissionMutation} = useRemovePermission()
    return (
        <>
            <Outlet/>
            <PageFit>
                <AlertContainer/>
                <div className="flex justify-between py-1 flex-wrap gap-5">
                    <div className={"space-y-1"}>
                        <div className={"flex items-center gap-2"}>
                            <h1 className={"text-neutral-800 text-lg font-medium dark:text-neutral-200"}>Permissions</h1>
                            <Badge label={`${permissionsList?.metadata?.total?.toLocaleString() ?? "0"}total`}
                                   type={"secondary"}/>
                        </div>
                        <p className={"text-xs text-neutral-600 dark:text-neutral-500"}>Manage, create, edit and
                            delete</p>
                    </div>

                    <div className={"flex gap-4 items-center"}>
                        <TextInput placeholder={"Search"} value={keyword}
                                   onChange={(e) => setKeyword(e.target.value)}/>
                        <Can permission={permissions.GET_PERMISSIONS}>
                        <Link to={"form/add"}>
                            <button type="button"
                                    className="py-[10px] px-3 text-[0px] lg:text-sm items-center rounded-lg small-button">
                                <TbPlus size={20}/>Add permission
                            </button>
                        </Link>
                        </Can>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    <Can permission={permissions.GET_PERMISSIONS}>
                        {permissionsList?.data?.length ?? 0 > 0 ? (
                            permissionsList?.data?.map((permission) => (
                                <PermissionCard
                                    key={permission.id}
                                    permission={permission}
                                    onEdit={() => {
                                        navigate(`form/edit`, {state: permission});
                                    }}
                                    onDelete={() => handleDelete(permission)}
                                />
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-gray-500">
                                No permissions found
                            </div>
                        )}
                    </Can>
                </div>
                <Pagination
                    showPageSizeSelector={true}
                    showPagesList={true}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    page={pageNumber}
                    setPage={setPageNumber}
                    totalPages={permissionsList?.metadata?.totalPages}/>
            </PageFit>
        </>
    )
}

export default Permissions;