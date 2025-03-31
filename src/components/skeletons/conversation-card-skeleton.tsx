
interface ConversationItemProps {
    isActive?: boolean;
}

const ConversationCardSkeleton = ({ isActive = false }: ConversationItemProps) => {
    return (
        <div
            className={`
                flex items-start gap-3 py-2 px-0 
                transition-all duration-200 ease-in-out
                hover:bg-gray-50/80 cursor-pointer
                relative group
                ${isActive ? 'bg-primary-50 ' : 'border-transparent'}
            `}
        >
            {/* Profile Image Skeleton */}
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-neutral-700 animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 min-w-0">
                {/* Top Row with Name and Time Skeleton */}
                <div className="flex items-center justify-between w-full mb-1">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-neutral-700 animate-pulse rounded" />
                    <div className="h-3 w-16 bg-gray-300 dark:bg-neutral-700 animate-pulse rounded" />
                </div>

                {/* Bottom Row with Message and Status Skeleton */}
                <div className="flex items-center justify-between w-full">
                    <div className="h-4 w-40 bg-gray-300 dark:bg-neutral-700 animate-pulse rounded" />
                    <div className="flex items-center gap-1 ml-2">
                        <div className="w-4 h-4 bg-gray-300 dark:bg-neutral-700 animate-pulse rounded" />
                        <div className="w-5 h-5 bg-gray-300 dark:bg-neutral-700 animate-pulse rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationCardSkeleton;
