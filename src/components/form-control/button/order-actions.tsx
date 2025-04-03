import React, {useState} from 'react';
import {IOrder} from "@/types/order";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

interface OrderActionsProps {
    onCancel: () => void;
    onChangeStatus: (newStatus: string) => void;
    onConfirm: () => void;
    order: IOrder;
}

const OrderActions: React.FC<OrderActionsProps> = (
    {
        onCancel,
        onChangeStatus,
        onConfirm,
        order
    }) => {
    // Define terminal statuses where no actions should be available
    const terminalStatuses = ['cancelled', 'delivered', 'completed', 'returned'];
    const [orderStatus, setOrderStatus] = useState<string | undefined>(undefined);

    // Define statuses where cancellation is not allowed
    const nonCancellableStatuses = [
        'cancelled',
        'delivered',
        'completed',
        'returned',
        'on_route'  // Optional: might not want to cancel once it's on route
    ];

    // Define statuses where confirmation is not needed
    const nonConfirmableStatuses = [
        'confirmed',
        'preparing',
        'on_route',
        'delivered',
        'completed',
        'cancelled',
        'returned'
    ];

    const isTerminal = terminalStatuses.includes(order.orderStatus);
    const canCancel = !nonCancellableStatuses.includes(order.orderStatus);
    const canConfirm = !nonConfirmableStatuses.includes(order.orderStatus);

    // If order is in terminal state, hide all actions
    if (isTerminal) {
        return null;
    }


    const orderStatuses = [
        "pending",        // Initial state when order is created
        "preparing",      // Order is being prepared for delivery
        "on_route",       // Order is in transit
        "delivered",      // Successfully delivered to customer
        "not_delivered",  // Delivery attempt failed
        "returned",       // Order was returned after delivery attempt
    ];

    return (
        <div className="flex flex-wrap gap-4 items-center justify-between">
            {canCancel && (
                <Can permission={permissions.CANCEL_ORDER} messageScreen={false}>
                    <button
                        onClick={onCancel}
                        className="px-3 py-2 underline rounded text-gray-700 font-medium bg-white hover:bg-gray-100 transition-colors text-sm"
                    >
                        Cancel Order
                    </button>
                </Can>
            )}

            <div className="flex flex-wrap gap-2 items-center">
                <Can permission={permissions.UPDATE_ORDER_STATUS} messageScreen={false}>

                    <Select value={orderStatus} onValueChange={(value) => {
                        setOrderStatus(value);
                        onChangeStatus(value);
                    }}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Order Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {orderStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Can>


                {canConfirm && (
                    <Can permission={permissions.CONFIRM_ORDER} messageScreen={false}>
                        <button
                            onClick={onConfirm}
                            className="px-3 py-2 flex items-center gap-2 bg-green-600 rounded-lg text-white text-sm hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Confirm Order
                        </button>
                    </Can>
                )}
            </div>
        </div>
    );
};

export default OrderActions;