import EventDetailView from "@/components/event/details/event-detail-view";
import eventServiceProvider from "@/services/event-service";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const eventId = parseInt(id, 10);
  if (!Number.isInteger(eventId)) {
    notFound();
  }
  const event = await eventServiceProvider.getEvent(eventId);
  if (!event) {
    notFound();
  }

  return <EventDetailView event={event} />;
}
