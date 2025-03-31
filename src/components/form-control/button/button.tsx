import { ButtonHTMLAttributes, FC, forwardRef, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { LoadingCircle } from "@/svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    outline?: boolean;
    ghost?:boolean;
    loading?: boolean;
    loadingText?: string;
}

const Button: FC<ButtonProps> = forwardRef((props, ref) => {
    const { className, children, ghost, outline, loading, ...rest } = props;
    // 2xl:text-xl 2xl:py-5 2xl:px-6 2xl:tracking-wide 2xl:space-x-8
    return (
        <button
            //@ts-ignore
            ref={ref}
            disabled={loading}
            {...rest}
            className={twMerge(
                ` ${
                    outline
                        ? "border-[1px] border-primary text-primary" :
                        ghost ? "border-[0px] text-primary font-medium" : "bg-primary text-red-50"
                }  px-4 py-2  relative hover:opacity-90 focus:outline-none rounded-md 
                ${
                    loading
                        ? "cursor-not-allowed center "
                        : " cursor-pointer opacity-100"
                }`,
                className
            )}
        >
            {loading ? (
                <Fragment>
                    <LoadingCircle />
                    <span className={"tracking-wide"}>
                        {" "}
                        {props.loadingText ?? "Processing..."}
                    </span>
                </Fragment>
            ) : (
                children
            )}
        </button>
    );
});

export default Button;
