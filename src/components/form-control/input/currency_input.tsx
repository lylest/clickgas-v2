import { ChangeEvent, FC, forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    showErrorMessage?: boolean;
    hasError?: boolean;
    label?: ReactNode;
    labelClassName?: string;
    defaultValue?: number;
    wrapperClass?: string;
    optional?: boolean;
    onInputChange?:  (event: ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyInput: FC<InputProps> = forwardRef((props, ref) => {
    const {
        errorMessage,
        labelClassName,
        showErrorMessage = false,
        hasError = false,
        label,
        defaultValue,
        optional,
        wrapperClass,
        className,
        onInputChange,
        ...rest
    } = props;

    const [amount, setAmount] = useState<number | null>(defaultValue ?? null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric characters
        const inputValue = event.target.value.replace(/[^0-9]/g, '');
        setAmount(inputValue === '' ? null : parseInt(inputValue, 10));
        onInputChange && onInputChange(event);
    };

    const formatCurrency = (value: number | null): string => {
        if (value === null) {
            return '';
        }

        // Use Intl.NumberFormat for currency formatting
        const formattedValue = new Intl.NumberFormat('sw-TZ', {
            style: 'currency',
            currency: 'TZS', // Change this to your desired currency code
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value); // Divide by 100 if the input value is in cents

        return formattedValue;
    };


    return (
        // @ts-ignore
        <div
            className={twMerge(`${label ? "space-y-1" : ""} `, wrapperClass)}
        >
            {label && (
                <label
                    htmlFor={rest.name}
                    className={twMerge(
                        " text-sm items-between font-medium leading-6 text-gray-900 dark:text-neutral-300",
                        labelClassName
                    )}
                >
                    <span>{label}</span>
                    {optional && (
                        <small className={"text-gray-400 tracking-wide"}>
                            Optional
                        </small>
                    )}
                </label>
            )}
            <input
                // @ts-ignore
                ref={ref}
                type="text"
                autoComplete={"off"}
                placeholder={"Type something"}
                autoCorrect={"off"}
                className={twMerge(
                    `
                        w-full dark:text-neutral-100 text-gray-900 shadow-sm ring-transparent ring-2 2xl:ring-4 enable-transition dark:bg-neutral-800  
                        focus:outline-none font-normal tracking-wider pl-2 py-2 border xl:text-base md:text-sm  md:py-2.5 lg:py-2 sm:text-sm sm:leading-6
                        rounded-lg overflow-hidden placeholder-gray-400 placeholder:font-light placeholder:text-sm dark:placeholder:text-neutral-400
                        ${hasError
                        ? "border-rose-500 focus:ring-rose-500/30 focus:border-rose-500"
                        : "border-gray-300  dark:border-neutral-600 focus:border-primary focus:ring-primary/40 dark:focus:border-neutral-500 dark:focus:ring-primary/40"
                    }
                    `,
                    className
                )}
                {...rest}
                defaultValue={defaultValue}
                value={amount === null ? '' : formatCurrency(amount)}
                onChange={handleInputChange}
            />
            {hasError && showErrorMessage ? (
                <p className={"text-red-500  text-xs"}>
                    {errorMessage
                        ? errorMessage
                        : `Please provide valid ${className}`}
                </p>
            ) : null}
        </div>
    );

});

export default CurrencyInput;
