import { twMerge } from "tailwind-merge";
import { FC, HTMLAttributes } from "react";

const SkeletonLoader: FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...rest
}) => {
    return (
        <p
            {...rest}
            className={twMerge(
                ` skeleton-loading rounded-lg w-full py-2`,
                className,
            )}
        ></p>
    );
};

export default SkeletonLoader;
