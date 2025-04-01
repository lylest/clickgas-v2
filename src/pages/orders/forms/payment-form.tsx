import { useLocation, useParams } from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField, { IFormField } from "@/utils/generate-form-field.tsx";
import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import FullDivider from "@/components/divider/FullDivider.tsx";
import Pending from "@/components/loaders/pending/pending.tsx";
import {useAddPayment} from "@/pages/payments/payment-queries.ts";
import {useGetOrderDetails} from "@/pages/orders/order-queries.ts";


const PaymentForm = () => {
    const { orderId } = useParams();
    const { data: order } = useGetOrderDetails(orderId!, { enabled: !!orderId });
    const { state: routeState } = useLocation();
    const baseUrl = `/orders/details/${orderId}`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Validation schema for payment form
    const paymentSchema = Yup.object({
        amount: Yup.string()
            .required("Amount  is required")
            .transform((value) => {
                if (typeof value === "string") {
                    return value.replace(/[^0-9.-]/g, "").trim();
                }
                return value;
            })
            .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number (e.g., 300000 or 300000.00)")
            .min(0, "Amount cannot be negative")
    });

    type PaymentFormFieldsValues = Yup.InferType<typeof paymentSchema>;

    const {
        formState: { errors },
        register,
        control,
        handleSubmit,
    } = useForm<PaymentFormFieldsValues>({
        resolver: yupResolver(paymentSchema),
        defaultValues: {
            ...routeState,
        },
    });

    // Form fields for payment form
    const paymentFormFields: IFormField[] = [
        {
            register,
            control,
            name: "amount",
            label: "Amount",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-2",
            placeholder: "e.g., 75.00",
            type: "currency",
            hasError: !!errors.amount?.message,
            showErrorMessage: !!errors.amount?.message,
            errorMessage: errors.amount?.message,
        },
    ];

    const onSubmit = (formValues: PaymentFormFieldsValues) => {
        addPaymentMutation({
            amount: parseInt(formValues.amount),
            orderId: orderId ?? "",
            customerId: order?.data?.customerId ?? "",
            supplierId: order?.data?.supplierId ?? "",
            totalAmount: order?.data?.amount ?? 0,
            paymentMethod: "cash"
        });
    };

    const { mutate: addPaymentMutation, isPending } = useAddPayment({ onSuccess: closeModal });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                <SlideOverHeader
                    title={`Add Payment`}
                    onClose={closeModal}
                />
                <div className={"full px-5 grid grid-cols-1 gap-4 py-4"}>
                    {paymentFormFields.map((field) => generateFormField(field))}
                </div>
                <FullDivider />
                <div className={"flex justify-end px-5 gap-4 py-4 bg-gray-50 dark:bg-neutral-700/40"}>
                    <button type="button" onClick={() => closeModal()} className="py-2 px-3 outlined-button">
                        Cancel
                    </button>
                    <button type="submit" className="py-2 px-3 small-button">
                        <Pending isLoading={isPending} />
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default PaymentForm;