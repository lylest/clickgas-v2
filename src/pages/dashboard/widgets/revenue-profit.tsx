import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { IRevenueStats } from "@/types/dashboard";
import { FC } from "react";

// Two distinct shades of blue for better visual separation
const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(210, 100%, 50%)", // Primary blue
    },
    profit: {
        label: "Profit",
        color: "hsl(195, 100%, 45%)", // Light blue with teal undertone
    },
}

interface Props {
    stats: IRevenueStats[];
}

const RevenueProfitStats: FC<Props> = ({ stats }) => {
    // Calculate total revenue and profit
    const totalRevenue = stats.reduce((sum, item) => sum + item.revenue, 0);
    const totalProfit = stats.reduce((sum, item) => sum + item.profit, 0);
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(1) : 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">Revenue vs Profit</CardTitle>
                    <CardDescription>Daily performance for April</CardDescription>
                </div>
                <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={stats}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                        height={240}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="revenue"
                            type="monotone"
                            fill="var(--color-revenue)"
                            fillOpacity={0.4}
                            stroke="var(--color-revenue)"
                            strokeWidth={2}
                            stackId="a"
                        />
                        <Area
                            dataKey="profit"
                            type="monotone"
                            fill="var(--color-profit)"
                            fillOpacity={0.4}
                            stroke="var(--color-profit)"
                            strokeWidth={2}
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <div className="flex justify-between w-full text-sm">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total Revenue</span>
                        <span className="font-medium">{totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total Profit</span>
                        <span className="font-medium">{totalProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Profit Margin</span>
                        <span className="font-medium">{profitMargin}%</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default RevenueProfitStats