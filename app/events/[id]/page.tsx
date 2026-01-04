"use client";

import EventDetailView from "@/components/event/details/event-detail-view";
import eventServiceProvider from "@/services/event-service";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LoadingPlaceholder } from "@/components/common/loading-placeholder";

export default function EventPage() {
  const params = useParams();
  const id = params.id as string;

  const eventId = parseInt(id, 10);
  if (!Number.isInteger(eventId)) {
    notFound();
  }

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => eventServiceProvider.getEvent(eventId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return <LoadingPlaceholder label="Loading event..." />;
  }

  if (error || !event) {
    notFound();
  }

  return <EventDetailView event={event} />;
}
