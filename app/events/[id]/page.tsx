"use client";

import EventDetailView from "@/components/event/details/event-detail-view";
import eventServiceProvider from "@/services/event-service";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    notFound();
  }

  return <EventDetailView event={event} />;
}
