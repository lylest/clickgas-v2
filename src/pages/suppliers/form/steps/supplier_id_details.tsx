import {useState} from "react";
import ChipIcon from "@/components/general/ChipIcon.tsx";
import {LucideIdCard, Upload} from "lucide-react";
import FormAction from "@/pages/suppliers/form/form-action.tsx";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import {useDropzone} from "react-dropzone";
import {useOutletContext, useParams} from "react-router-dom";
import {getValueFromLocalStorage, localStorageKeys, saveValueToLocalStorage} from "@/utils/local-storage.ts";
import ImagePreviewCard from "@/components/cards/image-preview.tsx";
import LinkImgPreviewCard from "@/components/cards/link-img-preview.tsx";
import {useUploadFile} from "@/pages/files/file-queries.ts";
import {IFileResponse} from "@/types/file";
import {useAddSupplier, useUpdateSupplier} from "@/pages/suppliers/supplier-queries.ts";


const SupplierIDDetails = () => {
    const {action} = useParams();
    console.log(action);
    const defaultValues = getValueFromLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_ID_DETAILS);
    const {closeModal} = useOutletContext<{
        baseUrl: string,
        closeModal: () => void
    }>();

    const [isDragging, setDragging] = useState(false);
    const [isError, setIsError] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    // Validation schema for supplier ID
    const supplierIdSchema = Yup.object({
        idType: Yup.string()
            .required("ID type is required")
            .oneOf(["NIDA", "PASSPORT", "VOTING", "DRIVING_LICENSE"], "Please select a valid ID type"),
        idNumber: Yup.string()
            .required("ID number is required")
            .min(5, "ID number must be at least 5 characters")
            .max(50, "ID number cannot exceed 50 characters"),
        idImage: Yup.string()
            .required("ID image is required"),
    });

    type SupplierIdFormFieldsValues = Yup.InferType<typeof supplierIdSchema>;

    const {
        formState: {errors},
        register,
        control,
        setValue,
        handleSubmit,
    } = useForm<SupplierIdFormFieldsValues>({
        resolver: yupResolver(supplierIdSchema),
        defaultValues: {...defaultValues},
    });

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (files) => {
            const validFiles = files.every(file => {
                const extension = file.name.split('.').pop()?.toLowerCase();
                return extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'pdf';
            });
            if (validFiles) {
                setFile(files[0]);
                setValue("idImage", files[0].name); // Temporary value until upload completes
                const formData = new FormData();
                if (files[0]) {
                    formData.append("file", files[0]);
                    uploadFileMutation(formData);
                }
            } else {
                setFile(null);
                setIsError(!validFiles);
            }
        },
        onDragEnter: () => {
            setDragging(true);
        },
        onDragOver: () => {
            setDragging(false);
        },
        onDragLeave: () => {
            setDragging(false);
        },
        noClick: true, // Prevent automatic click handling
    });

    function onFileUploadSuccess(data: IFileResponse) {
        setValue("idImage", data.data?.id);
    }

    const {mutate: uploadFileMutation, isPending: isUploading} = useUploadFile({
        onSuccess: onFileUploadSuccess
    });


    // Form fields configuration
    const supplierIdFormFields: IFormField[] = [
        {
            register,
            control,
            name: "idType",
            label: "ID Type",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "Select ID type",
            options: [
                "NIDA", "PASSPORT", "VOTING", "DRIVING_LICENSE"
            ],
            hasError: !!errors.idType?.message,
            showErrorMessage: !!errors.idType?.message,
            errorMessage: errors.idType?.message,
        },
        {
            register,
            control,
            name: "idNumber",
            label: "ID Number",
            wrapperClass: "col-span-1",
            className: "resize-none col-span-1",
            placeholder: "e.g., TZ19980328",
            type: "text",
            hasError: !!errors.idNumber?.message,
            showErrorMessage: !!errors.idNumber?.message,
            errorMessage: errors.idNumber?.message,
        },
    ];

    const onSubmit = (formValues: SupplierIdFormFieldsValues) => {
        saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_ID_DETAILS, formValues);

        const basicValues = getValueFromLocalStorage(localStorageKeys.supplier_form?.BASIC_SUPPLIER_DETAILS);
        const locationValues = getValueFromLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_LOCATION_DETAILS);


        const payload = {
            firstName: basicValues.firstName,
            lastName: basicValues.lastName,
            middleName: basicValues?.middleName ?? null,
            phone: basicValues.phone,
            country: locationValues.country,
            region: locationValues.region,
            address: locationValues.address,
            gpsCoordinates: {
                latitude: locationValues.latitude,
                longitude: locationValues.longitude,
            },
            idType: formValues.idType,
            idImage: formValues.idImage,
            idNumber: formValues.idNumber
        }
        if (action ==="add") {
            addSupplierMutation(payload)
        } else {
            updateSupplierMutation({
                data:payload,
                supplierId:basicValues?.supplierId ?? ""
            })
        }
    };

    const {mutate: addSupplierMutation, isPending} = useAddSupplier({onSuccess: closeModal})
    const {mutate: updateSupplierMutation, isPending: isUpdating} = useUpdateSupplier({onSuccess: closeModal})

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full"}>
            <div className={"flex place-items-center gap-2 px-4 py-3"}>
                <ChipIcon Icon={<LucideIdCard className={"h-5 w-5 text-slate-500"}/>}/>
                <h1 className={"text-lg font-medium text-slate-800"}>ID Verification</h1>
            </div>

            <div className={"full px-5 grid grid-cols-2 gap-4 py-6 overflow-auto"}>
                {supplierIdFormFields.map((field) => generateFormField(field))}

                <div className={"col-span-2 space-y-2 py-4"}>
                    <label className={"text-sm flex gap-1 font-medium leading-6 text-gray-900 dark:text-neutral-300"}>
                        Upload ID Document
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center justify-center">
                        {file ? (
                            <ImagePreviewCard
                                file={file}
                                onRemove={() => {
                                    setFile(null);
                                    setValue("idImage", "");
                                }}
                            />
                        ) : defaultValues?.Image !== null ? (
                            <LinkImgPreviewCard
                                url={defaultValues?.Image.bucketUrl ?? file} // This should be a file URL if available
                                onRemove={() => {
                                    setValue("idImage", "");
                                    saveValueToLocalStorage(localStorageKeys.supplier_form?.SUPPLIER_ID_DETAILS, {
                                        ...defaultValues,
                                        Image:null
                                    });
                                    window.location.reload();
                                }}
                            />
                        ) : (
                            <div {...getRootProps()} className="w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className={`flex flex-col items-center justify-center w-full h-64 border-2 
                                    ${isDragging ? "border-primary-500" : "border-gray-300"} 
                                    ${isError || !!errors.idImage?.message ? "border-red-500" : ""} 
                                    border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 
                                    hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload
                                            className={`w-8 h-8 mb-4 ${isError || !!errors.idImage?.message ? "text-red-500" : "text-gray-500"} dark:text-gray-400`}
                                        />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload ID document</span> or drag
                                            and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            png, jpg, jpeg, pdf (max 5MB)
                                        </p>
                                        {isError && (
                                            <span className="text-red-500 text-xs">Invalid file format</span>
                                        )}
                                        {!!errors.idImage?.message && (
                                            <span className="text-red-500 text-xs">{errors.idImage?.message}</span>
                                        )}
                                    </div>
                                    <input id="dropzone-file" {...getInputProps()} type="file" className="hidden"/>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FormAction
                currentPage={3}
                stepsCount={3}
                hasPrevious={true}
                submitBtnText={
                    isUploading ? "Uploading file..." :
                        isPending ? "saving..." :
                            isUpdating ? "updating..." :
                                "save"}
                loading={isUploading || isPending || isUpdating}
            >
            </FormAction>
        </form>
    );
};

export default SupplierIDDetails;