import {createElement, ElementType, FC, HTMLAttributes} from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
}

const Container: FC<ContainerProps> = (
    {
        className,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        as = "sector",
        ...rest
    }) => {
    return createElement("div", {
        className: `container px-6 lg:px-0 max-w-8xl mx-auto ${className}`,
        ...rest,
    });
};
export default Container;
