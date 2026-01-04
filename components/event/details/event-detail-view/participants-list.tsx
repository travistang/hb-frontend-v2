"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { EventDetails } from "@/services/event-service/types";
import { ParticipantListDialog } from "./participant-list-dialog";
import { PercentageBar } from "@/components/common/percentage-bar";

type Props = {
  event: EventDetails;
  className?: string;
};

export const ParticipantsList = ({ event, className }: Props) => {
  const mobile = useIsMobile();

  const MAX_AVARTAR_FOR_PREVIEW = mobile ? 6 : 3;

  const { participants, waitingList } = event;
  const numOmittedUsers = Math.max(
    participants.length - MAX_AVARTAR_FOR_PREVIEW,
    0
  );
  return (
    <>
      <div
        data-testid="organizer-chip"
        className={cn(
          "flex flex-col gap-4 rounded-lg p-2 bg-muted w-min gap-1",
          className
        )}
      >
        <div className="flex gap-1 items-center">
          <h6 className="text-xs font-bold">Participants</h6>
          <PercentageBar
            className="flex-1 h-2"
            value={event.participants.length}
            maxValue={event.max_participants}
          />
          <span className="text-xs">
            {event.participants.length}/{event.max_participants}
          </span>
        </div>
        <div className="flex overflow-hidden items-center gap-1 mb-1">
          {event.participants.slice(0, MAX_AVARTAR_FOR_PREVIEW).map((user) => (
            <Avatar key={user.id} className="h-6 w-6">
              <AvatarImage src={event.organizer.picture} />
              <AvatarFallback className="bg-background">
                {event.organizer.name?.[0]?.toUpperCase() || "--"}
              </AvatarFallback>
            </Avatar>
          ))}
          {numOmittedUsers > 0 && (
            <span className="text-xs italic">+{numOmittedUsers}</span>
          )}
          <ParticipantListDialog
            participants={participants}
            waitlisted={waitingList}
          />
        </div>
      </div>
    </>
  );
};
