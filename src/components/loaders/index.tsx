import SpinLoader from "@/components/loaders/spinner";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

const Loader: FC<{ className?: string }> = ({ className }) => {
    return (
        <div
            className={twMerge(
                "h-96 flex-col space-y-5 text-black/60 center",
                className
            )}
        >
            <SpinLoader className={""} />
            <p className={"text-sm "}>Please Wait..</p>
        </div>
    );
};
export default Loader;
