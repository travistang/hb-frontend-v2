import { cookies } from "next/headers";
import {
  CreateRouteParams,
  HBRouteSearchQuery,
  HBRouteSearchResponse,
  RouteDetails,
  RouteSearchQuery,
  RouteSearchResults,
  RouteServiceProvider,
  UpdateRouteParams,
} from "./types";
import {
  hbRouteSearchQuerySchema,
  hbRouteSearchReponseSchema,
} from "./validator";
import constants from "../user-service/constants";

class HBRouteServiceProvider implements RouteServiceProvider {
  private url = "https://www.hiking-buddies.com/api/routes/route_list/";

  private async requestWithHeader<ResponseType>(
    url: string,
    options?: RequestInit
  ) {
    const userCookies = await cookies();
    const jwtToken = userCookies.get(constants.cookies.authToken)?.value;
    if (!jwtToken) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `JWT ${jwtToken}`,
      },
    });

    return response.json() as ResponseType;
  }

  private searchQueryToHbQuery(query: RouteSearchQuery): HBRouteSearchQuery {
    const hbQuery: HBRouteSearchQuery = {
      limit: query.limit ?? 10,
      offset: query.offset ?? 0,
    };

    if (query.name) {
      hbQuery.search = query.name;
    }

    if (query?.difficulties?.length) {
      hbQuery.sac_scales = query.difficulties
        .filter((sac) => sac > 0)
        .map((sac) => "T" + sac)
        .join(",");
    }

    const sortPrefix = query?.sortOrder === "asc" ? "" : "-";
    switch (query?.sortBy) {
      case "popularity":
        hbQuery.ordering = sortPrefix + "popularity";
        break;
      case "maxHeight":
        hbQuery.ordering = sortPrefix + "max_height";
        break;
      case "elevationGain":
        hbQuery.ordering = sortPrefix + "elevation_gain";
        break;
      default:
        break;
    }

    const validateResult = hbRouteSearchQuerySchema.safeParse(hbQuery);
    if (!validateResult.success) {
      throw new Error("Failed to create HB route search schema from data.");
    }

    return validateResult.data;
  }

  private hbRouteDurationToMinutes(duration: string): number {
    const [h, mm] = duration.split(":");
    return parseInt(h, 10) * 60 + parseInt(mm, 10);
  }

  private hbSearchParamsToFrontendParams(
    hbParams: URLSearchParams
  ): URLSearchParams {
    const frontendParams = new URLSearchParams();

    // Convert HB param names to frontend param names
    if (hbParams.has("search")) {
      frontendParams.set("name", hbParams.get("search")!);
    }
    if (hbParams.has("sac_scales")) {
      // Convert T1,T2 to 1,2
      const sacScales = hbParams
        .get("sac_scales")!
        .split(",")
        .map((scale) => scale.replace("T", ""));
      frontendParams.set("difficulties", sacScales.join(","));
    }
    if (hbParams.has("ordering")) {
      const ordering = hbParams.get("ordering")!;
      const isDesc = ordering.startsWith("-");
      const sortBy = ordering.replace(/^-/, "");

      // Convert HB ordering to frontend sortBy/sortOrder
      switch (sortBy) {
        case "elevation_gain":
          frontendParams.set("sortBy", "elevationGain");
          break;
        case "max_height":
          frontendParams.set("sortBy", "maxHeight");
          break;
        case "popularity":
          frontendParams.set("sortBy", "popularity");
          break;
      }

      if (isDesc) {
        frontendParams.set("sortOrder", "desc");
      } else {
        frontendParams.set("sortOrder", "asc");
      }
    }
    if (hbParams.has("limit")) {
      frontendParams.set("limit", hbParams.get("limit")!);
    }
    if (hbParams.has("offset")) {
      frontendParams.set("offset", hbParams.get("offset")!);
    }

    return frontendParams;
  }

  private hbNextCursorToResult(cursorUrl?: string | null): string | null {
    if (!cursorUrl) {
      return null;
    }
    try {
      const url = new URL(cursorUrl);
      const hbParams = url.searchParams;
      const frontendParams = this.hbSearchParamsToFrontendParams(hbParams);
      const paramString = frontendParams.toString();
      return paramString ? "?" + paramString : null;
    } catch {
      return null;
    }
  }

  private async hbRouteSearchResultsToResults(
    hbSearchResults: HBRouteSearchResponse
  ): Promise<RouteSearchResults> {
    const results: RouteSearchResults = {
      count: hbSearchResults.count,
      clusters: [],
      next: this.hbNextCursorToResult(hbSearchResults.next),
      previous: this.hbNextCursorToResult(hbSearchResults.previous),
      routes: hbSearchResults.results.map((route) => ({
        id: route.id,
        name: route.title,
        distance: route.distance,
        elevationGain: route.elevation_gain,
        maxHeight: route.max_height,
        duration: this.hbRouteDurationToMinutes(route.duration),
        images: [],
        gpx: route.gpx,
        sacScale: 0,
        rating: 0,
      })),
    };

    return results;
  }

  async search(query: RouteSearchQuery = {}): Promise<RouteSearchResults> {
    const hbQuery = this.searchQueryToHbQuery(query);
    const searchParams = new URLSearchParams();
    Object.entries(hbQuery).forEach(([k, v]) =>
      searchParams.append(k, v.toString())
    );

    const hbRouteQueryResponse =
      await this.requestWithHeader<HBRouteSearchResponse>(
        this.url + "?" + searchParams.toString()
      );

    const validateResult = await hbRouteSearchReponseSchema.safeParseAsync(
      hbRouteQueryResponse
    );
    if (!validateResult.success) {
      throw new Error("HB returns unexpected response from route search");
    }

    return this.hbRouteSearchResultsToResults(validateResult.data);
  }

  async getOne(id: number): Promise<RouteDetails | null> {
    throw new Error("Not implemented");
  }

  async create(route: CreateRouteParams): Promise<RouteDetails> {
    throw new Error("Not implemented");
  }

  async update(id: number, route: UpdateRouteParams): Promise<RouteDetails> {
    throw new Error("Not implemented");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default new HBRouteServiceProvider();
