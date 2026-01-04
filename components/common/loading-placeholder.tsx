import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

type Props = {
  className?: string;
  label: string;
};
export const LoadingPlaceholder = ({ className, label }: Props) => {
  return (
    <div
      className={cn("flex items-center justify-center min-h-screen", className)}
    >
      <div className="text-center">
        <LoadingSpinner className="w-8 h-8 mx-auto" />
        <p className="mt-2 text-gray-600">{label}</p>
      </div>
    </div>
  );
};
