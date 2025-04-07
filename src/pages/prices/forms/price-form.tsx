import {useLocation, useParams} from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import FullDivider from "@/components/divider/FullDivider.tsx";
import Pending from "@/components/loaders/pending/pending.tsx";
import {useAddPrice, useUpdatePrice} from "@/pages/prices/price-queries.ts";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";
import {capitalizeFirstLetter} from "@/utils";

const PriceForm = () => {
    const {state: routeState} = useLocation();
    const {action} = useParams();
    const {state} = useGlobalContextHook()
    const {currentUser} = state
    const baseUrl = `/prices`
    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Validation schema for price form
    const priceSchema = Yup.object({
        gasBrand: Yup.string()
            .required("Gas brand is required")
            .min(2, "Gas brand must be at least 2 characters"),
        weight: Yup.number()
            .required("Weight is required")
            .min(0, "Weight cannot be negative")
            .typeError("Weight must be a number"),
        buyingPrice: Yup.string()
            .required("Buying price  is required")
            .transform((value) => {
                if (typeof value === "string") {
                    return value.replace(/[^0-9.-]/g, "").trim();
                }
                return value;
            })
            .matches(/^\d+(\.\d{1,2})?$/, "Buying price must be a valid number (e.g., 300000 or 300000.00)")
            .min(0, "Buying price cannot be negative"),
        sellingPrice: Yup.string()
            .required("Selling price  is required")
            .transform((value) => {
                if (typeof value === "string") {
                    return value.replace(/[^0-9.-]/g, "").trim();
                }
                return value;
            })
            .matches(/^\d+(\.\d{1,2})?$/, "Selling price must be a valid number (e.g., 300000 or 300000.00)")
            .min(0, "Selling price cannot be negative"),
        notes: Yup.string()
            .max(500, "Notes cannot exceed 500 characters")
    });

    type PriceFormFieldsValues = Yup.InferType<typeof priceSchema>;

    const {
        formState: {errors},
        register,
        control,
        handleSubmit,
    } = useForm<PriceFormFieldsValues>({
        resolver: yupResolver(priceSchema),
        defaultValues: {
            ...routeState,
        },
    });

    // Form fields for price form
    const priceFormFields: IFormField[] = [
        {
            register,
            control,
            name: "gasBrand",
            label: "Gas Brand",
            wrapperClass: "col-span-3",
            className: "resize-none",
            placeholder: "e.g., Total",
            type: "text",
            hasError: !!errors.gasBrand?.message,
            showErrorMessage: !!errors.gasBrand?.message,
            errorMessage: errors.gasBrand?.message,
        },
        {
            register,
            control,
            name: "weight",
            label: "Weight (kg)",
            wrapperClass: "col-span-3",
            className: "resize-none",
            placeholder: "e.g., 13",
            type: "text",
            hasError: !!errors.weight?.message,
            showErrorMessage: !!errors.weight?.message,
            errorMessage: errors.weight?.message,
        },
        {
            register,
            control,
            name: "buyingPrice",
            label: "Buying Price",
            wrapperClass: "col-span-3",
            className: "resize-none",
            placeholder: "e.g., 5000",
            type: "currency",
            hasError: !!errors.buyingPrice?.message,
            showErrorMessage: !!errors.buyingPrice?.message,
            errorMessage: errors.buyingPrice?.message,
        },
        {
            register,
            control,
            name: "sellingPrice",
            label: "Selling Price",
            wrapperClass: "col-span-3",
            className: "resize-none",
            placeholder: "e.g., 6000",
            type: "currency",
            hasError: !!errors.sellingPrice?.message,
            showErrorMessage: !!errors.sellingPrice?.message,
            errorMessage: errors.sellingPrice?.message,
        },
        {
            register,
            control,
            name: "notes",
            label: "Notes",
            wrapperClass: "col-span-3",
            className: "resize-none h-24",
            placeholder: "Additional notes...",
            type: "description",
            hasError: !!errors.notes?.message,
            showErrorMessage: !!errors.notes?.message,
            errorMessage: errors.notes?.message,
        },
    ];

    const onSubmit = (formValues: PriceFormFieldsValues) => {
        const payload = {
            supplierId: currentUser?.id ?? "",
            gasBrand: formValues.gasBrand,
            weight: formValues.weight,
            buyingPrice: parseInt(formValues.buyingPrice),
            sellingPrice: parseInt(formValues.sellingPrice),
            notes: formValues.notes || "",
        }

        if (action === "add") {
            addPriceMutation(payload);
        } else {
            updatePriceMutation({
                priceId: routeState?.id ?? "",
                data: payload,
            })
        }
    };

    const {mutate: addPriceMutation, isPending} = useAddPrice({onSuccess: closeModal});
    const {mutate: updatePriceMutation, isPending: isUpdating} = useUpdatePrice({onSuccess: closeModal});

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} price`}
                    onClose={closeModal}
                />
                <div className={"full px-5 grid grid-cols-2 gap-4 py-4"}>
                    {priceFormFields.map((field) => generateFormField(field))}
                </div>
                <FullDivider/>
                <div className={"flex justify-end px-5 gap-4 py-4 bg-gray-50 dark:bg-neutral-700/40"}>
                    <button type="button" onClick={() => closeModal()} className="py-2 px-3 outlined-button">
                        Cancel
                    </button>
                    <button type="submit" className="py-2 px-3 small-button">
                        <Pending isLoading={isPending || isUpdating}/>
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default PriceForm;