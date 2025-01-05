import { TrendingUp } from "lucide-react"
import { CartesianGrid, Dot, Line, LineChart } from "recharts"
import { useTheme } from "next-themes";
import ShineBorder from "@/components/ui/shine-border";
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
import { useEffect, useState } from "react";
const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "0",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "1",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "2",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "3",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "4",
    color: "hsl(var(--chart-5))",
  },
} 
const Chart=({data})=> {
  const [chartData,setChartData]=useState([{browser: "0", stress: 89, fill: "var(--color-chrome)"}])
  useEffect(()=>{
     const data2 =JSON.parse(localStorage.getItem("chart")||'[]') || [
  { browser: "0", stress: 50, fill: "var(--color-chrome)" },
  { browser: "1", stress: 50,fill: "var(--color-safari)" },
  { browser: "2", stress: 50,fill: "var(--color-firefox)" },
  { browser: "3",  stress: 50, fill: "var(--color-edge)" },
  { browser: "4", stress: 50,fill: "var(--color-other)" },
]
    setChartData(data2)
    console.log('this is the chart data',data2)
  },[data])
  const theme = useTheme();
  return (
    <ShineBorder
      className="text-center text-2xl font-bold capitalize"
      color={theme.theme === "dark" ? "white" : "black"}
    >
      <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Stress Chart </CardTitle>
        <CardDescription>previous data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={ chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="stress"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="stress"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.browser}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                )
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {chartData ? (
              <span>
                Stress has increased by 4% <TrendingUp className="h-4 w-4" />
              </span>
            ) : (
                "Check Stress to show the trend"
              )}
          </div>
          <div className="leading-none text-muted-foreground">
            {data && "Shown based on the previous resulst"}
          </div>
      </CardFooter>
</Card>
      </ShineBorder> 
  )
}
export default Chart
