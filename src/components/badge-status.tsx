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

        case "successful":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "full_paid":
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

        case "exceed":
            return <Badge type={"pink"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "error":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "cancelled":
            return <Badge type={"error"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "refunded":
            return <Badge type={"success"} label={capitalizeFirstLetter(wildStatus)}/>;

        case "inactive":
            return <Badge type={"secondary"} label={capitalizeFirstLetter(wildStatus)}/>;

        default:
            return <Badge type={"secondary"} label={wildStatus}/>;
    }
};

export default BadgeStatus
