import {TbCloudUpload} from "react-icons/tb";

const UploadingIndicator =()=> {
    return (
        <div className="absolute top-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm border-b animate-slideDown">
            <div className="max-w-md mx-auto flex items-center gap-3">
                <div className="flex-1">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full animate-indeterminateProgress"/>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                        <TbCloudUpload className="w-4 h-4 animate-bounce"/>
                        Uploading file...
                    </span>
                        <span className="text-xs text-primary-500 font-medium animate-pulse">
                        Please wait
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadingIndicator;