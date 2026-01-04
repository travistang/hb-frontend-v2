import { z } from "zod";
import { SACScale } from "./types";

export const routeSearchQuerySchema = z.object({
  sortBy: z
    .enum([
      "distance",
      "elevationGain",
      "duration",
      "sacScale",
      "popularity",
      "maxHeight",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  name: z.string().optional(),
  minDistance: z.number().min(0).optional(),
  maxDistance: z.number().min(0).optional(),
  minElevationGain: z.number().min(0).optional(),
  maxElevationGain: z.number().min(0).optional(),
  minDurationHours: z.number().min(0).int().optional(),
  maxDurationHours: z.number().min(0).int().optional(),
  difficulties: z
    .array(z.enum(["0", "1", "2", "3", "4", "5", "6"]))
    .optional()
    .transform((val) => val?.map(Number) as SACScale[] | undefined),
  boundingBox: z
    .object({
      minLat: z.number().min(-90).max(90),
      maxLat: z.number().min(-90).max(90),
      minLng: z.number().min(-180).max(180),
      maxLng: z.number().min(-180).max(180),
    })
    .optional(),
  limit: z.int().positive().optional(),
  offset: z.int().nonnegative().optional(),
});

/**
 * Schema according to HB's docs
 */
export const hbRouteResponseSchema = z.object({
  id: z.int().nonnegative(),
  title: z.string().min(1),
  distance: z.float32().nonnegative(),
  elevation_gain: z.int().nonnegative(),
  max_height: z.int().nonnegative(),
  duration: z.string().regex(/^[0-9]+:[0-5][0-9]$/),
  gpx: z.string(),
});

export const hbRouteSearchQuerySchema = z.object({
  search: z.string().optional(),
  sac_scales: z
    .string()
    .regex(/^T[1-6](,T[1-6])?$/)
    .optional(),
  ordering: z
    .string()
    .regex(/^-?(elevation_gain|max_height|popularity)$/)
    .optional(),
  limit: z.int().positive(),
  offset: z.int().nonnegative(),
});

export const hbRouteSearchReponseSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(hbRouteResponseSchema),
});
