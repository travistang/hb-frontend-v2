import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
  animate?: boolean;
  value: number;
  colorRules?: PercentageBarColorRules;
  maxValue: number;
  className?: string;
};

// Key is the percentage, value is the color
export type PercentageBarColorRules = Record<number, string>;
export const PercentageBar = ({
  value,
  colorRules,
  maxValue,
  className,
}: Props) => {
  const percentage = maxValue ? (value / maxValue) * 100 : 0;
  const barColor = useMemo(() => {
    if (!colorRules) return "bg-primary";
    return (
      Object.keys(colorRules)
        .sort((a, b) => Number(b) - Number(a))
        .find((threshold) => percentage >= Number(threshold))?.[1] ||
      "bg-primary"
    );
  }, [percentage, colorRules]);
  return (
    <div
      className={cn("w-full h-2 bg-muted-foreground rounded-full", className)}
    >
      <div
        className={cn(
          "h-full w-full rounded-full transition-[max-width] duration-300 ease-out",
          barColor
        )}
        style={{
          maxWidth: `${Math.min(percentage, 100)}%`,
        }}
      ></div>
    </div>
  );
};
