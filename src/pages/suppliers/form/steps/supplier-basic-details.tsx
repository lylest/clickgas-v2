import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import {getValueFromLocalStorage, localStorageKeys, saveValueToLocalStorage} from "@/utils/local-storage.ts";
import {useNavigate, useParams} from "react-router-dom";
import ChipIcon from "@/components/general/ChipIcon.tsx";
import {LucideUser} from "lucide-react";
import FormAction from "@/pages/suppliers/form/form-action.tsx";
import {cleanPhoneNumber} from "@/utils/text-utils.ts"; // Changed icon to represent supplier

const BasicSupplierDetails = () => {
    const {action} = useParams();
    const navigate = useNavigate();
    const defaultValues = getValueFromLocalStorage(localStorageKeys.supplier_form?.BASIC_SUPPLIER_DETAILS);

    const supplierBasicSchema = Yup.object({
        firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name cannot exceed 50 characters"),
        middleName: Yup.string()
            .notRequired()
            .nullable(),
        lastName: Yup.string()
            .required("Last name is required")
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name cannot exceed 50 characters"),
        phone: Yup.string()
            .required("Phone number is required")
            .min(9, "Phone number must be at least 9 characters")
            .max(12, "Phone number cannot exceed 12 characters")
    });

    type SupplierBasicFormFieldsValues = Yup.InferType<typeof supplierBasicSchema>;

    const {
        formState: {errors},
        register,
        control,
        setValue,
        handleSubmit,
    } = useForm<SupplierBasicFormFieldsValues>({
        resolver: yupResolver(supplierBasicSchema),
        defaultValues: {...defaultValues},
    });

    const supplierBasicFormFields: IFormField[] = [
        {
            register,
            control,
            name: "firstName",
            label: "First Name",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "e.g., Isack",
            type: "text",
            hasError: !!errors.firstName?.message,
            showErrorMessage: !!errors.firstName?.message,
            errorMessage: errors.firstName?.message,
        },
        {
            register,
            control,
            name: "middleName",
            label: "Middle Name",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "e.g., Doe",
            type: "text",
            optional:true,
            hasError: !!errors.lastName?.message,
            showErrorMessage: !!errors.lastName?.message,
            errorMessage: errors.lastName?.message,
        },
        {
            register,
            control,
            name: "lastName",
            label: "Last Name",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "e.g., Doe",
            type: "text",
            hasError: !!errors.lastName?.message,
            showErrorMessage: !!errors.lastName?.message,
            errorMessage: errors.lastName?.message,
        },
        {
            setValue,
            register,
            control,
            name: "phone",
            label: "Phone",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "766298542",
            type: "tel",
            defaultValue: defaultValues?.phone?.slice(3),
            hasError: !!errors.phone?.message,
            showErrorMessage: !!errors.phone?.message,
            errorMessage: errors.phone?.message,
        },
    ];

    const onSubmit = (formValues: SupplierBasicFormFieldsValues) => {
        const cleanedNumber = cleanPhoneNumber(formValues.phone)
        saveValueToLocalStorage(localStorageKeys.supplier_form?.BASIC_SUPPLIER_DETAILS,
            {
                ...formValues,
                phone: cleanedNumber
            });
        navigate(`/suppliers/form/${action}/supplier-location-details`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full"}>
            <div className={"flex place-items-center gap-2 px-4 py-3"}>
                <ChipIcon Icon={<LucideUser className={"h-5 w-5 text-slate-500"}/>}/>
                <h1 className={"text-lg font-medium text-slate-800"}>Basic Details</h1>
            </div>
            <div className={"full px-5 grid grid-cols-2 gap-4 py-6 overflow-auto"}>
                {supplierBasicFormFields.map((field) => generateFormField(field))}
            </div>
            <br/>
            <FormAction currentPage={1} stepsCount={3}/>
        </form>
    );
};

export default BasicSupplierDetails;