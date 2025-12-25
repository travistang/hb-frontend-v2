"use client";

import { RouteDetails } from "@/services/event-service/types";
import { formatDuration, intervalToDuration } from "date-fns";
import {
  Mountain,
  TrendingUp,
  TrendingDown,
  Route as RouteIcon,
  Clock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RouteStatisticsProps = {
  routeDetails: RouteDetails;
  className?: string;
};

export const RouteStatistics = ({
  routeDetails,
  className,
}: RouteStatisticsProps) => {
  // Helper function to format duration in minutes using date-fns
  const formatDurationMinutes = (minutes: number) => {
    const duration = intervalToDuration({
      start: 0,
      end: minutes * 60 * 1000, // Convert minutes to milliseconds
    });

    return formatDuration(duration, {
      format: ["hours", "minutes"],
      zero: false,
      delimiter: " ",
      locale: {
        formatDistance: (token, count) => {
          switch (token) {
            case "xHours":
              return `${count}h`;
            case "xMinutes":
              return `${count}m`;
            default:
              return `${count}`;
          }
        },
      },
    });
  };

  const StatItem = ({
    icon: Icon,
    label,
    value,
    unit,
  }: {
    icon: any;
    label: string;
    value: number | string;
    unit: string;
  }) => (
    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
      <Icon className="w-5 h-5 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">
          {typeof value === "number" ? value.toLocaleString() : value} {unit}
        </p>
      </div>
    </div>
  );

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      <StatItem
        icon={RouteIcon}
        label="Total Distance"
        value={routeDetails.distance || 0}
        unit="km"
      />
      <StatItem
        icon={Clock}
        label="Duration"
        value={
          routeDetails.duration
            ? formatDurationMinutes(routeDetails.duration)
            : "N/A"
        }
        unit=""
      />

      <StatItem
        icon={Mountain}
        label="Elevation Gain"
        value={routeDetails.elevation_gain || 0}
        unit="m"
      />
      <StatItem
        icon={TrendingDown}
        label="Elevation Lost"
        value={routeDetails.elevationLost}
        unit="m"
      />
      <StatItem
        icon={TrendingUp}
        label="Highest Point"
        value={routeDetails.highestPoint}
        unit="m"
      />

      <StatItem
        icon={Star}
        label="Rating"
        value={
          routeDetails.rating ? routeDetails.rating.toLocaleString() : "N/A"
        }
        unit=""
      />
    </div>
  );
};
