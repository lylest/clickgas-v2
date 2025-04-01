import {FC} from 'react';
import Badge from "@/components/general/Badge.tsx";
import {capitalizeFirstLetter} from "@/utils";
import {HiCheckBadge} from "react-icons/hi2";

interface IBadgeStatusProps<T> {
    row?: T;
    status: keyof T;
}

const BadgeStatus: FC<IBadgeStatusProps<any>> = ({status}) => {
    const wildStatus = typeof status === "string" ? status?.toLowerCase() : ""
    switch (wildStatus) {
        case "processing":
            return <Badge type={"info"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "active":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "verified":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}>
                <HiCheckBadge />
            </Badge>

        case "confirmed":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}>
                <HiCheckBadge />
            </Badge>

        case "successful":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "success":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "paid":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "not-paid":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "pending":
            return <Badge type={"warning"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "incomplete":
            return <Badge type={"warning"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "out_of_stock":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "undeliverable":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "failed":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "preparing":
            return <Badge type={"purple"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "on_route":
            return <Badge type={"warning"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "delivered":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "error":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "cancelled":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "returned":
            return <Badge type={"info"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "inactive":
            return <Badge type={"secondary"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "unpaid":
            return <Badge type={"purple"} label={capitalizeFirstLetter(wildStatus)}/>;


        default:
            return <Badge type={"secondary"} label={wildStatus}/>;
    }
};

export default BadgeStatus
