import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {FC, forwardRef, InputHTMLAttributes, ReactNode, useState} from "react";
import {twMerge} from "tailwind-merge";

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    showErrorMessage?: boolean;
    hasError?: boolean;
    label?: ReactNode;
    labelClassName?: string;
    wrapperClass?: string;
    optional?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = forwardRef((props, ref) => {
    const {
        errorMessage,
        labelClassName,
        showErrorMessage = false,
        hasError = false,
        label,
        optional,
        wrapperClass,
        className,
        ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <div className={twMerge(`${label ? "space-y-1" : ""} `, wrapperClass)}>
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

            <div className="relative">
                <input
                    {...rest}
                    // @ts-ignore
                    ref={ref}
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    placeholder={rest.placeholder || "Enter your password"}
                    autoCorrect="off"
                    className={twMerge(
                        `
                        w-full pr-10 pl-2 text-gray-900 dark:text-neutral-100 shadow-sm ring-transparent ring-2 2xl:ring-4 enable-transition dark:bg-neutral-800  
                        focus:outline-none font-normal tracking-wider py-2 border xl:text-base md:text-sm md:py-2.5 lg:py-2 sm:text-sm sm:leading-6
                        rounded-lg overflow-hidden placeholder-gray-400 placeholder:font-light placeholder:text-sm dark:placeholder:text-neutral-400
                        ${hasError
                            ? "border-rose-500 focus:ring-rose-500/30 focus:border-rose-500"
                            : "border-gray-300 dark:border-neutral-600 focus:border-primary focus:ring-primary/40 dark:focus:border-neutral-500 dark:focus:ring-primary/40"
                        }
                        `,
                        className
                    )}
                />

                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                        <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-500" />
                    )}
                </button>
            </div>

            {hasError && showErrorMessage && (
                <p className="text-red-500 text-xs">
                    {errorMessage || "Please provide a valid password"}
                </p>
            )}
        </div>
    );
});

// Display name for better debugging
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;