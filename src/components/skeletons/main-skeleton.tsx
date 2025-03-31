import React, { FC, ReactElement } from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    child: ReactElement;
    items?: number;
    className?: string;
}

const MainSkeleton: FC<Props> = ({ child, items, className }) => {
    const loaders = Array.from({ length: items ?? 3 });

    return (
        <div  className={twMerge("", className)}>
            {loaders.map((_, index) => (
                React.cloneElement(child, { key: index })
            ))}
        </div>
    );
};

export default MainSkeleton;
