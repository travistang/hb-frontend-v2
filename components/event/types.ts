// Re-export API types from the service layer
export type {
  Event,
  NewsFeedPicture,
  NewsFeedResponse,
  DashboardResponse,
} from "@/services/event-service/types";

import type { Event, NewsFeedPicture } from "@/services/event-service/types";

// UI-specific props types (not from API)
export type EventCardProps = {
  event: Event;
  variant?: "standard" | "community";
  onOpenGallery?: (pictures: NewsFeedPicture[], initialIndex: number) => void;
};
