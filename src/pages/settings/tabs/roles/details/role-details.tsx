import { Fragment, useState } from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {
    useGetRoleDetails,
    useGetRolePermissions,
    useRemoveRolePermission
} from "@/pages/settings/tabs/roles/role-queries.ts";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import useRouteModal from "@/hook/useRouteModal.tsx";
import SlideOver from "@/components/sideover";
import { format } from "date-fns";
import {
    CheckCircle,
    Clock,
    Search,
    Plus,
    Trash,
    AlertCircle,
    Users,
    ShieldCheck
} from "lucide-react";
import Pagination from "@/components/pagination";
import { IRolePermission} from "@/types/role";
import{useAlerts} from "@/Providers/Alert";


const RoleDetails = () => {
    const {confirm} = useAlerts();
    const { roleId } = useParams();
    const  navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const { data: roleData, isPending: roleLoading } = useGetRoleDetails(roleId!, {
        enabled: !!roleId
    });
    const { data: permissionsData, isPending: permissionsLoading } = useGetRolePermissions(
        pageNumber,
        pageSize,
        keyword,
        roleId!,
        { enabled: !!roleId }
    );

    const baseUrl = '/settings/roles';
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true
        }
    });

    // Format date helper
    const formatDate = (dateString: string): string => {
        try {
            return format(new Date(dateString), "MMM d, yyyy");
        } catch (error) {
            return "Invalid date";
        }
    };

    // Get method color
    const getMethodColor = (method: string): string => {
        switch (method.toUpperCase()) {
            case 'GET':
                return 'bg-blue-100 text-blue-800';
            case 'POST':
                return 'bg-green-100 text-green-800';
            case 'PUT':
            case 'PATCH':
                return 'bg-amber-100 text-amber-800';
            case 'DELETE':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get status color
    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'inactive':
                return 'bg-gray-50 text-gray-700 border-gray-200';
            case 'pending':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-blue-50 text-blue-700 border-blue-200';
        }
    };


    async function handleRemovePermission(permission: IRolePermission) {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this permission: ${permission.Permission.name}?`,
            type: "danger"
        });
        if (confirmed) {
            removeRolePermissionMutation(permission.id)
        }
    }

    function handleSuccess() {
        navigate(`/settings/roles/details/${roleId!}`);
    }

    const { mutate: removeRolePermissionMutation } = useRemoveRolePermission({ onSuccess: handleSuccess })
    return (
        <Fragment>
            <SlideOver open={open} onClose={closeModal}>
                <Outlet />
                <div className="flex flex-col w-[32rem] h-full bg-white dark:bg-neutral-800 overflow-hidden">
                    <SlideOverHeader onClose={closeModal} title="Role Details" />

                    {/* Role Details Card */}
                    {roleLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="animate-pulse h-8 w-8 rounded-full bg-gray-300"></div>
                        </div>
                    ) : roleData ? (
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                                    {roleData?.data?.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-medium text-gray-900">{roleData?.data?.name}</h2>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                                        ${getStatusColor(roleData?.data?.roleStatus)}`}>
                      {roleData?.data?.roleStatus}
                    </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">{roleData?.data?.description}</p>

                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Clock className="h-3 w-3 mr-1" />
                                            <span>Created: {formatDate(roleData?.data?.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Users className="h-3 w-3 mr-1" />
                                            <span>ID: {roleData?.data?.id.substring(0, 8)}...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-40">
                            <div className="text-center">
                                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto" />
                                <p className="mt-2 text-sm text-gray-600">Role not found</p>
                            </div>
                        </div>
                    )}

                    {/* Permissions Section */}
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <ShieldCheck className="h-4 w-4 text-gray-500 mr-2" />
                                    <h3 className="font-medium text-gray-700">Permissions</h3>
                                </div>
                                <button
                                    onClick={()=> navigate(`add-permission`)}
                                    className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Permission
                                </button>
                            </div>

                            {/* Search input */}
                            <div className="mt-4 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search permissions..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Permissions List */}
                        <div className="flex-1 overflow-y-auto scrollNone">
                            {permissionsLoading ? (
                                <div className="flex items-center justify-center h-40">
                                    <div className="animate-pulse h-8 w-8 rounded-full bg-gray-300"></div>
                                </div>
                            ) : permissionsData?.data?.length ?? 0 > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {permissionsData?.data?.map((rolePermission: IRolePermission) => (
                                        <div key={rolePermission.id} className="px-6 py-3 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${getMethodColor(rolePermission.Permission.httpMethod)}`}>
                                                        {rolePermission.Permission.httpMethod}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-900">{rolePermission.Permission.name}</span>
                                                        <span className="text-xs text-gray-500 truncate max-w-xs">{rolePermission.Permission.path}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemovePermission(rolePermission)}
                                                    className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                    aria-label="Remove permission"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="mt-2 flex items-center text-xs text-gray-500">
                                                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                                <span>Granted by: {rolePermission.user.userName}</span>
                                                <span className="mx-2">•</span>
                                                <Clock className="h-3 w-3 mr-1" />
                                                <span>{formatDate(rolePermission.grantedAt)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-40">
                                    <div className="text-center">
                                        <ShieldCheck className="h-8 w-8 text-gray-400 mx-auto" />
                                        <p className="mt-2 text-sm text-gray-600">No permissions found</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200">
                            <Pagination
                                showPageSizeSelector={true}
                                showPagesList={true}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                page={pageNumber}
                                setPage={setPageNumber}
                                totalPages={permissionsData?.metadata?.totalPages}
                            />
                        </div>
                    </div>
                </div>
            </SlideOver>
        </Fragment>
    );
};

export default RoleDetails;