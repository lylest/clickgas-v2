import {useLocation, useParams} from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import {capitalizeFirstLetter} from "@/utils";
import Pending from "@/components/loaders/pending/pending.tsx";
import {useAddCustomer, useUpdateCustomer} from "@/pages/customers/customer-queries.ts";
import {randomId} from "@/utils/random-id.ts";
import {cleanPhoneNumber} from "@/utils/text-utils.ts";

const CustomerForm = () => {
    const {action} = useParams();
    const {state: routeState} = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/customers`;
    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const customerSchema = Yup.object({
        firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name cannot exceed 50 characters"),
        middleName: Yup.string()
            .nullable()
            .notRequired()
            .max(50, "Middle name cannot exceed 50 characters"),
        lastName: Yup.string()
            .required("Last name is required")
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name cannot exceed 50 characters"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        phone: Yup.string()
            .required("Phone number is required")
            .min(9, "Phone number must be at least 9 characters")
            .max(12, "Phone number cannot exceed 12 characters"),
        country: Yup.string()
            .required("Country is required")
            .min(2, "Country must be at least 2 characters")
            .max(50, "Country cannot exceed 50 characters"),
        region: Yup.string()
            .required("Region is required")
            .min(2, "Region must be at least 2 characters")
            .max(50, "Region cannot exceed 50 characters"),
        address: Yup.string()
            .required("Address is required")
            .min(5, "Address must be at least 5 characters")
            .max(200, "Address cannot exceed 200 characters"),
        houseNo: Yup.string()
            .nullable()
            .notRequired()
            .max(50, "House number cannot exceed 50 characters")
    });

    type CustomerFormFieldsValues = Yup.InferType<typeof customerSchema>;

    const {
        formState: {errors},
        register,
        setValue,
        control,
        handleSubmit,
    } = useForm<CustomerFormFieldsValues>({
        resolver: yupResolver(customerSchema),
        defaultValues: {
            ...routeState,
        },
    });

    const customerFormFields: IFormField[] = [
        {
            register,
            control,
            name: "firstName",
            label: "First Name",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., Zawadi",
            type: "text",
            hasError: !!errors.firstName?.message,
            showErrorMessage: !!errors.firstName?.message,
            errorMessage: errors.firstName?.message,
        },
        {
            register,
            control,
            name: "lastName",
            label: "Last Name",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., Mwangi",
            type: "text",
            hasError: !!errors.lastName?.message,
            showErrorMessage: !!errors.lastName?.message,
            errorMessage: errors.lastName?.message,
        },
        {
            register,
            control,
            name: "address",
            label: "Address",
            wrapperClass: "col-span-2",
            className: "resize-none",
            placeholder: "e.g., 101 Ngong Road",
            type: "text",
            hasError: !!errors.address?.message,
            showErrorMessage: !!errors.address?.message,
            errorMessage: errors.address?.message,
        },
        {
            register,
            control,
            name: "middleName",
            label: "Middle Name",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., Optional",
            type: "text",
            optional: true,
            hasError: !!errors.middleName?.message,
            showErrorMessage: !!errors.middleName?.message,
            errorMessage: errors.middleName?.message,
        },
        {
            register,
            control,
            name: "houseNo",
            label: "House No",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., Apartment 12B",
            type: "text",
            optional: true,
            hasError: !!errors.houseNo?.message,
            showErrorMessage: !!errors.houseNo?.message,
            errorMessage: errors.houseNo?.message,
        },
        {
            register,
            control,
            name: "country",
            label: "Country",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., Kenya",
            type: "text",
            hasError: !!errors.country?.message,
            showErrorMessage: !!errors.country?.message,
            errorMessage: errors.country?.message,
        },
        {
            register,
            control,
            name: "region",
            label: "Region",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., Nairobi",
            type: "text",
            hasError: !!errors.region?.message,
            showErrorMessage: !!errors.region?.message,
            errorMessage: errors.region?.message,
        },
        {
            register,
            control,
            setValue,
            name: "phone",
            label: "Phone",
            wrapperClass: "col-span-1",
            className: "resize-none",
            placeholder: "e.g., +254723456789",
            type: "tel",
            defaultValue: routeState?.phone?.slice(3),
            hasError: !!errors.phone?.message,
            showErrorMessage: !!errors.phone?.message,
            errorMessage: errors.phone?.message,
        },
        {
            register,
            control,
            name: "email",
            label: "Email",
            wrapperClass: "col-span-3",
            className: "resize-none",
            placeholder: "e.g., zawadi.mwangi@example.com",
            type: "email",
            hasError: !!errors.email?.message,
            showErrorMessage: !!errors.email?.message,
            errorMessage: errors.email?.message,
        },
    ];

    const onSubmit = (formValues: CustomerFormFieldsValues) => {
        const password = randomId();
        const cleanedNumber = cleanPhoneNumber(formValues.phone)

        if (action === "add") {
            addCustomerMutation({
                ...formValues,
                middleName: formValues?.middleName ?? null,
                houseNo: formValues?.houseNo ?? null,
                password: password,
                phone:cleanedNumber,
                tmpPassword: password
            });
        } else {
            updateCustomerMutation({
                data: {
                    ...formValues,
                    phone:cleanedNumber,
                    middleName: formValues?.middleName ?? null,
                    houseNo: formValues?.houseNo ?? null,
                },
                customerId: routeState?.id ?? "",
            });
        }
    };

    const {mutate: addCustomerMutation, isPending} = useAddCustomer({onSuccess: closeModal});
    const {mutate: updateCustomerMutation, isPending: isUpdating} = useUpdateCustomer({
        onSuccess: closeModal,
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full max-w-2xl modal-container flex flex-col"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} Customer`}
                    onClose={closeModal}
                />
                <div className="flex-grow px-6 py-5">
                    <div className="grid grid-cols-2 gap-5">
                        {customerFormFields.map((field) => generateFormField(field))}
                    </div>
                </div>
                <div
                    className="px-6 py-4 bg-gray-50 dark:bg-neutral-700/40 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={() => closeModal()}
                            className="py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
                        >
                            <Pending isLoading={isPending || isUpdating}/>
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CustomerForm;