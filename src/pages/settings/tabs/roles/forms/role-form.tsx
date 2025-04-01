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
import {useAddRole, useUpdateRole} from "@/pages/settings/tabs/roles/role-queries.ts";

const RoleForm = () => {
    const { action } = useParams();
    const { state: routeState } = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/settings/roles`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Validation schema for RoleForm
    const roleSchema = Yup.object({
        name: Yup.string()
            .required("Role name is required")
            .min(2, "Role name must be at least 2 characters")
            .max(50, "Role name cannot exceed 50 characters"),

        description: Yup.string()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description cannot exceed 500 characters"),
    });

    type RoleFormFieldsValues = Yup.InferType<typeof roleSchema>;

    const {
        formState: { errors },
        register,
        control,
        handleSubmit,
    } = useForm<RoleFormFieldsValues>({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            ...routeState,
        },
    });

    // Form fields for RoleForm
    const roleFormFields: IFormField[] = [
        {
            register,
            control,
            name: "name",
            label: "Role Name",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "e.g., Admin",
            type: "text",
            hasError: !!errors.name?.message,
            showErrorMessage: !!errors.name?.message,
            errorMessage: errors.name?.message,
        },
        {
            register,
            control,
            name: "description",
            label: "Description",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "e.g., Administrator role with full access",
            type: "description",
            rows: 4,
            hasError: !!errors.description?.message,
            showErrorMessage: !!errors.description?.message,
            errorMessage: errors.description?.message,
        },
    ];

    const onSubmit = (formValues: RoleFormFieldsValues) => {
        if (action === "add") {
            addRoleMutation(formValues);
        } else {
            updateRoleMutation({
                data: formValues,
                roleId: routeState?.id ?? "",
            });
        }
    };

    const { mutate: addRoleMutation, isPending } = useAddRole({ onSuccess: closeModal });
    const { mutate: updateRoleMutation, isPending: isUpdating } = useUpdateRole({
        onSuccess: closeModal,
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} Role`}
                    onClose={closeModal}
                />
                <div className={"full px-5 grid grid-cols-2 gap-4 py-4"}>
                    {roleFormFields.map((field) => generateFormField(field))}
                </div>
                <FullDivider />
                <div className={"flex justify-end px-5 gap-4 py-4 bg-gray-50 dark:bg-neutral-700/40"}>
                    <button type="button" onClick={() => closeModal()} className="py-2 px-3 outlined-button">
                        Cancel
                    </button>
                    <button type="submit" className="py-2 px-3 small-button">
                        <Pending isLoading={isPending || isUpdating} />
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default RoleForm;