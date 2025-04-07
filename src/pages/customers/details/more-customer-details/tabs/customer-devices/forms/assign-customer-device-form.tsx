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
import {useAddCustomerDevice, useGetDevices} from "@/pages/devices/device-queries.ts";
import { useGetPrices } from "@/pages/prices/price-queries.ts"; // Assuming this exists
import { permissions } from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";

const AssignCustomerDeviceForm = () => {
    const { customerId } = useParams();
    const { state: routeState } = useLocation();
    const { state } = useGlobalContextHook()
    const { currentUser } = state
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/customers/more-details/${customerId}`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Fetch data for dropdowns
    const { data: devicesData } = useGetDevices(1, 1000, "");
    const devicesList = devicesData?.data?.map((device) => ({
        label: device.serialNumber,
        value: device.id,
    })) || [];


    const { data: pricesData } = useGetPrices(1, 1000, "");
    const pricesList = pricesData?.data?.map((price) => ({
        label: `${price.gasBrand} - ${price.weight}${price.weightUnit} (${price.sellingPrice} ${price.currency})`,
        value: price.id,
    })) || [];

    // Validation schema for AssignCustomerDeviceForm
    const customerDeviceSchema = Yup.object({
        deviceId: Yup.object().shape({
            label: Yup.string(),
            value: Yup.string().required("Device ID is required"),
        }),
        priceId: Yup.object().shape({
            label: Yup.string(),
            value: Yup.string().required("Device ID is required"),
        })
    });

    type CustomerDeviceFormFieldsValues = Yup.InferType<typeof customerDeviceSchema>;

    const {
        formState: { errors },
        register,
        control,
        handleSubmit,
    } = useForm<CustomerDeviceFormFieldsValues>({
        resolver: yupResolver(customerDeviceSchema),
        defaultValues: {
            deviceId: routeState?.deviceId ?? "",
            priceId: routeState?.priceId ?? "",
        },
    });

    // Form fields for AssignCustomerDeviceForm
    const customerDeviceFormFields: IFormField[] = [
        {
            register,
            control,
            name: "deviceId",
            label: "Device",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "Select a device",
            type: "combobox",
            options: devicesList,
            multiple: false,
            displayName: "label",
            hasError: !!errors.deviceId?.message,
            showErrorMessage: !!errors.deviceId?.message,
            errorMessage: errors.deviceId?.message,
        },
        {
            register,
            control,
            name: "priceId",
            label: "Price",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "Select a price",
            type: "combobox",
            options: pricesList,
            multiple: false,
            displayName: "label",
            hasError: !!errors.priceId?.message,
            showErrorMessage: !!errors.priceId?.message,
            errorMessage: errors.priceId?.message,
        },
    ];

    const onSubmit = (formValues: CustomerDeviceFormFieldsValues) => {
        assignDeviceMutation({
            customerId: customerId ?? "",
            supplierId: currentUser?.id ?? "",
            deviceId: formValues.deviceId.value,
            priceId: formValues.priceId.value,
        });
        console.log(currentUser,"user")
    };

    const { mutate: assignDeviceMutation, isPending } = useAddCustomerDevice({
        onSuccess: closeModal
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <Can permission={permissions.ADD_CUSTOMER_DEVICE}> {/* Assuming this permission exists */}
                <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                    <SlideOverHeader
                        title="Assign Device to Customer"
                        onClose={closeModal}
                    />
                    <div className={"full px-5 grid grid-cols-2 gap-4 py-4"}>
                        {customerDeviceFormFields.map((field) => generateFormField(field))}
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
            </Can>
        </Modal>
    );
};

export default AssignCustomerDeviceForm;