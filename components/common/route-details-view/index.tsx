"use client";

import { cn } from "@/lib/utils";
import { RouteDetails } from "@/services/event-service/types";
import { useState } from "react";
import ElevationChart from "./elevation-chart";
import { GpxMapView } from "./gpx-map-view";

type Props = {
  routeDetails: RouteDetails;
  className?: string;
};
export const RouteDetailsView = ({ routeDetails, className }: Props) => {
  const [hoverPointIndex, setHoverPointIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <div
      data-testid="route-details-view"
      className={cn(
        "flex flex-col md:flex-row overflow-hidden w-full rounded-lg shadow",
        className
      )}
    >
      <div className="h-[300px] flex-1 w-full">
        <GpxMapView
          routeDetails={routeDetails}
          hoverPointIndex={hoverPointIndex}
          onHoverAtIndex={setHoverPointIndex}
        />
      </div>
      <div
        data-testid="route-details-view-elevation-chart"
        className="flex-1 w-full"
      >
        <ElevationChart
          routeDetails={routeDetails}
          onHoverAtIndex={setHoverPointIndex}
        />
      </div>
    </div>
  );
};
