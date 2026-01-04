import {
  CreateRouteParams,
  Route,
  RouteDetails,
  RouteServiceProvider,
  RouteSearchQuery,
  RouteSearchResults,
  UpdateRouteParams,
} from "./types";
import fetchedRoutes from "./fetched-routes.json";
import gpxService from "../gpx-service";

// Cast the imported JSON to RouteDetails array
const mockRoutes: RouteDetails[] = fetchedRoutes as RouteDetails[];

// In-memory storage for mutations
let routes = [...mockRoutes];
let nextId = Math.max(...routes.map((r) => r.id), 0) + 1;

/**
 * Check if a route matches the search query filters
 */
function matchesQuery(route: RouteDetails, query: RouteSearchQuery): boolean {
  // Filter by name
  if (
    query.name &&
    !route.name.toLowerCase().includes(query.name.toLowerCase())
  ) {
    return false;
  }

  // Filter by distance
  if (query.minDistance !== undefined && route.distance < query.minDistance) {
    return false;
  }
  if (query.maxDistance !== undefined && route.distance > query.maxDistance) {
    return false;
  }

  // Filter by elevation gain
  if (
    query.minElevationGain !== undefined &&
    route.elevationGain < query.minElevationGain
  ) {
    return false;
  }
  if (
    query.maxElevationGain !== undefined &&
    route.elevationGain > query.maxElevationGain
  ) {
    return false;
  }

  // Filter by duration (query is in hours, route.duration is in minutes)
  if (
    query.minDurationHours !== undefined &&
    route.duration < query.minDurationHours * 60
  ) {
    return false;
  }
  if (
    query.maxDurationHours !== undefined &&
    route.duration > query.maxDurationHours * 60
  ) {
    return false;
  }

  // Filter by SAC scale
  if (
    query.difficulties !== undefined &&
    !query.difficulties.includes(route.sacScale)
  ) {
    return false;
  }

  // Filter by bounding box
  if (query.boundingBox) {
    const { minLat, maxLat, minLng, maxLng } = query.boundingBox;
    const routeBB = route.boundingBox;

    // Check if route bounding box overlaps with query bounding box
    const overlaps =
      routeBB.minLat <= maxLat &&
      routeBB.maxLat >= minLat &&
      routeBB.minLng <= maxLng &&
      routeBB.maxLng >= minLng;

    if (!overlaps) {
      return false;
    }
  }

  return true;
}

/**
 * Sort routes based on query parameters
 */
function sortRoutes(
  filteredRoutes: RouteDetails[],
  query: RouteSearchQuery
): RouteDetails[] {
  if (!query.sortBy) {
    return filteredRoutes;
  }

  const sortOrder = query.sortOrder === "desc" ? -1 : 1;

  return [...filteredRoutes].sort((a, b) => {
    let comparison = 0;

    switch (query.sortBy) {
      case "distance":
        comparison = a.distance - b.distance;
        break;
      case "elevationGain":
        comparison = a.elevationGain - b.elevationGain;
        break;
      case "duration":
        comparison = a.duration - b.duration;
        break;
      case "sacScale":
        comparison = a.sacScale - b.sacScale;
        break;
      default:
        comparison = 0;
    }

    return comparison * sortOrder;
  });
}

/**
 * Convert RouteDetails to Route (without detailed fields)
 */
function toRoute(routeDetails: RouteDetails): Route {
  return {
    id: routeDetails.id,
    name: routeDetails.name,
    distance: routeDetails.distance,
    elevationGain: routeDetails.elevationGain,
    rating: routeDetails.rating,
    duration: routeDetails.duration,
    sacScale: routeDetails.sacScale,
    images: routeDetails.images,
  };
}

export class MockedRouteServiceProvider implements RouteServiceProvider {
  async search(query: RouteSearchQuery = {}): Promise<RouteSearchResults> {
    // Filter routes based on query
    const filteredRoutes = routes.filter((route) => matchesQuery(route, query));

    // Sort routes
    const sortedRoutes = sortRoutes(filteredRoutes, query);

    // For now, return the first route as the result (simplified implementation)
    // In a real implementation, this would include clustering logic
    return {
      next: null,
      previous: null,
      clusters: [],
      routes:
        sortedRoutes.length > 0 ? toRoute(sortedRoutes[0]) : toRoute(routes[0]),
    };
  }

  async getOne(id: number): Promise<RouteDetails | null> {
    const route = routes.find((r) => r.id === id);
    return route || null;
  }

  async create(route: CreateRouteParams): Promise<RouteDetails> {
    const analytics = await gpxService.parse(route.gpx);
    const newRoute: RouteDetails = {
      id: nextId++,
      ...route,
      ...analytics,
      images: route.images.map((img) => ({
        url: URL.createObjectURL(img.file),
        filename: img.name,
      })),
    };

    routes.push(newRoute);
    return newRoute;
  }

  async update(
    id: number,
    updateParams: UpdateRouteParams
  ): Promise<RouteDetails> {
    const index = routes.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Route with id ${id} not found`);
    }
    let updatedRoute = { ...routes[index] };
    if (updateParams.gpx) {
      const analytics = await gpxService.parse(updateParams.gpx);
      updatedRoute = {
        ...updatedRoute,
        ...analytics,
      };
    }
    if (updateParams.images) {
      updatedRoute.images = updateParams.images.map((img) => ({
        url: URL.createObjectURL(img.file),
        filename: img.name,
      }));
    }
    if (updateParams.deleteImageNames) {
      updatedRoute.images = updatedRoute.images.filter(
        (img) => !updateParams.deleteImageNames?.includes(img.filename)
      );
    }

    routes[index] = { ...updatedRoute };
    return updatedRoute;
  }

  async delete(id: number): Promise<void> {
    const index = routes.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Route with id ${id} not found`);
    }

    routes.splice(index, 1);
  }

  /**
   * Get all routes (useful for listing)
   */
  async getAll(): Promise<Route[]> {
    return routes.map(toRoute);
  }

  /**
   * Get all route details (useful for detailed listing)
   */
  async getAllDetails(): Promise<RouteDetails[]> {
    return [...routes];
  }
}
