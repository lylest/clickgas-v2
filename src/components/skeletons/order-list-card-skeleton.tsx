import { CalendarDays, Package, Store, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const OrderListCardSkeleton = () => {
    return (
        <div className="space-y-6 border-[1px] px-4 rounded-lg py-4 border-gray-200 animate-pulse">
            {/* Order Header */}
            <div className="pb-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-gray-300" />
                            <div className="h-5 w-24 bg-gray-200 rounded" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <CalendarDays className="h-4 w-4" />
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                        </div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Customer & Shop Section */}
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <Store className="h-4 w-4 text-gray-300 mt-1" />
                    <div>
                        <div className="h-5 w-40 bg-gray-200 rounded" />
                        <div className="h-4 w-32 bg-gray-200 rounded mt-1" />
                    </div>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="h-4 w-24 bg-gray-200 rounded" />
                    <span className="h-5 w-20 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="h-4 w-24 bg-gray-200 rounded" />
                    <span className="h-5 w-20 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                    <span className="h-4 w-24 bg-gray-200 rounded" />
                    <span className="h-5 w-12 bg-gray-200 rounded" />
                </div>
            </div>

            {/* View Details CTA */}
            <Button
                variant="ghost"
                className="w-full -mb-2 text-gray-300 bg-gray-200 rounded-md py-3"
                disabled
            >
                <span className="h-4 w-32 bg-gray-300 rounded" />
                <ChevronRight className="h-4 w-4 ml-2 text-gray-300" />
            </Button>
        </div>
    );
};

export default OrderListCardSkeleton;
