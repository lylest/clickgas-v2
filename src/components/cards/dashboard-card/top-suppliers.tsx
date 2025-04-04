import {ITopSupplier} from "@/types/dashboard";
import {FC} from "react";

interface Props {
    supplier: ITopSupplier;
}

const TopSupplierCard: FC<Props> = ({ supplier }) => {
    const getInitials = () => {
        const first = supplier.firstName?.charAt(0) || '';
        const last = supplier.lastName?.charAt(0) || '';
        return (first + last).toUpperCase();
    };

    // Generate a consistent color based on the name string
    const getAvatarColorClass = () => {
        const name = `${supplier.firstName} ${supplier.lastName}`;
        const colors = [
            'bg-red-100 text-red-500',
            'bg-orange-100 text-orange-500',
            'bg-yellow-100 text-yellow-500',
            'bg-purple-100 text-purple-500',
            'bg-green-100 text-green-500',
            'bg-blue-100 text-blue-500',
            'bg-indigo-100 text-indigo-500',
            'bg-pink-100 text-pink-500'
        ];

        // Create a simple hash to get a consistent color for the same name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Get a positive index in the colors array range
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-2 bg-white">
            <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColorClass()}`}>
                    <span className="text-sm font-medium">{getInitials()}</span>
                </div>

                <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{supplier.firstName} {supplier.lastName}</h3>
                    <div className="text-sm text-gray-500">
                        {supplier.email ? supplier.email : supplier.phone}
                    </div>
                    <div className="text-xs text-gray-400">
                        {supplier.region}, {supplier.country}
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Orders: {supplier.deliveredOrdersCount}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopSupplierCard;