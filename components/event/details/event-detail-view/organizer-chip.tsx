import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { EventDetails } from "@/services/event-service/types";

type Props = {
  event: EventDetails;
  className?: string;
};
export const OrganizerChip = ({ className, event }: Props) => {
  return (
    <div
      data-testid="organizer-chip"
      className={cn(
        "flex items-center gap-4 rounded-lg p-2 bg-muted w-min overflow-y-hidden",
        className
      )}
    >
      <Avatar>
        <AvatarImage src={event.organizer.picture} />
        <AvatarFallback className="bg-background">
          {event.organizer.name?.[0]?.toUpperCase() || "--"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs leading-2 whitespace-nowrap">by</span>
        <span className="text-lg font-medium">{event.organizer.name}</span>
      </div>
    </div>
  );
};
