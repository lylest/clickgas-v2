import {useLocation, useParams} from "react-router-dom";
import useRouteModal from "@/hook/useRouteModal.tsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import {capitalizeFirstLetter} from "@/utils";
import FullDivider from "@/components/divider/FullDivider.tsx";
import Pending from "@/components/loaders/pending/pending.tsx";
import {useAddPermission, useUpdatePermission} from "@/pages/settings/tabs/permissions/permission-queries.ts";

export interface IPermissionForm {
    name: string;
    path: string;
    httpMethod: string;
}

const PermissionForm = () => {
    const {action} = useParams();
    const {state: routeState} = useLocation();
    const baseUrl = routeState?.goBackTo ? routeState?.goBackTo : `/settings/permissions`;
    const {open, closeModal} = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true,
        },
    });

    // Validation schema for PermissionForm
    const permissionSchema = Yup.object({
        name: Yup.string()
            .required("Permission name is required")
            .min(2, "Permission name must be at least 2 characters")
            .max(50, "Permission name cannot exceed 50 characters"),

        path: Yup.string()
            .required("Path is required")
            .min(1, "Path must be at least 1 character")
            .max(200, "Path cannot exceed 200 characters"),

        httpMethod: Yup.string()
            .required("HTTP method is required")
            .oneOf(["GET", "POST", "PATCH", "DELETE"], "Invalid HTTP method"),
    });

    type PermissionFormFieldsValues = Yup.InferType<typeof permissionSchema>;

    const {
        formState: {errors},
        register,
        control,
        handleSubmit,
    } = useForm<PermissionFormFieldsValues>({
        resolver: yupResolver(permissionSchema),
        defaultValues: {
            ...routeState,
        },
    });

    // Form fields for PermissionForm
    const permissionFormFields: IFormField[] = [
        {
            register,
            control,
            name: "name",
            label: "Permission Name",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "e.g., CREATE_PRODUCT",
            type: "text",
            hasError: !!errors.name?.message,
            showErrorMessage: !!errors.name?.message,
            errorMessage: errors.name?.message,
        },
        {
            register,
            control,
            name: "path",
            label: "Path",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "e.g., /product",
            type: "text",
            hasError: !!errors.path?.message,
            showErrorMessage: !!errors.path?.message,
            errorMessage: errors.path?.message,
        },
        {
            register,
            control,
            name: "httpMethod",
            label: "HTTP Method",
            wrapperClass: "col-span-2",
            className: "resize-none col-span-2",
            placeholder: "e.g., POST",
            options: [
                "GET",
                "POST",
                "PATCH",
                "DELETE"
            ],
            hasError: !!errors.httpMethod?.message,
            showErrorMessage: !!errors.httpMethod?.message,
            errorMessage: errors.httpMethod?.message,
        },
    ];

    const onSubmit = (formValues: PermissionFormFieldsValues) => {
        if (action === "add") {
            addPermissionMutation(formValues);
        } else {
            updatePermissionMutation({
                data: formValues,
                permissionId: routeState?.id ?? "",
            });
        }
    };

    const {mutate: addPermissionMutation, isPending} = useAddPermission({onSuccess: closeModal});
    const {mutate: updatePermissionMutation, isPending: isUpdating} = useUpdatePermission({
        onSuccess: closeModal,
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full lg:w-[30rem] modal-container"}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} Permission`}
                    onClose={closeModal}
                />
                <div className={"full px-5 grid grid-cols-2 gap-4 py-4"}>
                    {permissionFormFields.map((field) => generateFormField(field))}
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

export default PermissionForm;