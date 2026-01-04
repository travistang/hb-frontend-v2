/**
 * Mapping values from Search Params to Route Search Query
 */

import { RouteSearchQuery, SACScale } from "@/services/route-service/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const routeSearchFromSearchParams = (
  searchParams: ReadonlyURLSearchParams | URLSearchParams
): RouteSearchQuery => {
  const query: RouteSearchQuery = {};

  if (searchParams.has("name")) {
    query.name = searchParams.get("name") || undefined;
  }
  if (searchParams.has("sortBy")) {
    query.sortBy = searchParams.get("sortBy") as RouteSearchQuery["sortBy"];
  }
  if (searchParams.has("sortOrder")) {
    query.sortOrder = searchParams.get("sortOrder") as "asc" | "desc";
  }
  if (searchParams.has("difficulties")) {
    query.difficulties = searchParams
      .get("difficulties")
      ?.split(",")
      .map(Number) as SACScale[];
  }
  if (searchParams.has("minDistance")) {
    query.minDistance = parseFloat(searchParams.get("minDistance")!);
  }
  if (searchParams.has("maxDistance")) {
    query.maxDistance = parseFloat(searchParams.get("maxDistance")!);
  }
  if (searchParams.has("minElevationGain")) {
    query.minElevationGain = parseFloat(searchParams.get("minElevationGain")!);
  }
  if (searchParams.has("maxElevationGain")) {
    query.maxElevationGain = parseFloat(searchParams.get("maxElevationGain")!);
  }
  if (searchParams.has("minDurationHours")) {
    query.minDurationHours = parseInt(
      searchParams.get("minDurationHours")!,
      10
    );
  }
  if (searchParams.has("maxDurationHours")) {
    query.maxDurationHours = parseInt(
      searchParams.get("maxDurationHours")!,
      10
    );
  }
  if (
    searchParams.has("minLat") &&
    searchParams.has("maxLat") &&
    searchParams.has("minLng") &&
    searchParams.has("maxLng")
  ) {
    query.boundingBox = {
      minLat: parseFloat(searchParams.get("minLat")!),
      maxLat: parseFloat(searchParams.get("maxLat")!),
      minLng: parseFloat(searchParams.get("minLng")!),
      maxLng: parseFloat(searchParams.get("maxLng")!),
    };
  }
  if (searchParams.has("limit")) {
    query.limit = parseInt(searchParams.get("limit")!, 10);
  }
  if (searchParams.has("offset")) {
    query.offset = parseInt(searchParams.get("offset")!, 10);
  }

  return query;
};

export const routeSearchToSearchParams = (
  query: RouteSearchQuery
): URLSearchParams => {
  const params = new URLSearchParams();

  if (query.name) {
    params.set("name", query.name);
  }
  if (query.sortBy) {
    params.set("sortBy", query.sortBy);
  }
  if (query.sortOrder) {
    params.set("sortOrder", query.sortOrder);
  }
  if (query.difficulties && query.difficulties.length > 0) {
    params.set("difficulties", query.difficulties.join(","));
  }
  if (query.minDistance !== undefined) {
    params.set("minDistance", query.minDistance.toString());
  }
  if (query.maxDistance !== undefined) {
    params.set("maxDistance", query.maxDistance.toString());
  }
  if (query.minElevationGain !== undefined) {
    params.set("minElevationGain", query.minElevationGain.toString());
  }
  if (query.maxElevationGain !== undefined) {
    params.set("maxElevationGain", query.maxElevationGain.toString());
  }
  if (query.minDurationHours !== undefined) {
    params.set("minDurationHours", query.minDurationHours.toString());
  }
  if (query.maxDurationHours !== undefined) {
    params.set("maxDurationHours", query.maxDurationHours.toString());
  }
  if (query.boundingBox) {
    params.set("minLat", query.boundingBox.minLat.toString());
    params.set("maxLat", query.boundingBox.maxLat.toString());
    params.set("minLng", query.boundingBox.minLng.toString());
    params.set("maxLng", query.boundingBox.maxLng.toString());
  }
  if (query.limit !== undefined) {
    params.set("limit", query.limit.toString());
  }
  if (query.offset !== undefined) {
    params.set("offset", query.offset.toString());
  }

  return params;
};
