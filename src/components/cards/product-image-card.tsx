/*

import {format} from 'date-fns';
import {Download, Trash2} from 'lucide-react';
import {FC} from "react";
import {getFileSize} from "@/utils";
import {IProductImage} from "@/types/product-image";

interface IProps {
    productImage: IProductImage;
    onDownload: (productImage: IProductImage) => void;
    onDelete?: (productImage: IProductImage) => void;
}

const ProductImageCard: FC<IProps> = (
    {
        productImage,
        onDownload,
          onDelete
    }) => {

    const file = productImage.image;
    const fileSize = getFileSize(file)

    return (
        <div className="group relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden w-48">
            {/!* Image Container *!/}
            <div className="relative h-32 bg-gray-100">
                <img
                    src={file.bucketUrl || "/api/placeholder/192/128"}
                    alt={file.name}
                    className="w-full h-full object-cover"
                />
                {/!* Color Label *!/}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                    {productImage.color}
                </div>
                {/!* Overlay with actions *!/}
                <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                >
                    <button
                        onClick={() => onDownload(productImage)}
                        className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-700"
                    >
                        <Download className="w-4 h-4"/>
                    </button>
                    {onDelete && (
                        <button
                            onClick={() => onDelete(productImage)}
                            className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-700"
                        >
                            <Trash2 className="w-4 h-4"/>
                        </button>
                    )}
                </div>
            </div>

            {/!* Info Section *!/}
            <div className="p-2">
                <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {fileSize.size.toFixed(2)} {fileSize.unit}
                        </p>
                    </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                    {format(new Date(productImage.createdAt), 'MMM d, yyyy')}
                </p>
            </div>
        </div>
    );
};

export default ProductImageCard;*/
