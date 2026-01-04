"use client";

import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EventCard } from "@/components/event/event-card";
import { Event } from "@/components/event/types";
import { ReactNode, useState } from "react";

interface EventsSectionProps {
  title: string;
  count: number;
  defaultOpen: boolean;
  isLoading?: boolean;
  emptyMessage: string;
  events: Event[];
  renderEvent?: (event: Event, index: number) => ReactNode;
}

export function EventsSection({
  title,
  count,
  defaultOpen = false,
  isLoading = false,
  emptyMessage,
  events,
  renderEvent,
}: EventsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center gap-2 text-left">
          <div className="text-base font-semibold">{title}</div>
          <Badge variant="outline">{count}</Badge>
          <ChevronDown
            className={`h-4 w-4 cursor-pointer transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <div className="grid gap-3">
          {count === 0 && !isLoading ? (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                {emptyMessage}
              </CardContent>
            </Card>
          ) : null}
          {events.map((event, index) => {
            const key = event?.id ?? `${event?.title}-${event?.start}`;
            return renderEvent ? (
              <div key={key}>{renderEvent(event, index)}</div>
            ) : (
              <EventCard key={key} event={event} />
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
