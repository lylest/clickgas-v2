import {IApiResponse, QueryOptions} from "@/utils/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {uploadFile} from "@/api/files.ts";
import {IFileResponse} from "@/types/file";


export const useUploadFile = (options?: QueryOptions) => {
    const queryClient = useQueryClient();

    const handleSuccess = async (apiResponse: IFileResponse) => {
        await queryClient.invalidateQueries({});
        //toast.success(apiResponse.message);
        options?.onSuccess?.(apiResponse)
    };

    const handleError = async (response: IApiResponse) => {
        toast.error(response.message)
        options?.onError?.(response);
    };

    return useMutation({
        mutationFn: uploadFile,
        onSuccess: handleSuccess,
        onError: handleError
    })
};