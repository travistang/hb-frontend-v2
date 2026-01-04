import { Activity } from "@/services/event-service/validator";

/**
 * Maps activity codes to their display names
 */
const ACTIVITY_CODE_MAP: Record<Activity, string> = {
  HI: "Hiking",
  SO: "Social",
  BO: "Bouldering",
  CL: "Climbing",
  SK: "Skiing",
  SB: "Snowboarding",
  SS: "Skiing/Snow Boarding",
};

/**
 * Converts an activity code to its display name
 * @param activityCode - The activity code (e.g., "HI", "SO")
 * @returns The activity name (e.g., "Hiking", "Social") or undefined if not found
 */
export function mapActivityCodeToName(
  activityCode?: Activity
): string | undefined {
  return activityCode ? ACTIVITY_CODE_MAP[activityCode] : undefined;
}
