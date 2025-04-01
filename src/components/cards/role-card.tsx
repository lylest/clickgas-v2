import {FC }from 'react';
import {Clock, Edit, Eye, Trash,} from 'lucide-react';
import {format} from 'date-fns';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {IRole} from "@/types/role";


interface CardProps {
    item: IRole;
    onView?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: () => void;
}

const RoleCard: FC<CardProps> = (
    {
        item: role,
        onView = (id) => console.log('View details:', id),
        onEdit = (id) => console.log('Edit role:', id),
        onDelete = () => console.log('Role deleted:')
    }) => {

    // Format date using date-fns
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'MMM d, yyyy');
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'suspended':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="w-full max-w-md rounded-xl overflow-hidden shadow-none bg-white border border-gray-200">
            {/* Card Header */}
            <div  className="px-6 py-4 border-b   border-gray-100 flex justify-between items-center">
                <div className="flex items-center cursor-pointer space-x-2" onClick={() =>onView(role.id)}>
                    <div
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {role.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(role.roleStatus)}`}>
                            {role.roleStatus.charAt(0).toUpperCase() + role.roleStatus.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Action Menu using shadcn Popover */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor"
                                 className="text-gray-600">
                                <circle cx="12" cy="5" r="1" fill="currentColor"/>
                                <circle cx="12" cy="12" r="1" fill="currentColor"/>
                                <circle cx="12" cy="19" r="1" fill="currentColor"/>
                            </svg>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0">
                        <div className="py-1">
                            <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => onView(role.id)}
                            >
                                <Eye className="mr-3 h-4 w-4"/>
                                View Details
                            </button>
                            <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => onEdit(role.id)}
                            >
                                <Edit className="mr-3 h-4 w-4"/>
                                Edit Role
                            </button>
                            <button
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => onDelete()}
                            >
                                <Trash className="mr-3 h-4 w-4"/>
                                Delete Role
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Card Content */}
            <div className="px-6 py-4">
                <p className="text-sm text-gray-600">{role.description}</p>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-3 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1"/>
                    <span>Created: {formatDate(role.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default RoleCard;