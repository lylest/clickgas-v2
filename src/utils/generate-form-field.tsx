import { Control, UseFormSetValue } from "react-hook-form";
import {ChangeEvent, ReactNode} from "react";
import { twMerge } from "tailwind-merge";
import { SelectInput, Textarea, TextInput } from "@/components/form-control";
import CurrencyInput from "@/components/form-control/input/currency_input";
import ComboboxInput from "@/components/form-control/combobox";
import PhoneInput from "@/components/form-control/input/phone-input.tsx";
import PasswordInput from "@/components/form-control/input/password-input.tsx";


type TFieldTypes =
    | "article"
    | "currency"
    | "date"
    | "datetime-local"
    | "text"
    | "time"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "color"
    | "description"
    | "checkbox"
    | "file"
    | "combobox";

export interface IFormField {
    name: string;
    disabled?: boolean;
    placeholder?: string;
    labelClassName?: string;
    defaultChecked?: boolean;
    showCountLimit?: boolean;
    countMaxLimit?: number,
    optional?: boolean;
    emptyDataMessage?: string;
    isPassword?: boolean;
    id?: string;
    label: ReactNode;
    type?: TFieldTypes;
    isDate?: boolean;
    defaultValue?: any;
    reset?: boolean;
    hasError?: boolean;
    showErrorMessage?: boolean;
    errorMessage?: any;
    className?: string;
    options?: Array<any>;
    loading?: boolean;
    multiple?: boolean;
    control?: Control<any>;
    displayName?: string;
    register?: any;
    wrapperClass?: string;
    unity?: string;
    rows?: number;
    minDate?:string;
    maxDate?:string;
    max?: number | string | null;
    min?: number | string | null;
    setValue?: UseFormSetValue<any>;
}

const generateField = (field: IFormField,onChangeHandler?: (name: string, value: string) => void) => {
    const defaultLabelClassName = "text-gray-700 font-medium";
    const defaultClassName = "lg:py-2 border-[1px] shadow-none  text-gray-700";

    const { register, className, labelClassName, name, ...formProps } = field;

    const fieldClassName = {
        className: twMerge(defaultClassName, className),
        labelClassName: twMerge(defaultLabelClassName, labelClassName),
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (onChangeHandler) {
            onChangeHandler(name, e.target.value)
        }
    };

    if (formProps?.type === "combobox") {

        return (
            // @ts-ignore
            <ComboboxInput
                key={name}
                name={name}
                {...formProps}
                {...fieldClassName}
            />
        );
    } else if (formProps?.options) {
        return (
            <SelectInput
                key={name}
                {...(register ? register(name) : {})}
                {...formProps}
                {...fieldClassName}
                onChange={handleChange}
            />
        );
    } else if (formProps.type === "description" || name === "description") {
        return (
            <Textarea
                key={name}
                {...(register ? register(name) : {})}
                {...formProps}
                {...fieldClassName}
                onChange={handleChange}
            />
        );
    }
    else if (formProps.type === "currency") {
        return (
            <CurrencyInput
                key={name}
                {...(register ? register(name) : {})}
                {...formProps}
                {...fieldClassName}
                onInputChange={handleChange}
            />
        );
    }

    else  if(formProps.type === "tel") {
        return (
            <PhoneInput
             key={name}
             {...(register ? register(name) : {})}
             {...formProps}
             {...fieldClassName}
             onInputChange={handleChange}
            />
        )
    }
    else if(formProps.type === "password") {
        return (
            <PasswordInput
                key={name}
                {...(register ? register(name) : {})}
                {...formProps}
                {...fieldClassName}
                min={formProps.min}
                onChange={handleChange}
            />
        )
    }
    else {
        return (
            <TextInput
                key={name}
                {...(register ? register(name) : {})}
                {...formProps}
                {...fieldClassName}
                min={formProps.min}
                onChange={handleChange}
            />
        );
    }
};

export default generateField;
