const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

/**
 * Safely constructs asset URLs, handling various input formats
 *
 * @param path - The asset path (can be string, undefined, or other types)
 * @returns A safe URL string for the asset, or empty string if invalid
 *
 * Behavior:
 * - Returns empty string for non-string or falsy inputs
 * - Returns empty string for "#" (API placeholder for no image)
 * - Returns full URL as-is if it starts with http:// or https://
 * - Otherwise constructs URL using ASSET_BASE_URL with proper path formatting
 */
export function safeAssetUrl(path: unknown): string {
  if (typeof path !== "string" || !path) return "";
  // API returns "#" as a placeholder for "no image"
  if (path === "#") return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
