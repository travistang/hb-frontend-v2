import { EventDetails } from "@/services/event-service/types";
import { MapPinIcon } from "lucide-react";
import { EventDatetimeSummary } from "./event-datetime-summary";
import { OrganizerChip } from "./organizer-chip";
import Markdown from "react-markdown";
import { ParticipantsList } from "./participants-list";
import { RouteDetailsView } from "@/components/common/route-details-view";
import { SacScaleBadge } from "@/components/common/sac-scale-badge";
import { RouteStatistics } from "./route-statistics";

type Props = {
  event: EventDetails;
};
export default function EventDetailView({ event }: Props) {
  return (
    <div className="rounded-xl shadow lg:border-border flex flex-col items-stretch overflow-hidden min-h-screen">
      <div className="w-full h-[33vh] bg-green-300">
        {/*event.cover_picture_url && (
          <Image
            src={event.cover_picture_url}
            alt={event.title ?? "Event cover picture"}
            width={1000}
            height={1000}
            className="object-cover"
          />
        )*/}
      </div>
      <div
        data-testid="event-header"
        className="flex flex-col md:flex-row justify-between gap-4 px-4 -mt-16 z-2 w-full"
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <SacScaleBadge
              value={
                event.routeDetails.sac_scale
                  ? `T${event.routeDetails.sac_scale}`
                  : "T0"
              }
            />
          </div>
          {event.meeting_point && (
            <div className="flex items-center gap-1 text-sm font-medium">
              <MapPinIcon className="w-4 h-4" />
              {event.meeting_point}
            </div>
          )}
        </div>
        <EventDatetimeSummary event={event} />
      </div>
      <div
        data-testid="event-participants-group"
        className="flex flex-wrap gap-2 md:flex-row md:-mt-12 items-center pt-2 pl-4 pr-4 md:pr-72"
      >
        <OrganizerChip className="h-16 w-auto min-w-24" event={event} />
        <ParticipantsList className="max-w-[256px] h-16 flex-1" event={event} />
      </div>
      <div className="p-4 flex items-center">
        <RouteStatistics className="w-full" routeDetails={event.routeDetails} />
      </div>
      <div className="p-4 flex items-center">
        <RouteDetailsView routeDetails={event.routeDetails} />
      </div>
      <div data-testid="event-content" className="flex-1 flex-col px-4 pt-2">
        <section className="py-2 md:py-4">
          <h4 className="text-sm font-bold">Description</h4>
          <Markdown>{event.description}</Markdown>
        </section>
      </div>
    </div>
  );
}
