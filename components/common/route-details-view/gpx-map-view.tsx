"use client";

import { RouteDetails } from "@/services/event-service/types";
import { GeoJson, GeoJsonFeature, Map, Point } from "pigeon-maps";
import { ComponentProps, useMemo } from "react";

// Wrapper component that receives pigeon-maps props automatically
function GeoJsonLayer(
  props: ComponentProps<typeof GeoJson> & {
    pixelToLatLng?: (pixel: Point) => Point; // Injected by Map
    onMouseOver?: (args: {
      latLng: Point;
      feature: any;
      event: React.MouseEvent;
    }) => void;
  }
) {
  const { pixelToLatLng, onMouseOver, ...rest } = props;

  const handleMouseOver = ({
    event,
    payload,
  }: {
    event: React.MouseEvent;
    payload: any;
  }) => {
    if (!onMouseOver || !pixelToLatLng) return;

    // Get the map container from the event target
    const target = event.target as Element;
    const mapContainer = target.closest("div")?.parentElement;

    if (mapContainer) {
      const rect = mapContainer.getBoundingClientRect();
      const pixel: Point = [
        event.clientX - rect.left,
        event.clientY - rect.top,
      ];

      const latLng = pixelToLatLng(pixel);
      onMouseOver({ latLng, feature: payload, event });
    }
  };

  return <GeoJson {...rest} onMouseOver={handleMouseOver} />;
}

type Props = {
  routeDetails: RouteDetails;
  hoverPointIndex?: number;
  onHoverAtIndex: (index: number) => void;
};
export const GpxMapView = ({
  routeDetails,
  hoverPointIndex,
  onHoverAtIndex,
}: Props) => {
  const center = useMemo<[number, number]>(() => {
    return [
      routeDetails.waypoints.reduce(
        (acc, waypoint) => acc + waypoint.latitude,
        0
      ) / routeDetails.waypoints.length,
      routeDetails.waypoints.reduce(
        (acc, waypoint) => acc + waypoint.longitude,
        0
      ) / routeDetails.waypoints.length,
    ];
  }, [routeDetails.waypoints]);

  const hoverPointCoordinates = useMemo(() => {
    if (hoverPointIndex === undefined) {
      return undefined;
    }
    return routeDetails.waypoints[hoverPointIndex];
  }, [routeDetails.waypoints, hoverPointIndex]);
  const hoverPointGeoJsonFeature = useMemo(() => {
    if (hoverPointCoordinates === undefined) {
      return undefined;
    }
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          hoverPointCoordinates.longitude,
          hoverPointCoordinates.latitude,
        ],
      },
      properties: { prop0: "value0" },
    };
  }, [hoverPointCoordinates]);

  const gpxLineFeatures = useMemo(() => {
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: routeDetails.waypoints.map((waypoint) => [
          waypoint.longitude,
          waypoint.latitude,
        ]),
      },
    };
  }, [routeDetails.waypoints]);

  return (
    <Map
      minZoom={9}
      animate
      mouseEvents
      height={400}
      center={center}
      defaultZoom={12}
    >
      <GeoJsonLayer
        onMouseOver={(geoJsonProps) => console.log({ geoJsonProps })}
        svgAttributes={{
          stroke: "blue",
          strokeWidth: 2,
        }}
      >
        <GeoJsonFeature
          onClick={(clickProps) => console.log({ clickProps })}
          feature={gpxLineFeatures}
        />
      </GeoJsonLayer>
      {hoverPointGeoJsonFeature && (
        <GeoJson
          svgAttributes={{
            fill: "var(--chart-3)",
            r: "8",
          }}
        >
          <GeoJsonFeature feature={hoverPointGeoJsonFeature} />
        </GeoJson>
      )}
    </Map>
  );
};
