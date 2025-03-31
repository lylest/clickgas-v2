import { FC } from 'react';

const ShopSkeleton: FC = () => {
    return (
        <div className="flex flex-col h-full w-[32rem] bg-white dark:bg-neutral-800 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex-none p-6 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gray-200 dark:bg-neutral-700" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded" />
                        <div className="h-3 w-1/2 bg-gray-200 dark:bg-neutral-700 rounded" />
                        <div className="h-3 w-1/4 bg-gray-200 dark:bg-neutral-700 rounded" />
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 overflow-y-auto">
                {/* Description Section Skeleton */}
                <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-neutral-700 rounded mb-2" />
                    <div className="h-3 w-full bg-gray-200 dark:bg-neutral-700 rounded mb-1" />
                    <div className="h-3 w-2/3 bg-gray-200 dark:bg-neutral-700 rounded" />
                </div>

                {/* Contacts Section Skeleton */}
                <div className="p-6">
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-neutral-700 rounded mb-4" />
                    <div className="space-y-4">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 bg-gray-200 dark:bg-neutral-700 rounded-full" />
                                            <div className="h-3 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded" />
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 bg-gray-200 dark:bg-neutral-700 rounded-full" />
                                            <div className="h-3 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Actions Skeleton */}
            <div className="flex-none p-6 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex gap-4">
                    <div className="flex-1 h-10 bg-gray-200 dark:bg-neutral-700 rounded-lg" />
                    <div className="flex-1 h-10 bg-gray-200 dark:bg-neutral-700 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default ShopSkeleton;