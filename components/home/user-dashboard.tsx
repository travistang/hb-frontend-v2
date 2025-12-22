"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/event/event-card";
import { EventData, NewsFeedPicture, DashboardResponse, NewsFeedEvent, NewsFeedResponse } from "@/components/event/types";
import { GalleryDialog } from "@/components/event/gallery-dialog";
import { mapActivityCodeToName } from "@/components/common/activity-name-mapper";
import { EventsSection } from "@/components/home/events-section";
import { UserCard } from "@/components/home/user-card";

const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

function safeAssetUrl(path: unknown) {
  if (typeof path !== "string" || !path) return "";
  // API returns "#" as a placeholder for "no image"
  if (path === "#") return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function UserDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isRelevantOpen, setIsRelevantOpen] = useState(true);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(true);
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  const [isCommunityOpen, setIsCommunityOpen] = useState(true);
  const [communityEvents, setCommunityEvents] = useState<NewsFeedEvent[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryPictures, setGalleryPictures] = useState<NewsFeedPicture[]>([]);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        // First get the user's pk from the /api/me endpoint
        const meResponse = await fetch("/api/me", { signal: controller.signal });
        const meData = await meResponse.json();

        if (!meData.authenticated) {
          setError("Not authenticated. Please sign in.");
          setIsLoading(false);
          return;
        }

        const pk = meData.pk;

        // Fetch dashboard and news feed in parallel
        const [dashboardResponse, newsFeedResponse] = await Promise.all([
          fetch(`/api/routes/user_main_page/${pk}/`, { signal: controller.signal }),
          fetch("/api/routes/news_feed/", { signal: controller.signal }),
        ]);

        if (dashboardResponse.status === 401 || newsFeedResponse.status === 401) {
          throw new Error("Your session expired. Please sign in again.");
        }

        if (!dashboardResponse.ok) {
          throw new Error("Failed to load dashboard. Please try again later.");
        }

        const dashboardJson: DashboardResponse = await dashboardResponse.json();
        if (!cancelled) {
          setData(dashboardJson);
        }

        if (newsFeedResponse.ok) {
          const newsFeedJson: NewsFeedResponse = await newsFeedResponse.json();
          if (!cancelled) {
            setCommunityEvents(newsFeedJson?.results ?? []);
          }
        }
      } catch (e: unknown) {
        if (cancelled) return;
        if (e instanceof Error && e.name === "AbortError") return;
        setError(
          e instanceof Error ? e.message : "Failed to load data. Please try again later."
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const handleOpenGallery = (pictures: NewsFeedPicture[], initialIndex: number) => {
    if (!pictures || pictures.length === 0) return;
    setGalleryPictures(pictures);
    setGalleryInitialIndex(Math.max(0, Math.min(initialIndex, pictures.length - 1)));
    setIsGalleryOpen(true);
  };

  const personal = data?.personal_info;
  const firstName = personal?.first_name || "User";
  const points = personal?.points;
  const level = personal?.experience_level_category;
  const profilePic = safeAssetUrl(personal?.profile_picture?.[0]);

  const relevantEvents = (data?.user_relevant_events ?? []).map((x) => x?.[1]).filter(Boolean);
  const upcomingEvents = (data?.user_upcoming_events ?? []).map((x) => x?.[1]).filter(Boolean);
  const recentEvents = (data?.user_recent_events ?? []).map((x) => x?.[1]).filter(Boolean);

  return (
    <div className="not-prose w-full">
      <UserCard
        firstName={firstName}
        profilePicture={profilePic}
        level={level}
        points={points}
        isLoading={isLoading}
      />

      {error ? (
        <div className="mb-6 rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>
      ) : null}

      <div className="grid gap-8">
        <EventsSection
          title="My upcoming events"
          count={upcomingEvents.length}
          isOpen={isUpcomingOpen}
          onOpenChange={setIsUpcomingOpen}
          isLoading={isLoading}
          emptyMessage="No upcoming events."
          events={upcomingEvents}
        />

        <EventsSection
          title="My recent events"
          count={recentEvents.length}
          isOpen={isRecentOpen}
          onOpenChange={setIsRecentOpen}
          isLoading={isLoading}
          emptyMessage="No recent events."
          events={recentEvents}
        />

        <EventsSection
          title="Relevant events"
          count={relevantEvents.length}
          isOpen={isRelevantOpen}
          onOpenChange={setIsRelevantOpen}
          isLoading={isLoading}
          emptyMessage="No relevant events."
          events={relevantEvents}
        />

        <EventsSection
          title="Recent community events"
          count={communityEvents.filter((ev) => (ev.pictures_uploaded?.length ?? 0) > 0).length}
          isOpen={isCommunityOpen}
          onOpenChange={setIsCommunityOpen}
          isLoading={isLoading}
          emptyMessage="No recent community events."
          events={communityEvents.filter((ev) => (ev.pictures_uploaded?.length ?? 0) > 0)}
          renderEvent={(ev) => {
            const eventData: EventData = {
              ...ev,
              activity_name: mapActivityCodeToName(ev.activity),
            };
            return (
              <EventCard
                event={eventData}
                variant="community"
                onOpenGallery={handleOpenGallery}
              />
            );
          }}
        />
      </div>

      <GalleryDialog
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        pictures={galleryPictures}
        initialIndex={galleryInitialIndex}
      />
    </div>
  );
}
