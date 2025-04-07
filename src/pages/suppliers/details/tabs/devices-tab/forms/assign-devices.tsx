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
import {useAssignSupplierDevices, useGetDevices} from "@/pages/devices/device-queries.ts";
import { permissions } from "@/pages/permissions-manager/check-permission.ts";
import Can from "@/pages/permissions-manager/can.tsx";

const AssignDevices = () => {
    const { supplierId } = useParams();
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/suppliers/details/${supplierId}`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Fetch all devices
    const { data: devicesData } = useGetDevices(1, 1000, "");
    const devicesList = devicesData?.data?.map((device) => ({
        label: device.serialNumber,
        value: device.id,
    })) || [];

    // Validation schema for AssignDevices
    const deviceSchema = Yup.object({
        deviceIds: Yup.array()
            .of(
                Yup.object().shape({
                    label: Yup.string(),
                    value: Yup.string().required("Device ID is required"),
                })
            )
            .min(1, "At least one device is required")
            .required("Device IDs are required"),
    });

    type DeviceFormFieldsValues = Yup.InferType<typeof deviceSchema>;

    const {
        formState: { errors },
        register,
        control,
        handleSubmit,
    } = useForm<DeviceFormFieldsValues>({
        resolver: yupResolver(deviceSchema),
        defaultValues: {
            deviceIds: routeState?.deviceIds ?? [],
        },
    });

    // Form fields for AssignDevices
    const deviceFormFields: IFormField[] = [
        {
            register,
            control,
            name: "deviceIds",
            label: "Devices",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "Select devices to assign",
            type: "combobox",
            options: devicesList,
            multiple: true,
            displayName: "label",
            hasError: !!errors.deviceIds?.message,
            showErrorMessage: !!errors.deviceIds?.message,
            errorMessage: errors.deviceIds?.message,
        },
    ];

    const onSubmit = (formValues: DeviceFormFieldsValues) => {
        const deviceIds = formValues.deviceIds.map((item) => item.value);
        assignDevicesMutation({
            devices: deviceIds.map(id => ({
                supplierId: supplierId ?? "",
                deviceId: id
            })),
        });
    };

    const { mutate: assignDevicesMutation, isPending } = useAssignSupplierDevices({
        onSuccess: closeModal
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <Can permission={permissions.ADD_SUPPLIER_DEVICE}> {/* Assuming this permission exists */}
                <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                    <SlideOverHeader
                        title="Assign Devices to Supplier"
                        onClose={closeModal}
                    />
                    <div className={"full px-5 grid grid-cols-2 gap-4 py-4 z-50 h-60"}>
                        {deviceFormFields.map((field) => generateFormField(field))}
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

export default AssignDevices;