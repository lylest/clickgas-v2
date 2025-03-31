import React, {
    FC,
    ReactNode,
    SelectHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
import { TbExclamationCircle } from "react-icons/tb";

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    hasError?: boolean;
    label?: ReactNode;
    options: Array<any>;
    valueName?: string;
    displayName?: string;
    wrapperClass?: string;
    labelClassName?: string;
    showErrMessage?: boolean;
    optional?: boolean;
}

const Select: FC<ISelectProps> = React.forwardRef((props, ref) => {
    const {
        name ,
        children,
        className,
        labelClassName,
        defaultValue,
        hasError,
        onChange = null,
        label,
        options,
        valueName,
        displayName,
        optional,
        wrapperClass,
        multiple = false,
        ...rest
    } = props;

    return (

        <div className={twMerge(`${label ? "space-y-1" : ""}`, wrapperClass)}>
            {label && (
                <label
                    htmlFor={name}
                    className={twMerge(
                        "text-sm dark:text-neutral-300 font-medium leading-6 text-gray-900",
                        labelClassName
                    )}
                >
                    <span>{label}</span>
                    {optional && (
                        <small className={"text-gray-400 dark:text-neutral-500 tracking-wide"}>
                            Optional
                        </small>
                    )}
                </label>
            )}
            <div className={"relative"}>
                <select
                    {...rest}
                    multiple={multiple}
                    // @ts-ignore
                    ref={ref}
                    onChange={(e) => {
                        onChange && onChange(e); // check if a handler is specified
                    }}
                    name={name}
                    defaultValue={defaultValue ? defaultValue : ""}
                    className={twMerge(
                        `
                            w-full px-2 text-gray-900 dark:text-neutral-100 shadow-sm
                            focus:border-[1.7px] focus:ring-2 2xl:focus:ring-4 enable-transition
                            dark:bg-neutral-800 focus:outline-none font-normal tracking-wider py-2
                            border-[1.4px] xl:text-base md:text-sm md:py-2.5 lg:py-2 sm:text-sm sm:leading-6
                            ${
                            hasError
                                ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
                                : "border-gray-300 dark:border-neutral-600 focus:border-primary"
                        }
                            rounded-[5px] overflow-hidden
                            placeholder-gray-400 dark:placeholder-neutral-500 placeholder:font-light placeholder:text-sm
                        `,
                        className
                    )}
                >
                    <option disabled value="">
                        Choose
                    </option>
                    {options.map((item) => (
                        <option key={valueName ? item[valueName] : item} value={valueName ? item[valueName] : item}>
                            {displayName ? item[displayName] : item}
                        </option>
                    ))}
                </select>

                {hasError && (
                    <TbExclamationCircle
                        className="absolute right-8 top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                    />
                )}
            </div>
            {hasError &&  (
                <p className="text-red-500 pt-1 text-sm">Please provide valid {name}</p>
            )}

        </div>
    );
});

export default Select;
