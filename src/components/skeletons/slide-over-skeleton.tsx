
const SlideOverSkeleton =()=> {
    return (
        <div className="flex flex-col gap-2 w-[32rem] h-full bg-white dark:bg-neutral-800 overflow-y-auto scrollNone">
            <div className="px-4 py-4 space-y-4">
                {/* Header Skeleton */}
                <div className="h-6 w-32 bg-gray-200 dark:bg-neutral-600 rounded"></div>

                {/* Name and Status Skeleton */}
                <div className="flex justify-between items-center">
                    <div>
                        <div className="h-4 w-16 bg-gray-200 dark:bg-neutral-600 rounded mb-1"></div>
                        <div className="h-6 w-24 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                </div>
                <div className="w-full h-px bg-gray-200 dark:bg-neutral-600"></div>

                {/* Basic Data Skeleton */}
                <div className="py-2 space-y-4">
                    {Array(3).fill(0).map((_, index) => (
                        <div key={index} className="flex gap-2 justify-between">
                            <div className="h-4 w-16 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                            <div className="h-4 w-24 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                        </div>
                    ))}

                    {/* Sample Skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                    </div>

                    {/* Requested Date Skeleton */}
                    <div className="flex gap-2 justify-between">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                    </div>

                    {/* Added By Section Skeleton */}
                    <div className="h-4 w-16 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                    <div className="flex gap-2 py-3 space-y-0">
                        <div className="h-12 w-12 bg-gray-200 dark:bg-neutral-600 rounded-full"></div>
                        <div className="w-7/12 space-y-2">
                            <div className="h-4 w-32 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                            <div className="h-3 w-24 bg-gray-200 dark:bg-neutral-600 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SlideOverSkeleton
