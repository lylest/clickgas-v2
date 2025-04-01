import {FC} from 'react';
import {format} from 'date-fns';
import {Edit, Trash, Clock} from 'lucide-react';
import {IPermission} from "@/types/permission";

interface PermissionCardProps {
    permission: IPermission;
    onEdit?: () => void;
    onDelete?: (id: string) => void;
}

const PermissionCard: FC<PermissionCardProps> = (
    {
        permission,
        onEdit,
        onDelete = (id) => console.log('Delete permission:', id),
    }) => {

    const formatDate = (dateString: string): string => {
        try {
            return format(new Date(dateString), 'MMM d, yyyy');
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Get method color with consistent styling
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

    // Get status color with consistent styling for badges
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

    return (
        <div className="w-full px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-center justify-between">
                {/* Left section - Permission details with consistent spacing */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    {/* Method badge with fixed width for consistency */}
                    <div
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md font-medium text-xs ${getMethodColor(permission.httpMethod)} w-16 shrink-0`}>
                        {permission.httpMethod.toUpperCase()}
                    </div>

                    {/* Name and path with text truncation */}
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{permission.name}</h3>
                        <span className="text-xs text-gray-500 truncate max-w-xs">{permission.path}</span>
                    </div>
                </div>

                {/* Middle section - Status and date with fixed widths */}
                <div className="hidden md:flex items-center gap-6 shrink-0">
                    {/* Status with fixed width container */}
                    <div className="w-24 flex justify-center">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(permission.permissionStatus)}`}>
                            {permission.permissionStatus}
                        </span>
                    </div>

                    {/* Created date with consistent formatting */}
                    <div className="flex items-center text-xs text-gray-500 w-32">
                        <Clock className="h-3 w-3 mr-1 flex-shrink-0"/>
                        <span>{formatDate(permission.createdAt)}</span>
                    </div>
                </div>

                {/* Right section - Actions */}
                <div className="flex items-center gap-1 ml-2 shrink-0">
                    <button
                        onClick={() => onEdit?.()}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        aria-label="Edit permission"
                    >
                        <Edit className="h-4 w-4"/>
                    </button>
                    <button
                        onClick={() => onDelete(permission.id)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                        aria-label="Delete permission"
                    >
                        <Trash className="h-4 w-4"/>
                    </button>
                </div>
            </div>

            {/* Mobile view for status and date with improved alignment */}
            <div className="flex md:hidden items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex justify-start w-1/2">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(permission.permissionStatus)}`}>
                        {permission.permissionStatus}
                    </span>
                </div>
                <div className="flex items-center justify-end w-1/2">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0"/>
                    <span>{formatDate(permission.createdAt)}</span>
                </div>
            </div>

        </div>
    );
};

export default PermissionCard;