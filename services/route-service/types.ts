import z from "zod";
import {
  hbRouteResponseSchema,
  hbRouteSearchQuerySchema,
  hbRouteSearchReponseSchema,
} from "./validator";

export type BoundingBox = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export type SACScale = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Route = {
  id: number;
  name: string;
  distance: number;
  elevationGain: number;
  rating: number;
  duration: number; // in minutes
  sacScale: SACScale;
  maxHeight: number;
  gpx: string; // TODO: maybe we can just parse this GPX string from backend and give frontend all waypoints instead
  images: { url: string; filename: string }[];
};

export type CreateRouteParams = {
  name: string;
  description: string;
  gpx: Blob | File;
  images: {
    name: string;
    file: Blob;
  }[];
};

export type UpdateRouteParams = {
  name?: string;
  description?: string;
  gpx?: Blob | File;
  images?: {
    name: string;
    file: Blob;
  }[];
  deleteImageNames?: string[];
};

export type RouteAnalytics = {
  distance: number;
  elevationGain: number;
  duration: number;
  sacScale: SACScale;
  rating: number;
  boundingBox: BoundingBox;
  waypoints: { latitude: number; longitude: number; elevation: number }[];
  terrainSegments: { type: Terrain; start: number; end: number }[];
  sacScaleSegments: { sacScale: number; start: number; end: number }[];
  peaks: {
    index: number;
    name: string;
    elevation: number;
  }[];
  huts: {
    index: number;
    name: string;
    elevation: number;
  }[];
  elevationLost: number;
  highestPoint: number;
};

export type RouteDetails = Route &
  RouteAnalytics & {
    description: string;
  };

export enum Terrain {
  Gravel = "gravel",
  Dirt = "dirt",
  Grass = "grass",
  Pavement = "pavement",
  Snow = "snow",
}

export type RouteSearchResultCluster = {
  lat: number;
  lng: number;
  boundingBox: BoundingBox;
  count: number;
};
export type RouteSearchResults = {
  count: number;
  next: string | null;
  previous: string | null;
  clusters: RouteSearchResultCluster[];
  routes: Route[];
};

export type RouteSearchQuery = {
  sortBy?:
    | "distance"
    | "elevationGain"
    | "duration"
    | "sacScale"
    | "popularity"
    | "maxHeight";
  sortOrder?: "asc" | "desc";
  name?: string;
  minDistance?: number;
  maxDistance?: number;
  minElevationGain?: number;
  maxElevationGain?: number;
  minDurationHours?: number;
  maxDurationHours?: number;
  difficulties?: SACScale[];
  boundingBox?: BoundingBox;
  limit?: number;
  offset?: number;
};

export interface RouteServiceProvider {
  search(query?: RouteSearchQuery): Promise<RouteSearchResults>;
  getOne(id: number): Promise<RouteDetails | null>;
  create(route: CreateRouteParams): Promise<RouteDetails>;
  update(id: number, route: UpdateRouteParams): Promise<RouteDetails>;
  delete(id: number): Promise<void>;
}

/**
 * HB-specific types
 */
export type HBRouteSearchQuery = z.infer<typeof hbRouteSearchQuerySchema>;
export type HBRouteResponse = z.infer<typeof hbRouteResponseSchema>;
export type HBRouteSearchResponse = z.infer<typeof hbRouteSearchReponseSchema>;
