import { RouteAnalytics } from "../route-service";

export interface GpxServiceProvider {
  parse(gpx: Blob | File): Promise<RouteAnalytics>;
}
