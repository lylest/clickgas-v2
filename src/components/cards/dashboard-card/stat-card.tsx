import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Props {
    label: string;
    value: number;
    change: number;
    icon: LucideIcon;
}

const StatCard = ({ label, value, change, icon: Icon }: Props) => {
    const isPositive = change >= 0;
    const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
    const badgeColor = isPositive
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600";

    return (
        <div className="bg-white rounded-xl py-6 px-4 border border-gray-200 w-full max-w-sm">
            <div className="mb-2">
                <div className="bg-gray-100 p-3 rounded-lg inline-block">
                    <Icon className="w-5 h-5 text-gray-700" />
                </div>
            </div>

            <h3 className="text-gray-500 font-normal text-sm mb-2">{label}</h3>

            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</span>
                <span className={`${badgeColor} px-2 py-1 rounded text-sm font-medium flex items-center`}>
          <ChangeIcon className="w-3 h-3 mr-1" />
                    {Math.abs(change).toFixed(2)}%
        </span>
            </div>
        </div>
    );
};

export default StatCard;
