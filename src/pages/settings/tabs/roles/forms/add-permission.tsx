import { useLocation, useParams } from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import generateFormField, { IFormField } from "@/utils/generate-form-field.tsx";
import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import { capitalizeFirstLetter } from "@/utils";
import FullDivider from "@/components/divider/FullDivider.tsx";
import Pending from "@/components/loaders/pending/pending.tsx";
import { useGetPermissions } from "@/pages/settings/tabs/permissions/permission-queries.ts";
import {useAddRolePermissions} from "@/pages/settings/tabs/roles/role-queries.ts";

const AddPermissionForm = () => {
    const { action, roleId: routeRoleId } = useParams();
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/settings/roles/details/${routeRoleId}`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });


    const { data: permissionsData } = useGetPermissions(1, 1000, "");
    const permissionsList = permissionsData?.data?.map((item) => ({
        label: item.name,
        value: item.id,
    })) || [];

    // Validation schema for AddPermissionForm
    const permissionSchema = Yup.object({
        permissionIds: Yup.array()
            .of(
                Yup.object().shape({
                    label: Yup.string(),
                    value: Yup.string().required("Permission ID is required"),
                })
            )
            .min(1, "At least one permission is required")
            .required("Permission IDs are required"),
    });

    type PermissionFormFieldsValues = Yup.InferType<typeof permissionSchema>;

    const {
        formState: { errors },
        register,
        control,
        handleSubmit,
    } = useForm<PermissionFormFieldsValues>({
        resolver: yupResolver(permissionSchema),
        defaultValues: {
            permissionIds: routeState?.permissionIds ?? [],
        },
    });

    // Form fields for AddPermissionForm
    const permissionFormFields: IFormField[] = [
        {
            register,
            control,
            name: "permissionIds",
            label: "Permission IDs",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "Select permissions",
            type: "combobox", // Assuming multiselect is supported by your form generator
            options: permissionsList,
            multiple:true,
            displayName: "label",
            hasError: !!errors.permissionIds?.message,
            showErrorMessage: !!errors.permissionIds?.message,
            errorMessage: errors.permissionIds?.message,
        },
    ];

    const onSubmit = (formValues: PermissionFormFieldsValues) => {
        const permissionIds = formValues.permissionIds.map((item) => item.value);
        addRolePermissionsMutation({
            roleId: routeRoleId ?? "",
            permissionIds,
        });
    };

    const { mutate: addRolePermissionsMutation, isPending } = useAddRolePermissions({ onSuccess: closeModal });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} Permissions`}
                    onClose={closeModal}
                />
                <div className={"full px-5 grid grid-cols-2 gap-4 py-4 z-50 h-60"}>
                    {permissionFormFields.map((field) => generateFormField(field))}
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

export default AddPermissionForm;