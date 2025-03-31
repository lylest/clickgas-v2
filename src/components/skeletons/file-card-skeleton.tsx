import {FC} from "react";

const FileRowSkeleton: FC = () => {
    return (
        <div className="flex items-center hover:bg-gray-50 py-2 px-4 border-b border-gray-200 animate-pulse">
            {/* Icon and Name Placeholder */}
            <div className="flex items-center w-1/2">
                <div className="w-6 h-6 mr-3 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            {/* Folder Placeholder */}
            <div className="w-1/6">
                <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            {/* Size Placeholder */}
            <div className="w-1/6">
                <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
            {/* Date and Action Placeholder */}
            <div className="w-1/6 flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
};

export default FileRowSkeleton;
