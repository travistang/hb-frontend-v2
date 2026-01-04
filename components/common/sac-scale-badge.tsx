"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function sacScaleBackgroundClass(value: string): string {
  const v = value.trim().toUpperCase();
  switch (v) {
    case "T1":
      return "bg-chart-1";
    case "T2":
      return "bg-chart-2";
    case "T3":
      return "bg-chart-3";
    case "T4":
      return "bg-chart-4";
    case "T5":
      return "bg-chart-5";
    case "T6":
      return "bg-chart-6";
    default:
      return "bg-slate-500";
  }
}

const COMMON_BADGE_STYLES = "border-transparent text-white";

type Props = {
  value: unknown;
  className?: string;
};
export function SacScaleBadge({ value, className }: Props) {
  if (typeof value !== "string" || !value.trim()) return null;
  const normalized = value.trim().toUpperCase();

  return (
    <Badge
      className={cn(
        COMMON_BADGE_STYLES,
        sacScaleBackgroundClass(normalized),
        className
      )}
    >
      {normalized}
    </Badge>
  );
}
