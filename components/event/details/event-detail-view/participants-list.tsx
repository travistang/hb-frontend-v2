"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { EventDetails } from "@/services/event-service/types";
import { Eye, List } from "lucide-react";
import { useState } from "react";
import { ParticipantListDialog } from "./participant-list-dialog";

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
        <h6 className="text-xs font-bold">Participants</h6>
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
