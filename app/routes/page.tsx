"use client";

import { LoadingPlaceholder } from "@/components/common/loading-placeholder";
import { RouteListView } from "@/components/routes/route-list-view";
import { Suspense } from "react";

export default function RoutesPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder label="Loading routes..." />}>
      <RouteListView />
    </Suspense>
  );
}
