import { EventDetails } from "@/services/event-service/types";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  event: EventDetails;
};
export const EventDatetimeSummary = ({ event }: Props) => {
  return (
    <div
      data-testid="event-datetime-summary"
      className={cn(
        "w-full md:w-max min-w-48 md:shadow md:rounded-lg md:bg-background",
        "flex justify-center md:mt-0 md:justify-start flex-col items-stretch gap-1"
      )}
    >
      <div className="flex md:flex-col justify-center md:justify-start py-2 md:py-0">
        <div
          className={cn(
            "md:pt-4 md:px-4 text-xl font-medium flex items-center md:justify-between justify-start gap-2 md:gap-1",
            "pr-2 mr-2 md:mr-0"
          )}
        >
          <CalendarIcon className="w-8 h-8" />
          <div className="flex flex-col items-end">
            {format(new Date(event.start ?? ""), "MMM d")}
            <p className="hidden md:block text-sm text-muted-foreground leading-3">
              {format(new Date(event.start ?? ""), "yyyy")}
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold flex items-center justify-between md:self-end pr-4">
          {format(new Date(event.start ?? ""), "HH:mm")}
        </div>
      </div>
      <div
        data-testid="event-action-button-group"
        className={cn(
          "overflow-hidden flex flex-col md:items-end pt-1 pb-2 md:pb-0 w-full"
        )}
      >
        <Button className="w-full md:rounded-t-none" variant="success">
          <CheckCircle />
          Join
        </Button>
      </div>
    </div>
  );
};
