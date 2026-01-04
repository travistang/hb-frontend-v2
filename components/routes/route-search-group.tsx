import { RouteSearchQuery, SACScale } from "@/services/route-service/types";
import { SearchBar } from "./search-bar";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import {
  sacScaleBackgroundClass,
  SacScaleBadge,
} from "../common/sac-scale-badge";
import { cn } from "@/lib/utils";
import {
  Filter,
  SortAsc,
  SortDesc,
  ArrowUpDown,
  Heart,
  Mountain,
  Cross,
  Check,
} from "lucide-react";
import { debounce } from "@/lib/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDebounce } from "@/lib/hooks/use-debounce";

const sacScales: SACScale[] = [1, 2, 3, 4, 5, 6];

const sortOptionsMap: Partial<
  Record<
    NonNullable<RouteSearchQuery["sortBy"]>,
    {
      label: string;
      icon: React.ReactNode;
    }
  >
> = {
  elevationGain: {
    label: "Elevation Gain",
    icon: <Mountain className="h-4 w-4" />,
  },
  maxHeight: {
    label: "Altitude",
    icon: <Cross className="h-4 w-4" />,
  },
  popularity: {
    label: "Popularity",
    icon: <Heart className="h-4 w-4" />,
  },
};

type Props = {
  searchQuery: RouteSearchQuery;
  onChageSearchQuery: (
    update: (current: RouteSearchQuery) => RouteSearchQuery
  ) => void;
};
export const RouteSearchGroup = ({
  searchQuery,
  onChageSearchQuery,
}: Props) => {
  const debouncedOnChangeSearchQuery = debounce(
    (searchQuery: Partial<RouteSearchQuery>) => {
      onChageSearchQuery((current) => ({ ...current, ...searchQuery }));
    },
    500
  );

  const onSortChange = () => {
    const nextSortOrder = searchQuery.sortOrder === "asc" ? "desc" : "asc";
    onChageSearchQuery((current) => ({ ...current, sortOrder: nextSortOrder }));
  };

  const onToggleSacScale = (sacScale: SACScale) => {
    onChageSearchQuery((current) => ({
      ...current,
      difficulties: current.difficulties?.includes(sacScale)
        ? current.difficulties?.filter((d) => d !== sacScale)
        : [...(current.difficulties || []), sacScale],
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <SearchBar
        className="col-span-full"
        placeholder="Search routes"
        defaultValue={searchQuery.name}
        onChange={(value) => debouncedOnChangeSearchQuery({ name: value })}
      />
      <div className="flex flex-wrap lg:flex-nowrap gap-2">
        <ButtonGroup className="w-full lg:w-auto flex-1">
          {sacScales.map((value) => (
            <Button
              key={value}
              variant="outline"
              onClick={() => onToggleSacScale(value)}
              className={cn(
                "w-12 lg:w-auto",
                searchQuery.difficulties?.includes(value)
                  ? sacScaleBackgroundClass(`T${value}`)
                  : ""
              )}
            >
              <SacScaleBadge value={`T${value}`} />
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup className="w-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowUpDown className="h-4 w-4" />
                {sortOptionsMap[
                  searchQuery.sortBy as NonNullable<RouteSearchQuery["sortBy"]>
                ]?.label ?? "Sort by"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-background shadow-lg border-muted rounded-l-lg rounded-b-lg overflow-hidden"
              align="end"
            >
              {Object.entries(sortOptionsMap).map(([value, label]) => (
                <DropdownMenuItem
                  onClick={() =>
                    onChageSearchQuery((current) => ({
                      ...current,
                      sortBy: value as NonNullable<RouteSearchQuery["sortBy"]>,
                    }))
                  }
                  className="cursor-pointer hover:bg-accent hover:border-none hover:text-accent-foreground px-4 py-1 h-10 flex items-center gap-2"
                  key={value}
                >
                  {label.icon} {label.label}
                  {searchQuery.sortBy === value && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={onSortChange}>
            {searchQuery.sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : searchQuery.sortOrder === "desc" ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
