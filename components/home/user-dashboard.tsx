"use client";

import { useState } from "react";
import { EventCard } from "@/components/event/event-card";
import {
  EventData,
  NewsFeedPicture,
  DashboardResponse,
  NewsFeedEvent,
  NewsFeedResponse,
} from "@/components/event/types";
import { GalleryDialog } from "@/components/event/gallery-dialog";
import { mapActivityCodeToName } from "@/components/common/activity-name-mapper";
import { EventsSection } from "@/components/home/events-section";
import { UserCard } from "@/components/home/user-card";
import { routes } from "@/lib/routes";
import { safeAssetUrl } from "@/lib/asset-utils";
import { useQuery } from "@tanstack/react-query";

export function UserDashboard() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryPictures, setGalleryPictures] = useState<NewsFeedPicture[]>([]);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  // Fetch dashboard data
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<DashboardResponse> => {
      const response = await fetch(routes.api.dashboard);
      if (response.status === 401) {
        throw new Error("Your session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error("Failed to load dashboard. Please try again later.");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch news feed data
  const {
    data: newsFeedData,
    isLoading: isNewsFeedLoading,
    error: newsFeedError,
  } = useQuery({
    queryKey: ["news-feed"],
    queryFn: async (): Promise<NewsFeedResponse> => {
      const response = await fetch(routes.api.events.newsFeed);
      if (response.status === 401) {
        throw new Error("Your session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error("Failed to load news feed. Please try again later.");
      }
      return response.json();
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Combine loading and error states
  const isLoading = isDashboardLoading || isNewsFeedLoading;
  const error = dashboardError?.message || newsFeedError?.message || null;
  const data = dashboardData || null;
  const communityEvents = newsFeedData?.results ?? [];

  const handleOpenGallery = (
    pictures: NewsFeedPicture[],
    initialIndex: number
  ) => {
    if (!pictures || pictures.length === 0) return;
    setGalleryPictures(pictures);
    setGalleryInitialIndex(
      Math.max(0, Math.min(initialIndex, pictures.length - 1))
    );
    setIsGalleryOpen(true);
  };

  const personal = data?.personal_info;
  const firstName = personal?.first_name || "User";
  const points = personal?.points;
  const level = personal?.experience_level_category;
  const profilePic = safeAssetUrl(personal?.profile_picture?.[0]);

  const relevantEvents = (data?.user_relevant_events ?? [])
    .map((x) => x?.[1])
    .filter(Boolean);
  const upcomingEvents = (data?.user_upcoming_events ?? [])
    .map((x) => x?.[1])
    .filter(Boolean);
  const recentEvents = (data?.user_recent_events ?? [])
    .map((x) => x?.[1])
    .filter(Boolean);

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
        <div className="mb-6 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-8">
        <EventsSection
          title="My upcoming events"
          count={upcomingEvents.length}
          defaultOpen
          isLoading={isLoading}
          emptyMessage="No upcoming events."
          events={upcomingEvents}
        />

        <EventsSection
          title="My recent events"
          count={recentEvents.length}
          defaultOpen
          isLoading={isLoading}
          emptyMessage="No recent events."
          events={recentEvents}
        />

        <EventsSection
          title="Relevant events"
          count={relevantEvents.length}
          defaultOpen
          isLoading={isLoading}
          emptyMessage="No relevant events."
          events={relevantEvents}
        />

        <EventsSection
          title="Recent community events"
          count={
            communityEvents.filter(
              (ev) => (ev.pictures_uploaded?.length ?? 0) > 0
            ).length
          }
          defaultOpen
          isLoading={isLoading}
          emptyMessage="No recent community events."
          events={communityEvents.filter(
            (ev) => (ev.pictures_uploaded?.length ?? 0) > 0
          )}
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
