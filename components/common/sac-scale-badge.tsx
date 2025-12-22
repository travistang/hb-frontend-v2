"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function sacScaleBackgroundClass(value: string): string {
  const v = value.trim().toUpperCase();
  switch (v) {
    case "T1":
      return "bg-emerald-600";
    case "T2":
      return "bg-sky-600";
    case "T3":
      return "bg-blue-800";
    case "T4":
      return "bg-orange-600";
    case "T5":
      return "bg-red-600";
    case "T6":
      return "bg-black";
    default:
      return "bg-slate-500";
  }
}

const COMMON_BADGE_STYLES = "border-transparent text-white";

export function SacScaleBadge({ value }: { value: unknown }) {
  if (typeof value !== "string" || !value.trim()) return null;
  const normalized = value.trim().toUpperCase();

  return (
    <Badge className={cn(COMMON_BADGE_STYLES, sacScaleBackgroundClass(normalized))}>
      {normalized}
    </Badge>
  );
}


