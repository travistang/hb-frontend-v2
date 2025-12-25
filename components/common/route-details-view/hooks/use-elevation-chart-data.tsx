import { calculateDistance } from "@/lib/gpx";
import { RouteDetails, Terrain } from "@/services/event-service/types";
import { useMemo } from "react";

export type ElevationChartData = ReturnType<typeof useElevationChartData>;
export const useElevationChartData = (routeDetails: RouteDetails) => {
  const elevationChartData = useMemo(() => {
    const cumulativeDistance = routeDetails.waypoints.reduce<number[]>(
      (acc, waypoint, index, waypoints) => {
        if (index > 0) {
          const previousWaypoint = waypoints[index - 1];
          return [
            ...acc,
            acc[acc.length - 1] +
              calculateDistance(
                previousWaypoint.latitude,
                previousWaypoint.longitude,
                waypoint.latitude,
                waypoint.longitude
              ),
          ];
        }
        return [...acc, 0];
      },
      []
    );
    return routeDetails.waypoints.map((waypoint, index) => {
      return {
        elevation: waypoint.elevation,
        distance: cumulativeDistance[index],
      };
    });
  }, [routeDetails.waypoints]);

  /**
   * Create 7 segments, from 0 (unclassified) T1 to T6
   * 0 has all the elevation retained, just to fill up the curve
   * for each T1-6, we first mask the elevation (by setting null), then for each segment, we set the elevation back
   * The result would be 7 segments with the exact same length (# waypoints)
   * With each of the segment representing a different SAC scale
   */
  const chartDataWithSACScale = useMemo(() => {
    // Create base data with null elevations for all SAC scales initially
    const baseData = elevationChartData.map((waypoint) => ({
      ...waypoint,
      T0: waypoint.elevation as number | null, // Unclassified segments (fallback)
      T1: null as number | null,
      T2: null as number | null,
      T3: null as number | null,
      T4: null as number | null,
      T5: null as number | null,
      T6: null as number | null,
      sacScale: null as number | null,
      peak: null as string | null,
      terrain: null as Terrain | null,
    }));

    // For each SAC scale segment, set the elevation for that specific scale
    for (const segment of routeDetails.sacScaleSegments) {
      for (let i = segment.start; i < segment.end; i++) {
        const elevationKey =
          `T${segment.sacScale}` as keyof (typeof baseData)[0];
        (baseData[i] as any)[elevationKey] = elevationChartData[i].elevation;
        // Clear the fallback elevation for classified segments
        baseData[i].T0 = null;
        baseData[i].sacScale = segment.sacScale;
      }
    }

    for (const peak of routeDetails.peaks) {
      baseData[peak.index].peak = peak.name;
    }

    for (const terrain of routeDetails.terrainSegments) {
      for (let i = terrain.start; i < terrain.end; i++) {
        baseData[i].terrain = terrain.type;
      }
    }

    return baseData;
  }, [routeDetails.sacScaleSegments, elevationChartData]);

  return chartDataWithSACScale;
};
