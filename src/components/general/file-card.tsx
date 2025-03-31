import {ElementType, FC} from "react";
import {twMerge} from "tailwind-merge";
import {TbTrash} from "react-icons/tb";
import {FileIcon, defaultStyles} from 'react-file-icon';

interface IFileCard {
    label: string;
    value?: string | number;
    metaValue?: string | number;
    onClick?: () => void;
    className?: string;
    Icon?: ElementType;
    ActionIcon?: ElementType;
    fileExtension?: string;
}

const FileCard: FC<IFileCard> = (
    {
        Icon,
        ActionIcon,
        className,
        label,
        onClick,
        value,
        fileExtension
    }) => {
    return (
        <div className={twMerge(className, "flex justify-between p-1 gap-3 border-[1px] rounded-lg border-gray-200 dark:border-neutral-600/50")}>
            <div className="flex gap-4">
                <div className="w-[32px] h-[22px] py-6 rounded-md grid place-items-center">
                    {Icon ? (
                        <Icon size={30} className="object-fit text-gray-400"/>
                    ) : (
                        <FileIcon
                            extension={fileExtension ? fileExtension : "doc"} {...defaultStyles[fileExtension || "doc"]} />
                    )}
                </div>
                <div className={`${!value ? 'py-2' : '-space-y-0'}`}>
                    <p className="text-neutral-800 dark:text-neutral-300 font-medium">{label}</p>
                    {value && <p className="text-gray-600 dark:text-neutral-100 text-xs">size: {value}</p>}
                </div>
            </div>

            {onClick && (
                <div className="mt-2">
                    <button onClick={onClick} className="white-button ml-auto text-gray-500">
                        {ActionIcon ? <ActionIcon size={12}/> : <TbTrash size={12}/>}
                    </button>
                </div>
            )}
        </div>
    );
}

export default FileCard;
