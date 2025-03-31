import {ExclamationCircleIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {FC, forwardRef, InputHTMLAttributes, ReactNode, useState} from "react";
import {twMerge} from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onUpload?: () => void;
    errorMessage?: string;
    showErrorMessage?: boolean;
    hasError?: boolean;
    label?: ReactNode;
    labelClassName?: string;
    wrapperClass?: string;
    optional?: boolean;
    isPassword?: boolean
}

const Input: FC<InputProps> = forwardRef((props, ref) => {
    const {
        onUpload: handleFileUpload,
        errorMessage,
        labelClassName,
        showErrorMessage = false,
        hasError = false,
        label,
        optional,
        isPassword,
        wrapperClass,
        className,
        ...rest
    } = props;

    const [obscure, setObscure] = useState(true)
    const isFileInput = rest.type === "file";

    const handleClick = () => {
        if (isFileInput && !!handleFileUpload) {
            handleFileUpload();
        }
    };

    return (
        // @ts-ignore
        <div
            className={twMerge(`${label ? "space-y-1" : ""} `, wrapperClass)}
            onClick={handleClick}
        >
            {label && (
                <label
                    htmlFor={rest.name}
                    className={twMerge(
                        "text-sm flex gap-1 font-medium leading-6 text-gray-900 dark:text-neutral-300",
                        labelClassName
                    )}
                >
                    <span>{label}</span>
                    {optional && (
                        <small className={"text-gray-400 font-light tracking-wide"}>
                            (Optional)
                        </small>
                    )}
                </label>
            )}

            <div className={`relative`}>
                <input
                    // @ts-ignore
                    ref={ref}
                    autoComplete={"off"}
                    type={isPassword ? (obscure ? "password" : "text") : rest.type}
                    placeholder={"Type something"}
                    autoCorrect={"off"}
                    className={twMerge(
                        `
                        w-full px-4 text-gray-900 dark:text-neutral-100 shadow-sm ring-transparent ring-2 2xl:ring-4 enable-transition dark:bg-neutral-800  
                        focus:outline-none font-normal tracking-wider py-2 border xl:text-base md:text-sm md:py-2.5 lg:py-2 sm:text-sm sm:leading-6
                        rounded-lg overflow-hidden placeholder-gray-400 placeholder:font-light placeholder:text-sm dark:placeholder:text-neutral-400
                        ${isFileInput
                            ? "pl-28 cursor-pointer"
                            : "px-2 placeholder-[#646464]"
                        }
                        ${hasError
                            ? "border-rose-500 focus:ring-rose-500/30 focus:border-rose-500"
                            : "border-gray-300 dark:border-neutral-600 focus:border-primary focus:ring-primary/40 dark:focus:border-neutral-500 dark:focus:ring-primary/40"
                        }
                    `,
                        className
                    )}
                    {...rest}
                />
                {hasError && !isPassword ? (
                    <ExclamationCircleIcon
                        className={
                            "absolute right-2 pointer-events-none top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                        }
                    />
                ) : null}
                <button
                    type={"button"}
                    className={`absolute text-gray-900 ${isFileInput ? "" : "hidden"
                    } top-[1px] px-3 bottom-[1px] rounded-l z-10 left-[1px] bg-[#D2D4DA]`}
                >
                    Choose File
                </button>
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setObscure(!obscure)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    >
                        {obscure ? (
                            <EyeIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                            <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                )}
            </div>
            {hasError && showErrorMessage ? (
                <p className={"text-red-500 text-xs"}>
                    {errorMessage
                        ? errorMessage
                        : `Please provide valid ${className}`}
                </p>
            ) : null}
        </div>
    );
});

export default Input;