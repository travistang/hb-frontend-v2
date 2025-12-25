"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  TooltipProps,
  ReferenceDot,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RouteDetails } from "@/services/event-service/types";
import { ElevationChartData } from "./hooks/use-elevation-chart-data";

type Props = {
  routeDetails: RouteDetails;
  chartDataWithSACScale: ElevationChartData;
  hoverPointIndex?: number;
  onHoverAtIndex: (index: number | undefined) => void;
};
export default function ElevationChart({
  routeDetails,
  hoverPointIndex,
  chartDataWithSACScale,
  onHoverAtIndex,
}: Props) {
  // Get the data point for the hovered index
  const hoverDataPoint =
    hoverPointIndex !== undefined
      ? chartDataWithSACScale[hoverPointIndex]
      : null;

  // Find the actual elevation value (could be in any T property)
  const hoverElevation = hoverDataPoint?.elevation ?? null;

  return (
    <ChartContainer config={{}} className="p-4 max-h-[250px]">
      <LineChart
        onMouseMove={(event) => {
          if (event.activeTooltipIndex === undefined) {
            return;
          }
          onHoverAtIndex(event.activeTooltipIndex);
        }}
        onMouseLeave={() => {
          onHoverAtIndex(undefined);
        }}
        accessibilityLayer
        data={chartDataWithSACScale}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          type="number"
          label={{
            value: "Distance (km)",
            position: "insideBottom",
            offset: -5,
          }}
          min={0}
          domain={["dataMin", "dataMax"]}
          tickFormatter={(value) => value.toFixed(1)}
          dataKey="distance"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          type="number"
          label={{
            value: "Elevation (m)",
            angle: -90,
            position: "left",
            offset: 0,
          }}
        />
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
        <ReferenceDot
          fill="var(--chart-0)"
          r={4}
          x={hoverDataPoint?.distance ?? -1}
          y={hoverElevation ?? -1}
        />
        <ReferenceLine
          position="end"
          strokeDasharray={"3 2"}
          stroke="var(--chart-0)"
          x={hoverDataPoint?.distance ?? -1}
        />
        <ReferenceLine
          position="end"
          strokeDasharray={"3 2"}
          stroke="var(--chart-0)"
          y={hoverElevation ?? -1}
        />
      </LineChart>
    </ChartContainer>
  );
}
