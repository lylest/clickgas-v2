import { FC, useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
    file: File;
    onRemove: () => void;
}

const ImagePreviewCard: FC<Props> = ({ file, onRemove }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Cleanup object URL on unmount
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    return (
        <div className="flex justify-center items-center p-6">
            <div className="group relative">
                {/* Main card with premium shadow */}
                <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.12)]">
                    {/* Image container */}
                    <div className="relative h-52 w-52">
                        <img
                            src={previewUrl}
                            alt={file.name}
                            className="h-full w-full object-cover"
                        />

                        {/* Frosted glass overlay that appears on hover */}
                        <div className="absolute inset-0 bg-black/0 transition-all duration-300 ease-in-out group-hover:bg-black/5" />
                    </div>
                </div>

                {/* Remove button with sophisticated animation */}
                <button
                    onClick={onRemove}
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white hover:scale-110 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.16)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <X className="h-4 w-4 text-gray-600" strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default ImagePreviewCard;