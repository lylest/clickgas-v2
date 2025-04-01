
// @/components/general/SupplierAvatar.tsx
import React from "react";
import { LucideStore } from "lucide-react";
import {ISupplierDetails} from "@/types/supplier";


interface SupplierAvatarProps {
    supplier: ISupplierDetails;
}

const SupplierAvatar: React.FC<SupplierAvatarProps> = ({ supplier }) => {
    const initials = `${supplier.firstName[0]}${supplier.lastName[0]}`.toUpperCase();

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="size-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-700 font-medium text-sm">
                    {initials}
                    <LucideStore className="absolute -bottom-1 -right-1 size-3 text-white bg-yellow-500 rounded-full p-0.5" />
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {supplier.firstName} {supplier.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {supplier.phone}
                </p>
            </div>
        </div>
    );
};

export default SupplierAvatar;