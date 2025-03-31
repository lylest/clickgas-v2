import Modal from "@/components/modal";
import SlideOverHeader from "@/components/sideover/sidebar-header.tsx";
import { Outlet, useParams } from "react-router-dom";
import {localStorageKeys, removeValuesFromLocalStorage} from "@/utils/local-storage.ts";
import useRouteModal from "@/hook/useRouteModal";
import {capitalizeFirstLetter} from "@/utils";


function SupplierForm() {
    const { action } = useParams<{ action: string }>();
    const baseUrl = `/suppliers`;
    const { open, closeModal } = useRouteModal({
        navigateTo: {
            url: baseUrl,
            replace: true
        },
        callback: () => {
            removeValuesFromLocalStorage([
                localStorageKeys.supplier_form?.BASIC_SUPPLIER_DETAILS,
                localStorageKeys.supplier_form?.SUPPLIER_LOCATION_DETAILS,
                localStorageKeys.supplier_form?.SUPPLIER_ID_DETAILS
            ]);
        }
    });

    return (
        <Modal open={open} onClose={closeModal} dialogClass={"pt-4"}>
            <div className={"w-full lg:w-[50rem]  modal-container "}>
                <SlideOverHeader
                    title={`${capitalizeFirstLetter(action ?? "")} supplier`}
                    onClose={closeModal} />

                <Outlet context={{
                    action: action,
                    closeModal,
                    baseUrl: baseUrl
                }} />
            </div>
        </Modal>
    );
}

export default SupplierForm;
