import { FileText } from 'lucide-react';
import { IPayment } from "@/types/payments";
import { format } from "date-fns";
import BadgeStatus from "@/components/badge-status.tsx";

interface PaymentCardProps {
    payment: IPayment;
}

const PaymentCard = ({ payment }: PaymentCardProps) => {
    const formatDate = (date: string | undefined) => {
        if (!date) return '-';
        try {
            return format(new Date(date), 'MMM d, yyyy');
        } catch {
            return '-';
        }
    };

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <div className="mt-1">
                        <FileText className="w-5 h-5 text-green-600"/>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">#{payment.order.trackingNo}</span>
                            <span className="font-medium text-gray-900"> Order Tracking No</span>
                        </div>

                        <div className="flex gap-8 text-sm text-gray-500">
                            <div>
                                <span className="block text-xs">Payment date</span>
                                <span>{formatDate(payment.createdAt)}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-right">
                        <div>
                            <span className="block text-xs text-gray-500">Amount</span>
                            <span className="font-semibold text-gray-900">
                                ${payment.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="mt-1">
                            <span className="block text-xs text-gray-500">Total</span>
                            <span className="font-semibold text-gray-900">
                                ${payment.totalAmount.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div>
                        <BadgeStatus status={payment.paymentStatus}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCard;