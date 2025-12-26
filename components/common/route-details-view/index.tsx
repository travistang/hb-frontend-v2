"use client";

import { cn } from "@/lib/utils";
import { RouteDetails } from "@/services/event-service/types";
import { useState } from "react";
import ElevationChart from "./elevation-chart";
import { GpxMapView } from "./gpx-map-view";
import { HoverPointInfo } from "./hover-point-info";
import { useElevationChartData } from "./hooks/use-elevation-chart-data";

type Props = {
  routeDetails: RouteDetails;
  className?: string;
};
export const RouteDetailsView = ({ routeDetails, className }: Props) => {
  const [hoverPointIndex, setHoverPointIndex] = useState<number | undefined>(
    undefined
  );
  const chartDataWithSACScale = useElevationChartData(routeDetails);

  return (
    <div
      data-testid="route-details-view"
      className={cn(
        "flex flex-col md:flex-row overflow-hidden w-full rounded-lg shadow grow-0 shrink-0",
        className
      )}
    >
      <div className="flex-1 w-full">
        <GpxMapView
          routeDetails={routeDetails}
          hoverPointIndex={hoverPointIndex}
          onHoverAtIndex={setHoverPointIndex}
        />
      </div>
      <div
        data-testid="route-details-view-elevation-chart"
        className="flex-1 flex flex-col items-stretch w-full"
      >
        <ElevationChart
          hoverPointIndex={hoverPointIndex}
          chartDataWithSACScale={chartDataWithSACScale}
          onHoverAtIndex={setHoverPointIndex}
        />
        <div
          data-testid="route-details-view-hover-point-info"
          className="flex flex-1 w-full shrink-0 pl-4"
        >
          <HoverPointInfo
            className="md:pl-4 self-center text-center h-24 md:h-auto"
            pointInfo={
              hoverPointIndex !== undefined
                ? {
                    sacScale:
                      chartDataWithSACScale[hoverPointIndex].sacScale ?? 0,
                    terrain: chartDataWithSACScale[hoverPointIndex].terrain,
                    distance: chartDataWithSACScale[hoverPointIndex].distance,
                    elevation: chartDataWithSACScale[hoverPointIndex].elevation,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};
