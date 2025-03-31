import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FC, forwardRef, useState } from "react";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { UseFormSetValue } from "react-hook-form";
import { IFormField } from "@/utils/generate-form-field.tsx";
import { twMerge } from "tailwind-merge";

export interface InputProps
    extends Omit<IFormField, "register" | "setValue"> {
    setValue: UseFormSetValue<any>;
    defaultChecked?: boolean;
    checked?: boolean;
    isPassword?: boolean;
}

const PhoneInput: FC<InputProps> = forwardRef((props, ref) => {
    const {
        errorMessage,
        labelClassName,
        showErrorMessage = false,
        hasError = false,
        label,
        optional,
        setValue,
        wrapperClass,
        className,
        ...rest
    } = props;
    const [phoneValue, setPhoneValue] = useState('');
    const [, setIsValid] = useState(false);
    const [countryCode, setCountryCode] = useState("255");

    const handlePhoneNumberChange = (isValid: boolean, value: string, country: any, phoneNumber: string) => {
        setCountryCode(country.dialCode);
        setPhoneValue(phoneNumber);
        setValue(rest.name ?? "phoneNumber", value.replace(/\s+/g, ''));
        setValue(rest.name ?? "phoneNumber", countryCode + value.trim());
        setIsValid(isValid);
    };

    const defaultStyles = `
    w-full text-gray-900 dark:text-neutral-100 shadow-sm 
    ring-transparent ring-2 
    2xl:ring-4 enable-transition  
    focus:outline-none 
    font-normal tracking-wider
    py-2 border xl:text-base md:text-sm
    md:py-2.5 lg:py-2 sm:text-sm
    sm:leading-6
    rounded-lg overflow-hidden
    placeholder-gray-400 dark:placeholder-neutral-500
    placeholder:font-light
    placeholder:text-sm
    dark:bg-neutral-800 dark:border-neutral-600
    `;

    return (
        <div className={twMerge(`${label ? "space-y-1" : ""} `, wrapperClass)}>
            {label && (
                <label
                    htmlFor={rest.name}
                    className={twMerge(
                        " text-sm font-medium leading-6 text-gray-900 dark:text-neutral-100",
                        labelClassName,
                    )}
                >
                    <span className="flex gap-2 items-end">
                        {label}
                        <small className={"text-gray-400 dark:text-neutral-400 tracking-wide"}>
                            {`(+${countryCode})`}
                        </small>
                    </span>
                    {optional && (
                        <small className={"text-gray-400 dark:text-neutral-400 tracking-wide"}>
                            Optional
                        </small>
                    )}
                </label>
            )}

            <div className={`relative`}>
                <IntlTelInput
                    // @ts-ignore
                    ref={ref}
                    defaultCountry="tz"
                    preferredCountries={[]}
                    autoComplete="off"
                    placeholder="Type something"
                    autoCorrect="off"
                    value={phoneValue}
                    onSelectFlag={(_currentNumber, selectedCountryData) => {
                        setCountryCode(selectedCountryData?.dialCode ?? "tz");
                    }}
                    containerClassName="intl-tel-input w-full"
                    onPhoneNumberChange={(
                        isValid: boolean,
                        value: string,
                        country: any,
                        phoneNumber: any
                    ) => handlePhoneNumberChange(isValid, value, country, phoneNumber)}
                    inputClassName={twMerge(
                        defaultStyles,
                        "disabled:text-opacity-55",
                        hasError
                            ? "border-rose-500 focus:ring-rose-500/30 focus:border-rose-500"
                            : "border-gray-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary focus:ring-primary/40",
                        className
                    )}
                    {...rest}
                />

                {hasError ? (
                    <ExclamationCircleIcon
                        className={
                            "absolute right-2 pointer-events-none top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                        }
                    />
                ) : null}
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

export default PhoneInput;
