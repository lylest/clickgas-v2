
import { TrendingUp, TrendingDown } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface IOrderStats {
    totalOrders: number;
    deliveredOrders: number;
    notDeliveredOrders: number;
    cancelledOrders: number;
    deliveryRate: number;
    cancellationRate: number;
    deliveryRateChange: number;
    cancelRateChange: number;
}

interface OrderStatsChartProps {
    stats: IOrderStats;
}

const chartConfig = {
    delivered: {
        label: "Delivered",
        color: "hsl(210, 100%, 50%)", // Blue
    },
    notDelivered: {
        label: "Not Delivered",
        color: "hsl(25, 95%, 53%)", // Orange
    },
    cancelled: {
        label: "Cancelled",
        color: "hsl(0, 91%, 58%)", // Red
    },
} as ChartConfig

export function DeliveryPie({ stats }: OrderStatsChartProps) {
    // Format data for the chart
    const chartData = [
        {
            name: "Orders",
            delivered: stats.deliveredOrders,
            notDelivered: stats.notDeliveredOrders,
            cancelled: stats.cancelledOrders
        }
    ]

    // Determine if delivery rate is trending up or down
    const isDeliveryRateUp = stats.deliveryRateChange >= 0

    return (
        <Card className="flex flex-col border-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Order Statistics</CardTitle>
                <CardDescription>Delivery Performance Overview</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                        startAngle={0}
                        barGap={2}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {stats.totalOrders.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Orders
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="delivered"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-delivered)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="notDelivered"
                            fill="var(--color-notDelivered)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="cancelled"
                            fill="var(--color-cancelled)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-sm mt-6">
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm">
                        <span className="font-medium">Delivery Rate:</span> {stats.deliveryRate.toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-1">
                        {isDeliveryRateUp ? (
                            <>
                                <span className="text-emerald-500">+{stats.deliveryRateChange.toFixed(1)}%</span>
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </>
                        ) : (
                            <>
                                <span className="text-red-500">{stats.deliveryRateChange.toFixed(1)}%</span>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            </>
                        )}
                    </div>
                </div>
                <div className="text-xs text-muted-foreground">
                    {isDeliveryRateUp
                        ? "Delivery performance is improving compared to previous period"
                        : "Delivery performance needs attention - decreasing from previous period"}
                </div>
            </CardFooter>
        </Card>
    )
}