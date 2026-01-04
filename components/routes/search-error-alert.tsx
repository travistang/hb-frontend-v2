import { RefreshCcw, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

type Props = {
  onRetry: () => void;
};
export const SearchErrorAlert = ({ onRetry }: Props) => {
  return (
    <Alert variant="destructive" className="col-span-full">
      <TriangleAlert />
      <AlertTitle className="font-bold">Error</AlertTitle>
      <AlertDescription>
        Something went wrong while loading the routes.
        <Button variant="outline" className="text-foreground" onClick={onRetry}>
          <RefreshCcw />
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  );
};
