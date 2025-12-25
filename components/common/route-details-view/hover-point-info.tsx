import { cn } from "@/lib/utils";
import { Terrain } from "@/services/event-service/types";
import { InfoIcon } from "lucide-react";

const HoverPointInfoItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="text-[0.70rem] uppercase text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
};

const ColorWithText = ({
  color,
  text,
  className,
}: {
  color: string;
  text: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-2 pt-1", className)}>
      <div className="w-4 h-4 rounded-lg" style={{ backgroundColor: color }} />
      <span className="text-xs font-bold">{text}</span>
    </div>
  );
};
type Props = {
  className?: string;
  pointInfo?: {
    sacScale: number | null;
    terrain: Terrain | null;
    distance: number;
    elevation: number;
  };
};
export const HoverPointInfo = ({ className, pointInfo }: Props) => {
  if (!pointInfo) {
    return (
      <div className={cn(className)}>
        <span className="flex items-center text-left gap-2 text-muted-foreground text-sm">
          <InfoIcon className="w-4 h-4" />
          Hover over a point to see more information
        </span>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col items-stretch w-full", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <HoverPointInfoItem label="SAC Scale">
          <ColorWithText
            color={`var(--chart-${pointInfo.sacScale})`}
            text={pointInfo.sacScale ? `T${pointInfo.sacScale}` : "N/A"}
          />
        </HoverPointInfoItem>
        <HoverPointInfoItem label="Terrain">
          <ColorWithText
            color={`var(--terrain-${pointInfo.terrain})`}
            text={pointInfo.terrain ? pointInfo.terrain : "N/A"}
          />
        </HoverPointInfoItem>
        <HoverPointInfoItem label="Distance">
          <span className="font-bold">
            {typeof pointInfo.distance === "number"
              ? `${pointInfo.distance.toFixed(1)} km`
              : pointInfo.distance}
          </span>
        </HoverPointInfoItem>
        <HoverPointInfoItem label="Elevation">
          <span className="font-bold">
            {typeof pointInfo.elevation === "number"
              ? `${Math.round(pointInfo.elevation)} m`
              : "N/A"}
          </span>
        </HoverPointInfoItem>
      </div>
    </div>
  );
};
