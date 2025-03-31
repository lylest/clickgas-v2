

export default function ProductDetailsSkeleton() {
    return (
        <>
            {/* Header with Skeleton Image */}
            <div className="flex-none border-b border-gray-200 dark:border-neutral-700">
                <div className="relative h-48 w-full bg-gray-200 dark:bg-neutral-700 animate-pulse" />
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="h-6 w-40 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                            <div className="mt-2 flex items-center gap-2">
                                <div className="h-4 w-20 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                                <div className="h-4 w-20 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Pricing Section */}
                <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="text-center">
                                <div className="h-4 w-24 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded mx-auto" />
                                <div className="h-6 w-20 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded mt-2 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                        <div className="h-4 w-full bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                                    <div className="h-4 w-24 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                                </div>
                                <div className="h-4 w-32 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(2)].map((_, index) => (
                                <div key={index}>
                                    <div className="h-4 w-24 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded" />
                                    <div className="h-6 w-20 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex-none p-6 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex gap-4">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="flex-1 h-10 bg-gray-300 dark:bg-neutral-600 animate-pulse rounded"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}