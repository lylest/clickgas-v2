import React from "react";
import { TbLoadBalancer } from "react-icons/tb";
import { twMerge } from "tailwind-merge"; // if you are using tailwind merge

interface LoanCardProps {
    status: "disbursed" | "pending" | "rejected" | "overdue";
    amount: number;
    applications: number;
}

const LoanCard: React.FC<LoanCardProps> = ({ status, amount, applications }) => {
    const statusConfig = {
        disbursed: {
            bgColor: "bg-green-100",
            textColor: "text-green-500",
            gradientFrom: "from-green-300",
            gradientTo: "to-green-600"
        },
        pending: {
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-500",
            gradientFrom: "from-yellow-300",
            gradientTo: "to-yellow-600"
        },
        rejected: {
            bgColor: "bg-red-100",
            textColor: "text-red-500",
            gradientFrom: "from-red-300",
            gradientTo: "to-red-600"
        },
        overdue: {
            bgColor: "bg-orange-100",
            textColor: "text-orange-500",
            gradientFrom: "from-orange-300",
            gradientTo: "to-orange-600"
        }
    };

    const { bgColor, textColor, gradientFrom, gradientTo } = statusConfig[status];

    return (
        <div className={"ring-1 p-4 overflow-hidden space-y-2 w-[15rem] bg-white dark:bg-neutral-800 ring-inset ring-gray-200 dark:ring-neutral-700 rounded-lg"}>
            <div className="flex py-2 justify-between border-b-[1px] border-gray-200 dark:border-neutral-600/50">
                <h1 className="text-gray-500 dark:text-neutral-400 font-medium capitalize">{status} Loans</h1>
                <div className={twMerge(`size-10 rounded-lg grid place-items-center`, bgColor)}>
                    <TbLoadBalancer size={20} className={textColor} />
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-medium dark:text-neutral-200">{amount.toLocaleString()}</h1>
                    <p className="text-xs font-medium text-gray-600 dark:text-neutral-300">Total {applications} applications</p>
                </div>
                <div className={twMerge(`bg-gradient-to-br size-12 opacity-20 blur-xl`, gradientFrom, gradientTo)} />
            </div>
        </div>
    );
};

export default LoanCard;
