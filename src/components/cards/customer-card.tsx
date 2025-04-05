/*
import { ICustomer } from "@/types/customer";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    customer: ICustomer;
    query?: string;
}

const CustomerCard: FC<Props> = ({ customer, query = "" }) => {
    const navigate = useNavigate();

    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const handleSelectCustomer = (customer: ICustomer) => {
        navigate(`/order/form/add`, { state: { customerId: customer.id } });
    };

    // Highlight matching text in a string
    const highlightMatch = (text: string, query: string) => {
        if (!query || !text) return <span>{text}</span>;

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <span key={i} className="bg-yellow-200 dark:bg-yellow-700 font-medium">{part}</span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </>
        );
    };

    // Fixed color palette inspired by Apple's design
    const getUserColor = (name: string) => {
        const colors = [
            "bg-blue-500", "bg-indigo-500", "bg-purple-500",
            "bg-pink-500", "bg-rose-500", "bg-orange-500",
            "bg-amber-500", "bg-emerald-500", "bg-teal-500"
        ];
        const charCodeSum = name ? name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0;
        return colors[charCodeSum % colors.length];
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all hover:bg-white dark:hover:bg-gray-750 group"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full ${getUserColor(customer.userName)} flex items-center justify-center text-white font-medium transition-transform group-hover:scale-105`}
                    >
                        {getInitials(customer.userName)}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {highlightMatch(customer.userName, query)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {highlightMatch(customer.phone, query)}
                        </div>
                        {customer.email && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-xs truncate">
                                {highlightMatch(customer.email, query)}
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => handleSelectCustomer(customer)}
                    className="ml-3 py-2 px-4 border border-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400"
                >
                    Select
                </button>
            </div>

            {customer.address && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 pl-13 ml-13">
                    <div className="flex items-center">
                        <svg className="h-3 w-3 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="truncate max-w-xs">
              {highlightMatch(customer.address, query)}
            </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerCard;/!**!/*/
