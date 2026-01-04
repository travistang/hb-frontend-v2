import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const NoSearchResultAlert = () => {
  return (
    <Alert className="col-span-full">
      <Info />
      <AlertTitle className="font-bold">No routes found</AlertTitle>
      <AlertDescription>
        No routes found for the given criteria. Try changing the search
        criteria.
      </AlertDescription>
    </Alert>
  );
};
