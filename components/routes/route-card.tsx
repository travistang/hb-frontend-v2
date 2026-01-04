import { Route } from "@/services/route-service/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Clock,
  Eye,
  LucideIcon,
  Mountain,
  Plus,
  RouteIcon,
} from "lucide-react";

const SmallStatItem = ({
  icon: Icon,
  value,
  unit,
}: {
  icon: LucideIcon;
  value: string | number;
  unit: string;
}) => (
  <div className="flex flex-nowrap items-center gap-2">
    <Icon className="h-4 w-4" />
    <span className="text-sm font-medium">
      {value} {unit}
    </span>
  </div>
);
export function RouteCard({ route }: { route: Route }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(routes.pages.routeDetail(route.id));
  };
  return (
    <Card onClick={handleClick} className="overflow-hidden flex flex-col">
      <CardContent className="p-4 h-full flex-1 flex flex-col">
        <CardTitle className="whitespace-nowrap text-ellipsis overflow-hidden">
          {route.name}
        </CardTitle>
        <CardDescription className="flex-1">
          <div className="flex flex-wrap flex-row items-center gap-x-2 pt-1 pb-2">
            <SmallStatItem icon={RouteIcon} value={route.distance} unit="km" />
            <SmallStatItem
              icon={Mountain}
              value={route.elevationGain}
              unit="hm"
            />
            <SmallStatItem
              icon={Clock}
              value={`${Math.floor(route.duration / 60)}h ${
                route.duration % 60
              }min`}
              unit=""
            />
          </div>
        </CardDescription>
        <CardFooter
          onClick={(e) => e.stopPropagation()}
          className="justify-end gap-2 pr-0"
        >
          <Button variant="outline" className="md:hidden">
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            Create event
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
