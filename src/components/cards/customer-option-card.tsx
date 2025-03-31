import { ICustomer } from "@/types/customer";

const CustomerOptionCard = ({ userName, phone }: ICustomer) => {
    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full border bg-gray-100 flex items-center justify-center border-gray-200 font-medium">
                {getInitials(userName)}
            </div>
            <div>
                <div className="font-medium">{userName}</div>
                <div className="text-sm text-gray-500">{phone}</div>
            </div>
        </div>
    );
};

export default CustomerOptionCard;