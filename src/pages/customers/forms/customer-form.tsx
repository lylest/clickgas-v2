import { useLocation, useParams } from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField, { IFormField } from "@/utils/generate-form-field.tsx";
import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import { capitalizeFirstLetter } from "@/utils";
import Pending from "@/components/loaders/pending/pending.tsx";
import {
    useAddCustomer,
    useGetCustomers,
    useUpdateCustomer
} from "@/pages/customers/customer-queries.ts";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import Pagination from "@/components/pagination.tsx";
import { Search } from "lucide-react";
import CustomerCard from "@/components/cards/customer-card.tsx";
import Input from "@/components/form-control/input";

const CustomerForm = () => {
    const { action } = useParams();
    const [keyword, setKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const { state } = useContext(GlobalContext);
    const { activeShop } = state;
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/customers`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    const {
        data: customers,
        /*isLoading*/
    } = useGetCustomers(activeShop?.id ?? "", pageNumber, pageSize, keyword, {
        enabled: !!activeShop?.id,
    });

    const customerSchema = Yup.object({
        userName: Yup.string()
            .required("Username is required")
            .min(2, "Username must be at least 2 characters")
            .max(50, "Username cannot exceed 50 characters"),

        email: Yup.string()
            .email("Email must be a valid email address")
            .nullable()
            .notRequired(),
        phone: Yup.string()
            .required("Phone number is required")
            .min(9, "Phone number must be at least 9 characters")
            .max(12, "Phone number cannot exceed 12 characters"),

        address: Yup.string()
            .required("Address is required"),
    });

    type CustomerFormFieldsValues = Yup.InferType<typeof customerSchema>;

    const {
        formState: { errors },
        register,
        control,
        setValue,
        handleSubmit,
        watch,
    } = useForm<CustomerFormFieldsValues>({
        resolver: yupResolver(customerSchema),
        defaultValues: {
            ...routeState,
        },
    });

    // Watch for changes in phone and username to trigger search
    const watchedPhone = watch("phone");
    const watchedUserName = watch("userName");


    useEffect(() => {
        let searchTimeout: NodeJS.Timeout;
        console.log(watchedUserName,"watche username");
        if (watchedPhone?.length >= 2 || watchedUserName) {
            setIsSearching(true);
            searchTimeout = setTimeout(() => {
                const searchTerm = watchedPhone || watchedUserName;
                setKeyword(searchTerm);
            }, 100);
        } else {
            setIsSearching(false);
            setKeyword("");
        }

        return () => {
            if (searchTimeout) clearTimeout(searchTimeout);
        };
    }, [watchedPhone, watchedUserName]);

    useEffect(() => {
        if (customers?.data) {
            setIsSearching(false);
        }
    }, [customers]);


    // Updated form fields with icons
    const customerFormFields: IFormField[] = [

        {
            register,
            control,
            setValue,
            name: "phone",
            label: "Phone Number",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-2",
            placeholder: "766298542",
            type: "tel",
            defaultValue: routeState?.phone?.slice(3),
            hasError: !!errors.phone?.message,
            showErrorMessage: !!errors.phone?.message,
            errorMessage: errors.phone?.message,
        },
        {
            register,
            control,
            name: "address",
            label: "Address",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-2",
            placeholder: "e.g., Kimara,Temboni, Dar-es-salaam",
            type: "text",
            hasError: !!errors.address?.message,
            showErrorMessage: !!errors.address?.message,
            errorMessage: errors.address?.message,
        },
        {
            register,
            control,
            name: "email",
            label: "Email",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-2",
            placeholder: "john.doe@example.com",
            type: "email",
            optional:true,
            hasError: !!errors.email?.message,
            showErrorMessage: !!errors.email?.message,
            errorMessage: errors.email?.message,
        }
    ];

    function cleanNumber(number:string) {
        let numberStr = number.toString();
        if (numberStr.startsWith("2550")) {
            numberStr = numberStr.replace(/^2550+/, "255");
        }

        return numberStr;
    }
    const onSubmit = (formValues: CustomerFormFieldsValues) => {
        const cleanedNumber = cleanNumber(formValues.phone)

        if (action === "add") {
            addCustomerMutation({
                ...formValues,
                phone:cleanedNumber,
                email:formValues?.email || null,
                authMethod: "email",
                shopId: activeShop?.id ?? "",
                password:formValues.phone
            });
        } else {
            updateCustomerMutation({
                data: {
                    ...formValues,
                    phone:cleanedNumber,
                    email:formValues?.email || null,
                    authMethod: "email",
                    shopId: activeShop?.id ?? "",
                    password:formValues.phone
                },
                customerId: routeState?.id ?? "",
            });
        }
    };

    const { mutate: addCustomerMutation, isPending } = useAddCustomer({ onSuccess: closeModal });
    const { mutate: updateCustomerMutation, isPending: isUpdating } = useUpdateCustomer({
        onSuccess: closeModal,
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full  lg:w-[70rem] modal-container flex flex-col"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} Customer`}
                    onClose={closeModal}
                />
                <div className="flex w-full h-[80vh] overflow-auto">
                    {/* Form Section - Left Side */}
                    <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                        <div className="flex-grow px-6 py-5">
                            <div className="grid grid-cols-1 gap-5">
                                <div className="mb-5">
                                    <Input
                                        {...register("userName")}
                                        label="Name"
                                        wrapperClass="col-span-1"
                                        className="resize-none col-span-2"
                                        placeholder="Isaka"
                                        type="text"
                                        hasError={!!errors.userName?.message}
                                        showErrorMessage={!!errors.userName?.message}
                                        errorMessage={errors.userName?.message}
                                    />
                                </div>
                                {customerFormFields.map((field, index) => (
                                    <div key={index} className="relative">
                                        {generateFormField({
                                            ...field,
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action buttons - Moved to bottom of left side */}
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
                                   <Pending isLoading={isPending || isUpdating} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Results Section - Right Side */}
                    <div className="w-1/2 bg-gray-50 dark:bg-gray-800/50 flex flex-col">
                        <div className="flex-grow p-6 overflow-hidden flex flex-col">
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Matching Customers
                                    </h3>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200">
                                        {customers?.data?.length || 0} found
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {isSearching ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Searching for matching customers...
                                        </span>
                                    ) : watchedPhone || watchedUserName ? (
                                        <p> Select a customer from the list or continue with new customer </p>
                                    ) : (
                                        "Start typing username or phone to search"
                                    )}
                                </p>
                            </div>

                            <div className="space-y-3 overflow-y-auto flex-grow pr-2 custom-scrollbar">
                                {customers?.data?.map((customer) => (
                                    <CustomerCard  query={keyword} key={customer.id} customer={customer} />
                                ))}

                                {(!customers?.data || customers.data.length === 0) && (watchedPhone || watchedUserName) && !isSearching && (
                                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                        <Search className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                        <p className="text-gray-500 dark:text-gray-400">No matching customers found</p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                            Continue filling the form to add a new customer
                                        </p>
                                    </div>
                                )}

                                {!watchedPhone && !watchedUserName && (
                                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                        <Search className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                        <p className="text-gray-500 dark:text-gray-400">Type username or phone to find existing customers</p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                            This helps prevent duplicate customer entries
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pagination - Moved to bottom of right side */}
                        <div className="px-6 py-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <Pagination
                                showPageSizeSelector={true}
                                showPagesList={true}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                page={pageNumber}
                                setPage={setPageNumber}
                                totalPages={customers?.metadata?.totalPages}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CustomerForm;