"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RouteDetails } from "@/services/event-service/types";
import { useElevationChartData } from "./hooks/use-elevation-chart-data";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  // Find the first non-null elevation value
  const elevationEntry = payload.find((entry) => entry.value !== null);
  if (!elevationEntry) {
    return null;
  }

  const elevation = elevationEntry.value;
  const distance = label;

  // Extract SAC scale from the dataKe  y (T0, T1, T2, etc.)
  const sacScale = elevationEntry.dataKey?.toString().replace("T", "") || "0";
  const sacLabel = sacScale === "0" ? "Unclassified" : `T${sacScale}`;

  const terrain = elevationEntry.payload?.terrain;
  const peak = elevationEntry.payload?.peak;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-lg"
            style={{ backgroundColor: `var(--chart-${sacScale})` }}
          />
          <span className="text-xs font-bold">{sacLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-lg"
            style={{ backgroundColor: `var(--terrain-${terrain})` }}
          />
          <span className="text-xs font-bold">{terrain}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Distance
          </span>
          <span className="font-bold text-muted-foreground">
            {typeof distance === "number"
              ? `${distance.toFixed(1)} km`
              : distance}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Elevation
          </span>
          <span className="font-bold">
            {typeof elevation === "number"
              ? `${Math.round(elevation)} m`
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

type Props = {
  routeDetails: RouteDetails;
  onHoverAtIndex: (index: number) => void;
};
export default function ElevationChart({
  routeDetails,
  onHoverAtIndex,
}: Props) {
  const chartDataWithSACScale = useElevationChartData(routeDetails);
  return (
    <ChartContainer config={{}} className="p-4">
      <LineChart
        height={280}
        onMouseMove={(event) => {
          if (event.activeTooltipIndex === undefined) {
            return;
          }
          onHoverAtIndex(event.activeTooltipIndex);
        }}
        accessibilityLayer
        data={chartDataWithSACScale}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          label={{
            value: "Distance (km)",
            position: "insideBottom",
            offset: -5,
          }}
          tickFormatter={(value) => value.toFixed(1)}
          dataKey="distance"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          label={{
            value: "Elevation (m)",
            angle: -90,
            position: "left",
            offset: 0,
          }}
        />
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <Line
          isAnimationActive={false}
          dataKey="T0"
          stroke="black"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          isAnimationActive={false}
          dataKey="T1"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          isAnimationActive={false}
          dataKey="T2"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          isAnimationActive={false}
          dataKey="T3"
          stroke="var(--chart-3)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          isAnimationActive={false}
          dataKey="T4"
          stroke="var(--chart-4)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          isAnimationActive={false}
          dataKey="T5"
          stroke="var(--chart-5)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          isAnimationActive={false}
          dataKey="T6"
          stroke="var(--chart-6)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
