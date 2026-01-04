import { RouteAnalytics, Terrain } from "../route-service";
import { GpxServiceProvider } from "./types";

export class MockGpxServiceProvider implements GpxServiceProvider {
  async parse(gpx: Blob | File): Promise<RouteAnalytics> {
    return {
      distance: 0,
      elevationGain: 0,
      duration: 0,
      sacScale: 0,
      rating: 0,
      boundingBox: { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 },
      waypoints: [],
      terrainSegments: [] as { type: Terrain; start: number; end: number }[],
      sacScaleSegments: [] as {
        sacScale: number;
        start: number;
        end: number;
      }[],
      peaks: [] as { index: number; name: string; elevation: number }[],
      huts: [] as { index: number; name: string; elevation: number }[],
      elevationLost: 0,
      highestPoint: 0,
    };
  }
}
