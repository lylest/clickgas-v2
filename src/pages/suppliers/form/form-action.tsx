import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import FullDivider from "@/components/divider/FullDivider.tsx";
import IosLoader from "@/components/loaders/ios/IosLoader.tsx";

interface IProps {
    showPreviousAction?: boolean;
    submitBtnText?: string;
    className?: string;
    hasPrevious?: boolean;
    currentPage?: number;
    disabled?: boolean;
    loading?: boolean;
    stepsCount?: number;
}

const FormAction: FC<IProps> = (
    {
        className,
        hasPrevious: onPrevious,
        submitBtnText,
        currentPage,
        disabled,
        loading,
        stepsCount
    }) => {
    const navigate = useNavigate();

    return (
        <>
            <FullDivider />
            <div className={twMerge("w-full flex items-center  justify-between bg-gray-50 px-4 py-3 ", className)}>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className={`text-xs ${!onPrevious && "opacity-0 pointer-events-none"} py-2 px-3 outlined-button`}
                >
                    Previous
                </button>
                <div className="flex gap-2">
                    {[...Array(stepsCount ?? 4)].map((_, index) => (
                        <div
                            className={twMerge("w-2 h-2 rounded-full bg-gray-200", index + 1 == currentPage && "bg-primary")} />
                    ))}
                </div>
                <button type={"submit"} disabled={disabled} className="flex py-2 px-3 small-button ">
                    {submitBtnText ?? "Next"}
                    {loading ? <IosLoader /> : null}
                </button>
            </div>
        </>
    );
};
export default FormAction;
