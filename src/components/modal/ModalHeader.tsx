import { XMarkIcon } from "@heroicons/react/24/solid";
import {FC, ReactElement} from "react";
import { twMerge } from "tailwind-merge";
import {Button} from "@/components/form-control";

interface Props {
    className?: string;
    buttonClassName?: string;
    onClose: () => void;
    Icon?:ReactElement
}

const ModalHeader: FC<Props> = (props) => {
    const { onClose: handleClose, className, buttonClassName,Icon } = props;
    return (
        <header
            className={twMerge(
                "items-between  text-slate-800 sticky top-0  z-20  px-5 py-3 bg-white",
                className,
            )}
        >
            {Icon && <div
                className={"size-10 rounded-full mt-1 bg-primary-200/50 center text-primary-500 grid place-items-center"}>
                {Icon}
            </div>}
            <Button
                onClick={handleClose}
                className={twMerge(
                    "ml-auto h-8 w-8 bg-white over:text-gray-600 hover:bg-gray-50 text-gray-400 p-0 center",
                    buttonClassName,
                )}>
                <XMarkIcon className={"h-6 w-6 m-1"}/>
            </Button>
        </header>
    );
};
export default ModalHeader;
