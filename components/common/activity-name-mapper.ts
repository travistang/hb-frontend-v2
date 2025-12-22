/**
 * Maps activity codes to their display names
 */
const ACTIVITY_CODE_MAP: Record<string, string> = {
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
export function mapActivityCodeToName(activityCode: unknown): string | undefined {
  if (typeof activityCode !== "string" || !activityCode) {
    return undefined;
  }

  const normalized = activityCode.trim().toUpperCase();
  return ACTIVITY_CODE_MAP[normalized];
}

