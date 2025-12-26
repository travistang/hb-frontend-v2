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
  clusters: RouteSearchResultCluster[];
  routes: Route;
};

export type RouteSearchQuery = {
  sortBy?: "distance" | "elevationGain" | "duration" | "sacScale";
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
};

export interface RouteSearchProvider {
  search(query: RouteSearchQuery): Promise<RouteSearchResults>;
  getOne(id: number): Promise<RouteDetails | null>;
  create(route: CreateRouteParams): Promise<RouteDetails>;
  update(id: number, route: UpdateRouteParams): Promise<RouteDetails>;
  delete(id: number): Promise<void>;
}
