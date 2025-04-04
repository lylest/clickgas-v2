

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface IOrderStats {
    totalOrders: number;
    deliveredOrders: number;
    notDeliveredOrders: number;
    cancelledOrders: number;
    deliveryRate: number;
    cancellationRate: number;
    deliveryRateChange: number;
    cancelRateChange: number;
}

const DeliveryWidget = ({ stats }: { stats: IOrderStats }) => {

    const RateChangeIndicator = ({ value }: { value: number }) => (
        <div className="flex items-center">
            {value > 0 ? (
                <div className="flex items-center text-emerald-500">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+{value.toFixed(1)}%</span>
                </div>
            ) : (
                <div className="flex items-center text-red-500">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span>{value.toFixed(1)}%</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Performance Metrics */}
            <Card className="md:col-span-4 border-none shadow-none">
                <CardHeader>
                    <CardTitle>Delivery Performance</CardTitle>
                    <CardDescription>Key metrics summary</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-sm font-medium text-blue-700">Delivery Rate</div>
                            <div className="text-2xl font-bold text-blue-900">{stats.deliveryRate.toFixed(1)}%</div>
                            <div className="mt-1">
                                <RateChangeIndicator value={stats.deliveryRateChange} />
                            </div>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                            <div className="text-sm font-medium text-red-700">Cancellation Rate</div>
                            <div className="text-2xl font-bold text-red-900">{stats.cancellationRate.toFixed(1)}%</div>
                            <div className="mt-1">
                                <RateChangeIndicator value={stats.cancelRateChange} />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm font-medium text-gray-700">Success Ratio</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {(stats.deliveredOrders / (stats.deliveredOrders + stats.notDeliveredOrders) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-500">Delivered vs Not Delivered</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm font-medium text-gray-700">Failure Rate</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {((stats.notDeliveredOrders + stats.cancelledOrders) / stats.totalOrders * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-500">Combined non-success rate</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DeliveryWidget;