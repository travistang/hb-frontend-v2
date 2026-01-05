import { LoadingPlaceholder } from "@/components/common/loading-placeholder";
import { RouteListView } from "@/components/routes/route-list-view";
import { routes } from "@/lib/routes";
import userService from "@/services/user-service";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RoutesPage() {
  const me = await userService.getMe();
  if (me === null) {
    redirect(routes.pages.signin + "?redirect=" + routes.pages.routes);
  }
  return (
    <Suspense fallback={<LoadingPlaceholder label="Loading routes..." />}>
      <RouteListView />
    </Suspense>
  );
}
