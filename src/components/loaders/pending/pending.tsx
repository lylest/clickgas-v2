import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import { FC } from "react";

interface IPending {
    isLoading: boolean;
    label?: string;
}

const Pending: FC<IPending> = ({ isLoading, label }) => {
    return (
        <div className={"flex gap-2"}>
            {isLoading ? (
                <div className={"flex gap-1"}>
                    <IosLoader /> {label ? label : "Saving..."}
                </div>
            ) : (
                label ? label : "Save"
            )}
        </div>
    );
};

export default Pending;
