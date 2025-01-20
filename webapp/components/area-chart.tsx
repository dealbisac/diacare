"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
    { date: "2025-01-01", high: 148, low: 74 },
    { date: "2025-01-02", high: 165, low: 95 },
    { date: "2025-01-03", high: 127, low: 72 },
    { date: "2025-01-04", high: 172, low: 87 },
    { date: "2025-01-05", high: 111, low: 82 },
    { date: "2025-01-06", high: 103, low: 85 },
    { date: "2025-01-07", high: 178, low: 80 },
    { date: "2025-01-08", high: 164, low: 100 },
    { date: "2025-01-09", high: 152, low: 75 },
    { date: "2025-01-10", high: 151, low: 91 },
    { date: "2025-01-11", high: 123, low: 83 },
    { date: "2025-01-12", high: 130, low: 88 },
    { date: "2025-01-13", high: 176, low: 95 },
    { date: "2025-01-14", high: 149, low: 92 },
    { date: "2025-01-15", high: 102, low: 79 },
    { date: "2025-01-16", high: 113, low: 85 },
    { date: "2025-01-17", high: 172, low: 91 },
    { date: "2025-01-18", high: 133, low: 86 },
    { date: "2025-01-19", high: 140, low: 77 },
    { date: "2025-01-20", high: 119, low: 93 },
    { date: "2025-01-21", high: 150, low: 80 },
    { date: "2025-01-22", high: 112, low: 88 },
    { date: "2025-01-23", high: 135, low: 91 },
    { date: "2025-01-24", high: 164, low: 94 },
    { date: "2025-01-25", high: 142, low: 89 },
    { date: "2025-01-26", high: 128, low: 79 },
    { date: "2025-01-27", high: 177, low: 96 },
    { date: "2025-01-28", high: 108, low: 81 },
    { date: "2025-01-29", high: 153, low: 85 },
    { date: "2025-01-30", high: 180, low: 97 },
    { date: "2025-05-01", high: 119, low: 74 },
    { date: "2025-05-02", high: 154, low: 95 },
    { date: "2025-05-03", high: 137, low: 83 },
    { date: "2025-05-04", high: 176, low: 97 },
    { date: "2025-05-05", high: 171, low: 93 },
    { date: "2025-05-06", high: 165, low: 90 },
    { date: "2025-05-07", high: 108, low: 72 },
    { date: "2025-05-08", high: 140, low: 89 },
    { date: "2025-05-09", high: 134, low: 87 },
    { date: "2025-05-10", high: 169, low: 92 },
    { date: "2025-05-11", high: 154, low: 84 },
    { date: "2025-05-12", high: 110, low: 80 },
    { date: "2025-05-13", high: 142, low: 78 },
    { date: "2025-05-14", high: 175, low: 99 },
    { date: "2025-05-15", high: 163, low: 93 },
    { date: "2025-05-16", high: 129, low: 85 },
    { date: "2025-05-17", high: 176, low: 97 },
    { date: "2025-05-18", high: 141, low: 88 },
    { date: "2025-05-19", high: 108, low: 75 },
    { date: "2025-05-20", high: 120, low: 83 },
    { date: "2025-05-21", high: 145, low: 91 },
    { date: "2025-05-22", high: 115, low: 80 },
    { date: "2025-05-23", high: 143, low: 85 },
    { date: "2025-05-24", high: 131, low: 79 },
    { date: "2025-05-25", high: 112, low: 77 },
    { date: "2025-05-26", high: 128, low: 81 },
    { date: "2025-05-27", high: 162, low: 92 },
    { date: "2025-05-28", high: 147, low: 89 },
    { date: "2025-05-29", high: 109, low: 83 },
    { date: "2025-05-30", high: 178, low: 95 },
    { date: "2025-05-31", high: 152, low: 87 },
    { date: "2025-06-01", high: 116, low: 82 },
    { date: "2025-06-02", high: 162, low: 90 },
    { date: "2025-06-03", high: 110, low: 78 },
    { date: "2025-06-04", high: 138, low: 84 },
    { date: "2025-06-05", high: 147, low: 93 },
    { date: "2025-06-06", high: 170, low: 98 },
    { date: "2025-06-07", high: 125, low: 81 },
    { date: "2025-06-08", high: 142, low: 85 },
    { date: "2025-06-09", high: 168, low: 99 },
    { date: "2025-06-10", high: 118, low: 88 },
    { date: "2025-06-11", high: 135, low: 91 },
    { date: "2025-06-12", high: 172, low: 97 },
    { date: "2025-06-13", high: 139, low: 87 },
    { date: "2025-06-14", high: 159, low: 90 },
    { date: "2025-06-15", high: 141, low: 85 },
    { date: "2025-06-16", high: 134, low: 81 },
    { date: "2025-06-17", high: 173, low: 94 },
    { date: "2025-06-18", high: 113, low: 76 },
    { date: "2025-06-19", high: 150, low: 89 },
    { date: "2025-06-20", high: 161, low: 90 },
    { date: "2025-06-21", high: 145, low: 84 },
    { date: "2025-06-22", high: 123, low: 80 },
    { date: "2025-06-23", high: 160, low: 92 },
    { date: "2025-06-24", high: 132, low: 79 },
    { date: "2025-06-25", high: 136, low: 83 },
    { date: "2025-06-26", high: 177, low: 96 },
    { date: "2025-06-27", high: 148, low: 88 },
    { date: "2025-06-28", high: 139, low: 85 },
    { date: "2025-06-29", high: 129, low: 79 },
    { date: "2025-06-30", high: 174, low: 94 }
  ];
  

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  high: {
    label: "high",
    color: "hsl(var(--chart-1))",
  },
  low: {
    label: "low",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function AreaCharts() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2025-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Data of your Glucose Level</CardTitle>
          <CardDescription>Choose the range over the period.</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillhigh" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-high)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-high)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filllow" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-low)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-low)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="low"
              type="natural"
              fill="url(#filllow)"
              stroke="var(--color-low)"
              stackId="a"
            />
            <Area
              dataKey="high"
              type="natural"
              fill="url(#fillhigh)"
              stroke="var(--color-high)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
