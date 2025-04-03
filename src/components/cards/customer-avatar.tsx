import React from "react";
import {ICustomer} from "@/types/customer";



interface CustomerAvatarProps {
    customer: ICustomer;
}

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ customer }) => {
    const initials = `${customer.firstName[0]}${customer.lastName[0]}`.toUpperCase();

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="size-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-700 font-medium text-sm">
                    {initials}
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {customer.firstName} {customer.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {customer.phone}
                </p>
            </div>
        </div>
    );
};

export default CustomerAvatar;