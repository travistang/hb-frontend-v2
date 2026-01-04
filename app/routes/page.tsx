"use client";

import { LoadingPlaceholder } from "@/components/common/loading-placeholder";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { PaginationButtonGroup } from "@/components/common/pagination-button-group";
import { NoSearchResultAlert } from "@/components/routes/no-search-result-alert";
import { RouteCard } from "@/components/routes/route-card";
import { RouteSearchGroup } from "@/components/routes/route-search-group";
import { SearchErrorAlert } from "@/components/routes/search-error-alert";
import {
  routeSearchFromSearchParams,
  routeSearchToSearchParams,
} from "@/lib/routes/mappers";
import routeService from "@/services/clients/route-service";
import { RouteSearchQuery } from "@/services/route-service/types";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RoutesPage() {
  const searchParams = useSearchParams();
  const [routeSearchQuery, setRouteSearchQuery] = useState<RouteSearchQuery>(
    routeSearchFromSearchParams(searchParams)
  );

  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ["routes", routeSearchQuery],
    queryFn: () => routeService.search(routeSearchQuery),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const noSearchResult =
    !error && data?.routes?.length === 0 && !isLoading && !isRefetching;
  const hasSearchError = !!error && !isLoading && !isRefetching;
  const isMakingRequest = isLoading || isRefetching;
  const showLoadingPlaceholder = isMakingRequest && !data?.routes?.length;
  const showSmallLoadingSpinner = isMakingRequest && !!data?.routes?.length;
  const showPaginationGroup = !!data?.next || !!data?.previous;

  const onChageSearchQuery = (
    update: (current: RouteSearchQuery) => RouteSearchQuery
  ) => {
    // when search changes, always show the first page
    const updatedQuery = { ...update(routeSearchQuery), offset: 0 };
    const newSearchParams = routeSearchToSearchParams(updatedQuery);
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;

    window.history.replaceState({}, "", newUrl);

    setRouteSearchQuery(updatedQuery);
  };

  const switchPage = (nextSearchParams: string) => {
    const newSearchQuery = routeSearchFromSearchParams(
      new URLSearchParams(nextSearchParams)
    );
    setRouteSearchQuery(newSearchQuery);

    const strippedNextSearchParams = nextSearchParams.replace(/^\?/, "");
    const newUrl = `${window.location.pathname}?${strippedNextSearchParams}`;
    window.history.replaceState({}, "", newUrl);
  };
  return (
    <div className="prose w-full max-w-none">
      <h1>Routes</h1>
      <RouteSearchGroup
        searchQuery={routeSearchQuery}
        onChageSearchQuery={onChageSearchQuery}
      />
      <div className="flex flex-col gap-y-2 pt-4 items-stretch">
        {hasSearchError && <SearchErrorAlert onRetry={() => refetch()} />}
        {noSearchResult && <NoSearchResultAlert />}
        {showPaginationGroup && (
          <div
            data-testid="route-pagination-group"
            className="flex items-center gap-2"
          >
            <PaginationButtonGroup
              onPrevious={
                data?.previous ? () => switchPage(data.previous!) : undefined
              }
              onNext={data?.next ? () => switchPage(data.next!) : undefined}
            />
            <div
              className="text-sm text-muted-foreground italic"
              data-testid="route-count"
            >
              {data.count} routes
            </div>
            {showSmallLoadingSpinner && <LoadingSpinner className="w-4 h-4" />}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {showLoadingPlaceholder ? (
            <LoadingPlaceholder
              className="col-span-full"
              label="Loading routes..."
            />
          ) : (
            data?.routes?.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
